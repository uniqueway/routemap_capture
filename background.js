// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {
  // var action_url = "javascript:window.print();";
  // chrome.tabs.update(tab.id, {url: action_url});
  if (tab.url.match(/route_map/)) {
    chrome.current_tab_id = tab.id
    console.log(window.xx = document,window.a = window)
    chrome.tabs.executeScript( chrome.current_tab_id, { code: 'document.getElementById("gmap_search_url").value'}, function(result) {
      new_tab = chrome.tabs.create({ url: result[0] }, function(tab) {
        alert('地图加载完成后再次点击便可以继续编辑')
      });
    })
  } else if (tab.url.match(/google/) && chrome.current_tab_id) {
      chrome.tabs.captureVisibleTab( null, {format: 'jpeg', quality: 100}, function(dataURI) {
        if (dataURI) {
          var image = new Image();
          image.src = dataURI;
          js_string = "img = document.createElement('img');img.id='gmap_result';img.src='"+dataURI+"';document.body.appendChild(img);"
          chrome.tabs.executeScript( chrome.current_tab_id, {code:js_string}, function(results){ console.log(results); } );
          chrome.tabs.update(chrome.current_tab_id, {selected: true});
          chrome.current_tab_id = null
          chrome.tabs.remove(tab.id);
        }
      });
  } else {
    alert('先在路由图下面点击')
  }

});
