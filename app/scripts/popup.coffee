'use strict';
# this script is used in popup.html
comment_list=[]

ractive = new Ractive
      el : '#container'
      template : '#template'
      data :
        u_name: 'bigbaak'
        u_email: 'akzhol_b@bk.ru'
        comment_list:comment_list
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
  date=new Date()
  u_name = ractive.get 'u_name'
  u_email = ractive.get 'u_email'
  if u_name == '' || u_email == ''
    alert('Input your personal info')
    return
  commnent_list = ractive.get 'comment_list'
  comment_list.push({
            name:u_name
            email:u_email
            avatar:md5(u_email)
            comment:ractive.get 'input_comment'
            date:date.getDay()+'.'+date.getMonth()+'.'+date.getFullYear()
        })
  ractive.set 'comment_list',comment_list
  chrome.storage.local.get 'value',(result) ->
    result=result.value
    console.log result
    chrome.tabs.getSelected null,(tab)->
      tablink =getUrl tab.url
      flag = false
      urls=result.urls
      for val in urls
        if tablink==val.this_url
          console.log 'Flag true'
          console.log result.urls[_i].comment_list
          result.urls[_i].comment_list = ractive.get 'comment_list'
          chrome.storage.local.set {'value':result}
          chrome.browserAction.setBadgeText {text: val.comment_list.length.toString()}
          ractive.set 'array_length',val.comment_list.length.toString()
          flag = true
          break
      if !flag
        console.log 'Flag false'
        urls.push({
              this_url:tablink
              comment_list:
                comment_list
          });
        base_db =
          u_name:ractive.get 'u_name'
          u_email:ractive.get 'u_email'
          urls:urls
        chrome.storage.local.set {'value':base_db}
  ractive.set 'input_comment',''
  

chrome.storage.local.get 'value',(result) ->

  result = result.value
  if typeof(result) == 'object' && !Object.keys(result).length
    alert 'Alert'
    return
  ractive.set 'u_name',result.u_name
  ractive.set 'u_email',result.u_email
  ractive.set 'array_length',(ractive.get 'comment_list').length
  chrome.tabs.getSelected null,(tab)->
    tablink = tab.url
    flag = false
    urls=result.urls
    for val in urls
      if tablink==val.this_url
        console.log 'flag_true_local_gets'
        ractive.set 'comment_list',result.urls[_i].comment_list
        chrome.browserAction.setBadgeText {text:val.comment_list.length.toString() }
        ractive.set 'array_length',(result.urls[_i].comment_list).length
        flag = true
        break
    if !flag
      chrome.browserAction.setBadgeText {text:'0'}
getUrl = (value)=>
   [d, other] = (value).split '://'
   [domain, oth] = other.split '/'
   urlN = d + '://' + domain
   console.log urlN
   urlN
