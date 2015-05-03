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
          reply:''
        ]
    ]
getUrl = (value)=>
   value.split("/")[0]+'://'+value.split("/")[2]
say =(value)=>
  console.log value              
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
        if tablink==val.this_url
          chrome.browserAction.setBadgeText {text:val.comment_list.length.toString()}
          flag = true
          break
      say flag
      if !flag
        chrome.browserAction.setBadgeText {text:'0'}

update()



chrome.tabs.onActivated.addListener (activeInfo)->
  update()