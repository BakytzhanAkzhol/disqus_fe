'use strict';

# this script is used in background.html

base_db =
  u_name:''
  u_email:''
  urls:
    [
      this_url:''
      comment_list:
        [
          name:''
          email:''
          comment:''
          date:''
          avatar:''
        ]
    ]
                
                  
chrome.runtime.onInstalled.addListener (details) ->
  console.log('previousVersion', details.previousVersion)
  chrome.storage.local.set {'value': base_db}

update= =>
  chrome.storage.local.get 'value',(result)->
    result=result.value
    chrome.tabs.getSelected null,(tab)->
      tablink = getUrl tab.url
      flag = false
      urls=result.urls
      for val in urls
        console.log tablink+" "+getUrl val.this_url
        if tablink==getUrl val.this_url
          chrome.browserAction.setBadgeText {text:val.comment_list.length.toString()}
          flag = true
          break
      if !flag
        chrome.browserAction.setBadgeText {text:'0'}

update()

getUrl = (value)=>
   [d, other] = (value).split '://'
   [domain, oth] = other.split '/'
   urlN = d + '://' + domain
   console.log urlN
   urlN


chrome.tabs.onActivated.addListener (activeInfo)->
  update()