(function() {
  'use strict';
  var comment_list, getUrl, ractive;

  comment_list = [];

  ractive = new Ractive({
    el: '#container',
    template: '#template',
    data: {
      u_name: 'bigbaak',
      u_email: 'akzhol_b@bk.ru',
      comment_list: comment_list
    }
  });

  ractive.on('activate', (function(_this) {
    return function() {
      var key, u_email, u_name;
      u_name = ractive.get('u_name');
      u_email = ractive.get('u_email');
      ractive.set('u_name', u_name);
      ractive.set('u_email', u_email);
      key = md5(u_email);
      ractive.set('avatar', key);
      return chrome.storage.local.get('value', function(result) {
        result = result.value;
        result.u_name = ractive.get('u_name');
        result.u_email = ractive.get('u_email');
        return chrome.storage.local.set({
          'value': result
        });
      });
    };
  })(this));

  ractive.on('send_comment', (function(_this) {
    return function() {
      var commnent_list, date, u_email, u_name;
      date = new Date();
      u_name = ractive.get('u_name');
      u_email = ractive.get('u_email');
      if (u_name === '' || u_email === '') {
        alert('Input your personal info');
        return;
      }
      commnent_list = ractive.get('comment_list');
      comment_list.push({
        name: u_name,
        email: u_email,
        avatar: md5(u_email),
        comment: ractive.get('input_comment'),
        date: date.getDay() + '.' + date.getMonth() + '.' + date.getFullYear()
      });
      ractive.set('comment_list', comment_list);
      chrome.storage.local.get('value', function(result) {
        result = result.value;
        console.log(result);
        return chrome.tabs.getSelected(null, function(tab) {
          var base_db, flag, tablink, urls, val, _i, _len;
          tablink = getUrl(tab.url);
          flag = false;
          urls = result.urls;
          for (_i = 0, _len = urls.length; _i < _len; _i++) {
            val = urls[_i];
            if (tablink === val.this_url) {
              console.log('Flag true');
              console.log(result.urls[_i].comment_list);
              result.urls[_i].comment_list = ractive.get('comment_list');
              chrome.storage.local.set({
                'value': result
              });
              chrome.browserAction.setBadgeText({
                text: val.comment_list.length.toString()
              });
              ractive.set('array_length', val.comment_list.length.toString());
              flag = true;
              break;
            }
          }
          if (!flag) {
            console.log('Flag false');
            urls.push({
              this_url: tablink,
              comment_list: comment_list
            });
            base_db = {
              u_name: ractive.get('u_name'),
              u_email: ractive.get('u_email'),
              urls: urls
            };
            return chrome.storage.local.set({
              'value': base_db
            });
          }
        });
      });
      return ractive.set('input_comment', '');
    };
  })(this));

  chrome.storage.local.get('value', function(result) {
    result = result.value;
    if (typeof result === 'object' && !Object.keys(result).length) {
      alert('Alert');
      return;
    }
    ractive.set('u_name', result.u_name);
    ractive.set('u_email', result.u_email);
    ractive.set('array_length', (ractive.get('comment_list')).length);
    return chrome.tabs.getSelected(null, function(tab) {
      var flag, tablink, urls, val, _i, _len;
      tablink = tab.url;
      flag = false;
      urls = result.urls;
      for (_i = 0, _len = urls.length; _i < _len; _i++) {
        val = urls[_i];
        if (tablink === val.this_url) {
          console.log('flag_true_local_gets');
          ractive.set('comment_list', result.urls[_i].comment_list);
          chrome.browserAction.setBadgeText({
            text: val.comment_list.length.toString()
          });
          ractive.set('array_length', result.urls[_i].comment_list.length);
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

}).call(this);
