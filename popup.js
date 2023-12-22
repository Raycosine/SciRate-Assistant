'use strict';

let removeFont = document.getElementById('RemoveFont');

removeFont.onclick = function(element) {
  chrome.tabs.query({active:true, currentWindow: true}, function(tabs){
    chrome.tabs.executeScript(
      tabs[0].id,
      {code:"links=document.head.getElementsByTagName('link');if(links!=undefined){links[0].disabled=1-links[0].disabled;};"}
    );
  });
  let links=document.head.getElementsByTagName('link');
  if(links!=undefined) {
    links[0].disabled=1-links[0].disabled;
    if(links[0].disabled==1){
      removeFont.textContent="Disable Sen";
    }
    else{
      removeFont.textContent="Enable Sen";
    }
    //console.log('disabled changed');
    chrome.storage.sync.set({
      isLoveSen: links[0].disabled
    }, function() {
    });
  }; 
};


let showScirate=document.getElementById('ShowScirate');
let arXivId=document.getElementById('ArXivId');
let scitesResult=document.getElementById('ScitesResult');
showScirate.onclick = function(element) {
  var sciteshref="https://scirate.com/arxiv/2009.03921/scites";
  if(arXivId.value.length>0){
    sciteshref="https://scirate.com/arxiv/"+arXivId.value+"/scites";
    var httpReq = new XMLHttpRequest();
    httpReq.open('GET', sciteshref, true);
    httpReq.setRequestHeader('Content-Type','text/html; charset=utf-8');
    httpReq.setRequestHeader('Access-Control-Allow-Headers', '*');
    httpReq.setRequestHeader('Access-Control-Allow-Origin', '*');
    var fields={};
    httpReq.onreadystatechange = function () {
      //console.log('test');
      if (httpReq.readyState === 4){// && httpReq.status === '200') {
          //console.log('ready!');
          var rsp=httpReq.responseText;
          if(rsp.match('Scites</h2>')!=null){
            var nscites=rsp.substring(rsp.match('Scites</h2>').index-10, rsp.match('Scites</h2>').index-1);
            //console.log(nscites);
            nscites=nscites.substring(nscites.match('<h2>').index+4,);
            scitesResult.textContent='Scites: '+nscites;
          }
      };
    }
    httpReq.send(fields);
  };
  //console.log(httpReq);
};
  /*
  chrome.runtime.sendMessage( //goes to bg_page.js
    scites,
    data => dataProcessFunction(data)
  ); 
    */

let markCurrentRead=document.getElementById('MarkCurrentRead');
//console.log(markCurrentRead);
markCurrentRead.onclick = function(element) {
  console.log('read click');
  chrome.storage.sync.get(['readList','url'], function(data) {
      if(data.url.includes('scirate') && data.url.includes('arxiv')){
        if(data.readList.includes(data.url)){
          markCurrentRead.textContent = "Read Already";
        }
        else{
          markCurrentRead.textContent = "Marked";
          var rl=data.readList;
          rl.push(data.url);
          chrome.storage.sync.set({
            readList: rl
          }, function() {
          });
        };
      };
  });
};


let removeCurrentRead=document.getElementById('RemoveCurrentRead');
//console.log(removeCurrentRead);
removeCurrentRead.onclick = function(element) {
  console.log('unread click');
  chrome.storage.sync.get(['readList','url'], function(data) {
      //console.log(data);
      if(data.url.includes('scirate') && data.url.includes('arxiv')){
        if(data.readList.includes(data.url)){
          removeCurrentRead.textContent = "Removed";
          var rl=data.readList;
          rl=rl.filter(function(item){item!=data.url;});
          console.log('gonna remove from readlist');
          //console.log(rl);
          chrome.storage.sync.set({
            readList: rl
          }, function() {
          });
        }
        else{
          removeCurrentRead.textContent = "Never read";
        };
      };
  });
};

chrome.storage.sync.get('url', function(data) {
  if (data.url.includes('scirate')){
    removeFont.style.display='inline-block';
    chrome.storage.sync.get(
      'currentSen', function(data) {
        if(data!==undefined){
          var links=document.head.getElementsByTagName('link');
          if(links!==undefined){
            links[0].disabled=1-data.currentSen;
            removeFont.text=links[0].disabled;
            if(links[0].disabled==1){
              removeFont.textContent="Disable Sen";
            }
            else{
              removeFont.textContent="Enable Sen";
            }
          }
        }
        else{
          chrome.storage.sync.get(
            'isLoveSen', function(data) {
              var links=document.head.getElementsByTagName('link');
              if(links!==undefined){
                if(data!==undefined){
                    if(data.isLoveSen==false){
                      links[0].disabled=0;
                    }
                    else{
                        links[0].disabled=1;
                    }
                }
                else{
                    links[0].disabled=0;
                }
                if(links[0].disabled==1){
                  removeFont.textContent="Disable Sen";
                }
                else{
                  removeFont.textContent="Enable Sen";
                }
              }
          });
        }  
    });
  }
  else{
    removeFont.style.display='none';
  };
});