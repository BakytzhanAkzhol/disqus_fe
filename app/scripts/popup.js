(function() {
  'use strict';
  var comment_list, ractive;

  comment_list = [];

  ractive = new Ractive({
    el: '#container',
    template: '#template',
    data: {
      u_name: '',
      u_email: '',
      comment_list: comment_list,
      toReply: function() {
        return alert(Im(alive));
      },
      toHash: function(value) {
        return md5(value);
      }
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
        comment: ractive.get('input_comment'),
        date: date.getDay() + '.' + date.getMonth() + '.' + date.getFullYear()
      });
      ractive.set('comment_list', comment_list);
      return chrome.storage.local.get('value', function(result) {
        result = result.value;
        console.log(result);
        return chrome.tabs.getSelected(null, function(tab) {
          var base_db, flag, tablink, urls, val, _i, _len;
          tablink = tab.url;
          flag = false;
          urls = result.urls;
          console.log(result);
          console.log('loop starting...');
          for (_i = 0, _len = urls.length; _i < _len; _i++) {
            val = urls[_i];
            console.log('loop' + _i);
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
          console.log('loop ending');
          if (!flag) {
            console.log('Flag false');
            urls.push({
              this_url: tablink,
              comment_list: comment_list
            });
            console.log(urls);
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
    };
  })(this));

  chrome.storage.local.get('value', function(result) {
    result = result.value;
    console.log(result);
    ractive.set('u_name', result.u_name);
    ractive.set('u_email', result.u_email);
    ractive.set('array_length', (ractive.get('comment_list')).length);
    console.log(ractive.get('comment_list'));
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

}).call(this);
