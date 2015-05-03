'use strict';
# this script is used in popup.html
comment_list = []
replyTo_index = ''
ractive = new Ractive
      el : '#container'
      template : '#template'
      data :
        u_name: 'bigbaak'
        u_email: 'akzhol_b@bk.ru'
        u_avatar: ''
        show_button_load: false
        comment_list:comment_list
getUrl = (value)=>
   #Очищает ccылку от лишних букв. Только http[s]://имя_сайта.хостинг
   value.split("/")[0]+'://'+value.split("/")[2]
say =(value)=>
  #Функция say заменяет console.log, чтобы каждый раз не писать 'console.log'
  console.log value
keypress=(e)=>
  #Ловить Enter и запускает событие 'send_comment'
  if e.keyCode==13
    ractive.fire 'send_comment'
document.getElementById('input_comment').onkeypress = keypress
showButtonLoad= (array)=>
  #Функция укорачивает массив с комментариями и заодно показывает load_more кнопку
  if array.length > 3
    array = array.slice 0,3
    say 'Array was sliced'
    say array
    ractive.set 'show_button_load', true
  array

ractive.on 'activate', =>
  #Берет имя, email, md5(email) и сохраняет в chrome.storage.local
  #с помощью сторонный функция md5 беру hash-тэг email
  #
  u_name = ractive.get 'u_name'
  u_email = ractive.get 'u_email'
  ractive.set 'u_name',u_name
  ractive.set 'u_email',u_email
  ractive.set 'u_avatar',md5 u_email
  key = md5 u_email
  ractive.set 'avatar',key
  chrome.storage.local.get 'value',(result) ->
    result = result.value
    result.u_name = ractive.get 'u_name'
    result.u_email = ractive.get 'u_email'
    chrome.storage.local.set {'value':result}

ractive.on 'send_comment', =>
  #Сохраняет новый комменатрий в chrome.storage.local
  date=new Date()
  u_name = ractive.get 'u_name'
  u_email = ractive.get 'u_email'
  v = ractive.get 'input_comment'
  if u_name == '' || u_email == ''
    alert('Input your personal info')
    return
  else if v == ''
    alert("Non empty comment")
    return
  ractive.set 'show_button_load',false
  chrome.storage.local.get 'value',(result) ->
    result=result.value
    chrome.tabs.getSelected null,(tab)->
      tablink =getUrl tab.url
      flag = false
      urls = result.urls
      console.log '1'
      for val in urls
        console.log _i
        if tablink==val.this_url
          ractive.set 'comment_list', result.urls[_i].comment_list 
          comment_list = ractive.get 'comment_list'
          comment_list.push({
            name:u_name
            email:u_email
            avatar:md5(u_email)
            comment:v
            reply:replyTo_index
            date:date.getDate()+'.'+date.getMonth()+'.'+date.getFullYear()
            })
          result.urls[_i].comment_list =comment_list
          chrome.storage.local.set {'value':result}
          chrome.browserAction.setBadgeText {text: val.comment_list.length.toString()}
          ractive.set 'array_length',val.comment_list.length.toString()
          flag = true
          replyTo_index=''
          break
      console.log '3'
      if !flag
        console.log 'if4'
        #Если в цикле не нашел другие комментарий на эту страницу, то ссылку добавляет
        #с новым комментарием
        comment_list=[
          name:u_name
          email:u_email
          avatar:md5 u_email 
          comment:v
          reply:replyTo_index
          date:date.getDate()+'.'+date.getMonth()+'.'+date.getFullYear()
        ]
        urls.push({
              this_url:tablink
              comment_list:
                comment_list
          });
        console.log urls
        base_db =
          u_name:ractive.get 'u_name'
          u_email:ractive.get 'u_email'
          urls:urls
        ractive.set 'comment_list',comment_list
        chrome.storage.local.set {'value':base_db}
        console.log 'END'
  #Очищает поля комментарий
  replyTo_index=''
  ractive.set 'input_comment',''
  
#При открытые popup.html это функция берет все комментарий 
#из chrome.storage.local к открытыму ссылку
#и имя пользователя,почту
chrome.storage.local.get 'value',(result) ->
  result = result.value
  say 'Starting get info from Chrome.Storage ... '
  say result
  say '......' 
  if typeof(result) == 'object' && !Object.keys(result).length
    alert 'Alert'
    return
  ractive.set 'u_name',result.u_name
  ractive.set 'u_email',result.u_email
  ractive.set 'u_avatar', md5 result.u_email
  ractive.set 'array_length',(ractive.get 'comment_list').length
  chrome.tabs.getSelected null,(tab)->
    tablink =getUrl tab.url
    flag = false
    urls=result.urls
    for val in urls
      say tablink+'=='+val.this_url
      if tablink == val.this_url
        console.log 'flag_true_local_gets'
        ractive.set 'comment_list',showButtonLoad(result.urls[_i].comment_list)
        chrome.browserAction.setBadgeText {text:val.comment_list.length.toString() }
        ractive.set 'array_length',(result.urls[_i].comment_list).length
        flag = true
        break
    if !flag
      chrome.browserAction.setBadgeText {text:'0'}
#Показывает другие комментарий
ractive.on 'load_more',=>
  ractive.set 'show_button_load',false
  chrome.storage.local.get 'value', (result)=>
    result=result.value
    chrome.tabs.getSelected null,(tab)->
      tablink =getUrl tab.url
      flag = false
      urls=result.urls
      for val in urls
        say tablink+'=='+val.this_url
        if tablink==  val.this_url
          console.log 'flag_true_local_gets'
          ractive.set 'comment_list',result.urls[_i].comment_list
          chrome.browserAction.setBadgeText {text:val.comment_list.length.toString() }
          ractive.set 'array_length',(result.urls[_i].comment_list).length
          flag = true
          break
      if !flag
        chrome.browserAction.setBadgeText {text:'0'}

#Функция Reply -> дает возможность отвечаеть на комментарий
ractive.on 'reply',(event,item,index)->
  replyTo_index = comment_list[index].name  