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
      chrome.tabs.getSelected(null, function(tab) {
        var tablink;
        return tablink = tab.url;
      });
      date = new Date();
      u_name = ractive.get('u_name');
      u_email = ractive.get('u_email');
      commnent_list = ractive.get('comment_list');
      comment_list.push({
        name: u_name,
        email: u_email,
        comment: ractive.get('input_comment'),
        date: date.getDay() + '.' + date.getMonth() + '.' + date.getFullYear()
      });
      ractive.set('comment_list', comment_list);
      console.log((ractive.get('comment_list')).length);
      chrome.storage.local.get('value', function(result) {
        result = result.value;
        result.urls[0].comment_list = ractive.get('comment_list');
        return chrome.storage.local.set({
          'value': result
        });
      });
      return ractive.set('array_length', comment_list.length);
    };
  })(this));

  chrome.storage.local.get('value', function(result) {
    result = result.value;
    ractive.set('u_name', result.u_name);
    ractive.set('u_email', result.u_email);
    ractive.set('comment_list', result.urls[0].comment_list);
    ractive.set('array_length', (ractive.get('comment_list')).length);
    return console.log(ractive.get('comment_list'));
  });

}).call(this);
