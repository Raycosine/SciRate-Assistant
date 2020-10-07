'use strict';

chrome.runtime.onInstalled.addListener(function() {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: {hostEquals: 'scirate.com'},
      }),
      new chrome.declarativeContent.PageStateMatcher({
        pageUrl: {hostEquals: 'scholar.google.com'},
      }),
      new chrome.declarativeContent.PageStateMatcher({
        pageUrl: {hostEquals: 'arxiv.org'},
      })
      ],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
  chrome.storage.sync.set({
    isLoveSen: 0,
    currentSen: 1
  });
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){

  chrome.storage.sync.set({url:tab.url}, function(){

  });
  chrome.tabs.executeScript(
    tabId,//tabs[0].id,
    {file: 'bg_1.js'},
      _=>{
      let e=chrome.runtime.lastError;
      if(e!==undefined){

      }
    }
  );
});

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    if (request.sciteshref!==undefined){
      sendResponse({farewell: "goodbye"});
        //console.log('get scirate href');
        var httpReq = new XMLHttpRequest();
        httpReq.open('GET', request.sciteshref, true);
        httpReq.setRequestHeader('Content-Type','text/html; charset=utf-8');
        httpReq.setRequestHeader('Access-Control-Allow-Headers', '*');
        httpReq.setRequestHeader('Access-Control-Allow-Origin', '*');
        var fields={};
        httpReq.onreadystatechange = function () {
        console.log('test');
        if (httpReq.readyState === 4){// && httpReq.status === '200') {
            console.log('read scites ready!');
            //console.log(httpReq);
            var rsp=httpReq.responseText;
            if(rsp.match('Scites</h2>')!=null){
                console.log('scites number exists');
                var numberofscites=rsp.substring(rsp.match('Scites</h2>').index-10, rsp.match('Scites</h2>').index-1);
                console.log(numberofscites);
                numberofscites=numberofscites.substring(numberofscites.match('<h2>').index+4,);
                console.log('nscites ready');
                console.log(numberofscites);
                chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                  chrome.tabs.sendMessage(tabs[0].id, {nscites:numberofscites, sciteshref:request.sciteshref}, function(response) {
                    console.log(response.farewell);
                  });
                });            
                //chrome.storage.sync.set({nscites:numberofscites}, function(){
                  //chrome.storage.sync.remove('sciteshref', function(data){});
                  //console.log('sciteshref removed');
                //} );
            }
            else{
              if(rsp.match('Scite</h2>')!=null){
                console.log('scites number exists');
                var numberofscites=rsp.substring(rsp.match('Scite</h2>').index-10, rsp.match('Scite</h2>').index-1);
                console.log(numberofscites);
                numberofscites=numberofscites.substring(numberofscites.match('<h2>').index+4,);
                console.log('nscites ready');
                console.log(numberofscites);
                chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                  chrome.tabs.sendMessage(tabs[0].id, {nscites:numberofscites, sciteshref:request.sciteshref}, function(response) {
                    console.log(response.farewell);
                  });
                });       
              }
              else {
                console.log(rsp);
              }
            }
        };
        };
        httpReq.send(fields);
      };
});
  




chrome.tabs.onActivated.addListener(function(info){

  chrome.tabs.query({active:true, currentWindow: true}, function(tabs){
    var tabId=tabs[0].tabId, tabUrl=tabs[0].url;
    if(tabUrl!==undefined){
      chrome.storage.sync.set({url:tabUrl}, function(){

      });
    }
    chrome.tabs.executeScript(
      tabId,//tabs[0].id,
      {file: 'bg_1.js'},
        _=>{
        let e=chrome.runtime.lastError;
        if(e!==undefined){

        }
      }
    );
  });
  
});

