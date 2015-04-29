'use strict';
# this script is used in popup.html
ractive = new Ractive
      el : '#container'
      template : '#template'
      data :
        user: 'Bakytzhan'
        email:'akzhol_b@bk.ru'
        comment:'I told him!I win!'
        avatar:'205e460b479e2e5b48aec07710c08d50'
    
   

ractive.on 'activate', =>
  key = md5 'message'

  ractive.set 'avatar',key
