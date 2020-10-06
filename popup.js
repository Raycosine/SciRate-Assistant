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
  if(links!=undefined)
    {links[0].disabled=1-links[0].disabled;
      chrome.storage.sync.set({
        isLoveSen: links[0].disabled
      }, function() {
      });
    }; 
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
              }
          });
        }  
    });
  }
  else{
    removeFont.style.display='none';
  };
});