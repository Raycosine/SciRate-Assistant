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
  //chrome.tabs.query({active:true, currentWindow: true}, function(tabs){  });
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
  
})