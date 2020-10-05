// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

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
  //console.log(tabId); 
  chrome.storage.sync.set({url:tab.url}, function(){
    //console.log('set url');
    //console.log(tab.url);
  });
  chrome.tabs.executeScript(
    tabId,//tabs[0].id,
    {file: 'bg_1.js'},
      _=>{
      let e=chrome.runtime.lastError;
      if(e!==undefined){
        //console.log(tabId, _, e);
      }
    }
  );
  //chrome.tabs.query({active:true, currentWindow: true}, function(tabs){  });
});