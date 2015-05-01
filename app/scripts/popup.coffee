'use strict';
# this script is used in popup.html
comment_list=[]

ractive = new Ractive
      el : '#container'
      template : '#template'
      data :
        u_name: ''
        u_email: ''
        comment_list:comment_list
        toReply:->
          alert Im alive
        toHash:(value) ->
          md5 value

ractive.on 'activate', =>
  u_name = ractive.get 'u_name'
  u_email = ractive.get 'u_email'
  ractive.set 'u_name',u_name
  ractive.set 'u_email',u_email
  key = md5 u_email
  ractive.set 'avatar',key
  chrome.storage.local.get 'value',(result) ->
    result = result.value
    result.u_name = ractive.get 'u_name'
    result.u_email = ractive.get 'u_email'
    chrome.storage.local.set {'value':result}

ractive.on 'send_comment', =>
  chrome.tabs.getSelected null,(tab)->
    tablink = tab.url
  date=new Date()
  u_name = ractive.get 'u_name'
  u_email = ractive.get 'u_email'
  commnent_list = ractive.get 'comment_list'
  comment_list.push({
            name:u_name
            email:u_email
            comment:ractive.get 'input_comment'
            date:date.getDay()+'.'+date.getMonth()+'.'+date.getFullYear()
        })
  ractive.set 'comment_list',comment_list
  console.log (ractive.get 'comment_list').length
  chrome.storage.local.get 'value',(result) ->
    result = result.value
    result.urls[0].comment_list = ractive.get 'comment_list'
    chrome.storage.local.set {'value':result}
  ractive.set 'array_length',comment_list.length

chrome.storage.local.get 'value',(result) ->
  result = result.value
  ractive.set 'u_name',result.u_name
  ractive.set 'u_email',result.u_email
  ractive.set 'comment_list', result.urls[0].comment_list
  ractive.set 'array_length',(ractive.get 'comment_list').length
  console.log ractive.get 'comment_list'

