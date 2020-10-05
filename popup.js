// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

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
    {links[0].disabled=1-links[0].disabled;};
};

