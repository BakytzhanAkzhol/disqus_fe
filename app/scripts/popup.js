(function() {
  'use strict';

var ractive = new Ractive({
      // The `el` option can be a node, an ID, or a CSS selector.
      el: '#container',

      // We could pass in a string, but for the sake of convenience
      // we're passing the ID of the <script> tag above.
      template: '#template',

      // Here, we're passing in some initial data
      data: {
        user: 'Bakytzhan',
      email:'akzhol_b@bk.ru',
      comment:'I told him!I win!',
      avatar:'205e460b479e2e5b48aec07710c08d50?s=48'
    }
    });

ractive.on( 'activate', function ( event ) {
  alert( 'Activating!' );
});
}).call(this);
