(function() {
  'use strict';
  var ractive;

  ractive = new Ractive({
    el: '#container',
    template: '#template',
    data: {
      user: 'Bakytzhan',
      email: 'akzhol_b@bk.ru',
      comment: 'I told him!I win!',
      avatar: '205e460b479e2e5b48aec07710c08d50'
    }
  });

  ractive.on('activate', (function(_this) {
    return function() {
      var key;
      key = md5('message');
      return ractive.set('avatar', key);
    };
  })(this));

}).call(this);
