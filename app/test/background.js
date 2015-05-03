if (typeof _$jscoverage === 'undefined') _$jscoverage = {};
(function(_export) {
    if (typeof _export._$jscoverage === 'undefined') {
        _export._$jscoverage = _$jscoverage;
    }
})(typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : this);
if (! _$jscoverage["background.coffee"]) {
    _$jscoverage["background.coffee"] = [];
    _$jscoverage["background.coffee"][1] = 0;
    _$jscoverage["background.coffee"][5] = 0;
    _$jscoverage["background.coffee"][21] = 0;
    _$jscoverage["background.coffee"][22] = 0;
    _$jscoverage["background.coffee"][23] = 0;
    _$jscoverage["background.coffee"][24] = 0;
    _$jscoverage["background.coffee"][25] = 0;
    _$jscoverage["background.coffee"][26] = 0;
    _$jscoverage["background.coffee"][27] = 0;
    _$jscoverage["background.coffee"][29] = 0;
    _$jscoverage["background.coffee"][30] = 0;
    _$jscoverage["background.coffee"][31] = 0;
    _$jscoverage["background.coffee"][32] = 0;
    _$jscoverage["background.coffee"][33] = 0;
    _$jscoverage["background.coffee"][34] = 0;
    _$jscoverage["background.coffee"][35] = 0;
    _$jscoverage["background.coffee"][36] = 0;
    _$jscoverage["background.coffee"][37] = 0;
    _$jscoverage["background.coffee"][38] = 0;
    _$jscoverage["background.coffee"][39] = 0;
    _$jscoverage["background.coffee"][40] = 0;
    _$jscoverage["background.coffee"][41] = 0;
    _$jscoverage["background.coffee"][42] = 0;
    _$jscoverage["background.coffee"][43] = 0;
    _$jscoverage["background.coffee"][44] = 0;
    _$jscoverage["background.coffee"][46] = 0;
    _$jscoverage["background.coffee"][50] = 0;
    _$jscoverage["background.coffee"][51] = 0;
}

_$jscoverage["background.coffee"].source = ["'use strict';", "", "# this script is used in background.html", "", "base_db =", "  u_name:''", "  u_email:''", "  urls:", "    [", "      this_url:''", "      comment_list:", "        [", "          name:''", "          email:''", "          comment:''", "          date:''", "          avatar:''", "          reply:''", "        ]", "    ]", "getUrl = (value)=>", "   value.split(\"/\")[0]+'://'+value.split(\"/\")[2]", "say =(value)=>", "  console.log value              ", "chrome.runtime.onInstalled.addListener (details) ->", "  console.log('previousVersion', details.previousVersion)", "  chrome.storage.local.set {'value': base_db}", "", "update= =>", "  chrome.storage.local.get 'value',(result)->", "    result=result.value", "    chrome.tabs.getSelected null,(tab)->", "      tablink = getUrl tab.url", "      flag = false", "      urls=result.urls", "      for val in urls", "        console.log tablink+\" \"+getUrl val.this_url", "        if tablink==val.this_url", "          chrome.browserAction.setBadgeText {text:val.comment_list.length.toString()}", "          flag = true", "          break", "      say flag", "      if !flag", "        chrome.browserAction.setBadgeText {text:'0'}", "", "update()", "", "", "", "chrome.tabs.onActivated.addListener (activeInfo)->", "  update()"];

(function() {
  var base_db, getUrl, say, update;

  _$jscoverage["background.coffee"][1]++;

  'use strict';

  _$jscoverage["background.coffee"][5]++;

  base_db = {
    u_name: '',
    u_email: '',
    urls: [
      {
        this_url: '',
        comment_list: [
          {
            name: '',
            email: '',
            comment: '',
            date: '',
            avatar: '',
            reply: ''
          }
        ]
      }
    ]
  };

  _$jscoverage["background.coffee"][21]++;

  getUrl = (function(_this) {
    return function(value) {
      _$jscoverage["background.coffee"][22]++;
      return value.split("/")[0] + '://' + value.split("/")[2];
    };
  })(this);

  _$jscoverage["background.coffee"][23]++;

  say = (function(_this) {
    return function(value) {
      _$jscoverage["background.coffee"][24]++;
      return console.log(value);
    };
  })(this);

  _$jscoverage["background.coffee"][25]++;

  chrome.runtime.onInstalled.addListener(function(details) {
    _$jscoverage["background.coffee"][26]++;
    console.log('previousVersion', details.previousVersion);
    _$jscoverage["background.coffee"][27]++;
    return chrome.storage.local.set({
      'value': base_db
    });
  });

  _$jscoverage["background.coffee"][29]++;

  update = (function(_this) {
    return function() {
      _$jscoverage["background.coffee"][30]++;
      return chrome.storage.local.get('value', function(result) {
        _$jscoverage["background.coffee"][31]++;
        result = result.value;
        _$jscoverage["background.coffee"][32]++;
        return chrome.tabs.getSelected(null, function(tab) {
          var flag, i, len, tablink, urls, val;
          _$jscoverage["background.coffee"][33]++;
          tablink = getUrl(tab.url);
          _$jscoverage["background.coffee"][34]++;
          flag = false;
          _$jscoverage["background.coffee"][35]++;
          urls = result.urls;
          _$jscoverage["background.coffee"][36]++;
          for (i = 0, len = urls.length; i < len; i++) {
            val = urls[i];
            _$jscoverage["background.coffee"][37]++;
            console.log(tablink + " " + getUrl(val.this_url));
            _$jscoverage["background.coffee"][38]++;
            if (tablink === val.this_url) {
              _$jscoverage["background.coffee"][39]++;
              chrome.browserAction.setBadgeText({
                text: val.comment_list.length.toString()
              });
              _$jscoverage["background.coffee"][40]++;
              flag = true;
              _$jscoverage["background.coffee"][41]++;
              break;
            }
          }
          _$jscoverage["background.coffee"][42]++;
          say(flag);
          _$jscoverage["background.coffee"][43]++;
          if (!flag) {
            _$jscoverage["background.coffee"][44]++;
            return chrome.browserAction.setBadgeText({
              text: '0'
            });
          }
        });
      });
    };
  })(this);

  _$jscoverage["background.coffee"][46]++;

  update();

  _$jscoverage["background.coffee"][50]++;

  chrome.tabs.onActivated.addListener(function(activeInfo) {
    _$jscoverage["background.coffee"][51]++;
    return update();
  });

}).call(this);
