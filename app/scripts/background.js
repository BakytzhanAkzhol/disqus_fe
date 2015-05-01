(function() {
  'use strict';
  var base_db;

  base_db = {
    u_name: '',
    u_email: '',
    urls: [
      {
        this_url: '',
        comment_list: [
          {
            name: '',
            email: '',
            comment: '',
            date: ''
          }
        ]
      }
    ]
  };

  chrome.runtime.onInstalled.addListener(function(details) {
    console.log('previousVersion', details.previousVersion);
    return chrome.storage.local.set({
      'value': base_db
    });
  });

  chrome.storage.local.get('value', function(result) {
    result = result.value;
    return chrome.tabs.getSelected(null, function(tab) {
      var flag, tablink, urls, val, _i, _len;
      tablink = tab.url;
      flag = false;
      urls = result.urls;
      for (_i = 0, _len = urls.length; _i < _len; _i++) {
        val = urls[_i];
        if (tablink === val.this_url) {
          chrome.browserAction.setBadgeText({
            text: val.comment_list.length.toString()
          });
          flag = true;
          break;
        }
      }
      if (!flag) {
        return chrome.browserAction.setBadgeText({
          text: '0'
        });
      }
    });
  });

}).call(this);
