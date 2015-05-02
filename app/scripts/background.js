(function() {
  'use strict';
  var base_db, getUrl, update;

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
            date: '',
            avatar: ''
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

  update = (function(_this) {
    return function() {
      return chrome.storage.local.get('value', function(result) {
        result = result.value;
        return chrome.tabs.getSelected(null, function(tab) {
          var flag, tablink, urls, val, _i, _len;
          tablink = getUrl(tab.url);
          flag = false;
          urls = result.urls;
          for (_i = 0, _len = urls.length; _i < _len; _i++) {
            val = urls[_i];
            console.log(tablink + " " + getUrl(val.this_url));
            if (tablink === getUrl(val.this_url)) {
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
    };
  })(this);

  update();

  getUrl = (function(_this) {
    return function(value) {
      var d, domain, oth, other, urlN, _ref, _ref1;
      _ref = value.split('://'), d = _ref[0], other = _ref[1];
      _ref1 = other.split('/'), domain = _ref1[0], oth = _ref1[1];
      urlN = d + '://' + domain;
      console.log(urlN);
      return urlN;
    };
  })(this);

  chrome.tabs.onActivated.addListener(function(activeInfo) {
    return update();
  });

}).call(this);
