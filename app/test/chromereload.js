if (typeof _$jscoverage === 'undefined') _$jscoverage = {};
(function(_export) {
    if (typeof _export._$jscoverage === 'undefined') {
        _export._$jscoverage = _$jscoverage;
    }
})(typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : this);
if (! _$jscoverage["chromereload.coffee"]) {
    _$jscoverage["chromereload.coffee"] = [];
    _$jscoverage["chromereload.coffee"][1] = 0;
    _$jscoverage["chromereload.coffee"][9] = 0;
    _$jscoverage["chromereload.coffee"][10] = 0;
    _$jscoverage["chromereload.coffee"][11] = 0;
    _$jscoverage["chromereload.coffee"][13] = 0;
    _$jscoverage["chromereload.coffee"][15] = 0;
    _$jscoverage["chromereload.coffee"][16] = 0;
    _$jscoverage["chromereload.coffee"][17] = 0;
    _$jscoverage["chromereload.coffee"][18] = 0;
}

_$jscoverage["chromereload.coffee"].source = ["'use strict';", "", "###", "Reload client for Chrome Apps & Extensions.", "The reload client has a compatibility with livereload.", "WARNING: only supports reload command.", "###", "", "LIVERELOAD_HOST = 'localhost:'", "LIVERELOAD_PORT = 35729", "connection = new WebSocket('ws://' + LIVERELOAD_HOST + LIVERELOAD_PORT + '/livereload')", "", "connection.onerror = (e) -> console.log('reload connection got error' + JSON.stringify(e))", "", "connection.onmessage = (e) ->", "  if e.data", "    data = JSON.parse(e.data)", "    if data and data.command == 'reload' then chrome.runtime.reload()", ""];

(function() {
  var LIVERELOAD_HOST, LIVERELOAD_PORT, connection;

  _$jscoverage["chromereload.coffee"][1]++;

  'use strict';


  /*
  Reload client for Chrome Apps & Extensions.
  The reload client has a compatibility with livereload.
  WARNING: only supports reload command.
   */

  _$jscoverage["chromereload.coffee"][9]++;

  LIVERELOAD_HOST = 'localhost:';

  _$jscoverage["chromereload.coffee"][10]++;

  LIVERELOAD_PORT = 35729;

  _$jscoverage["chromereload.coffee"][11]++;

  connection = new WebSocket('ws://' + LIVERELOAD_HOST + LIVERELOAD_PORT + '/livereload');

  _$jscoverage["chromereload.coffee"][13]++;

  connection.onerror = function(e) {
    return console.log('reload connection got error' + JSON.stringify(e));
  };

  _$jscoverage["chromereload.coffee"][15]++;

  connection.onmessage = function(e) {
    var data;
    _$jscoverage["chromereload.coffee"][16]++;
    if (e.data) {
      _$jscoverage["chromereload.coffee"][17]++;
      data = JSON.parse(e.data);
      _$jscoverage["chromereload.coffee"][18]++;
      if (data && data.command === 'reload') {
        return chrome.runtime.reload();
      }
    }
  };

}).call(this);
