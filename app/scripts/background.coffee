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
        ]
    ]
                
                  
chrome.runtime.onInstalled.addListener (details) ->
  console.log('previousVersion', details.previousVersion)
  chrome.storage.local.set {'value': base_db}

chrome.storage.local.get 'value',(result)->
  result=result.value
  chrome.tabs.getSelected null,(tab)->
    tablink = tab.url
    flag = false
    urls=result.urls
    for val in urls
      if tablink==val.this_url
        chrome.browserAction.setBadgeText {text:val.comment_list.length.toString()}
        flag = true
        break
    if !flag
      chrome.browserAction.setBadgeText {text:'0'}

