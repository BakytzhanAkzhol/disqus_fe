'use strict';

# this script is used in background.html

base_db =
  u_name:'Bakytzhan'
  u_email:'akzhol_b@bk.ru'
  urls:
    [
      this_url:'vk.com'
      comment_list:
        [
          name:'Bakytzhan'
          email:'akzhol_b@bk.ru'
          comment:'Hello, World'
          date:'25.02.2015'
        ,
          name:'Zharaskan'
          email:'bissembayev94@mail.ru'
          comment:'Hello,my friend'
          date:'26.02.2015'
        ]
    ]
                
                  
console.log base_db 
chrome.runtime.onInstalled.addListener (details) ->
  console.log('previousVersion', details.previousVersion)
  chrome.storage.local.set {'value': base_db}
chrome.runtime.local.get 'value',(result)->
  result=result.value
  chrome.tabs.getSelected null,(tab)->
    tablink = tab.url
    result.


        



