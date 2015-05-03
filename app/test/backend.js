if (typeof _$jscoverage === 'undefined') _$jscoverage = {};
(function(_export) {
    if (typeof _export._$jscoverage === 'undefined') {
        _export._$jscoverage = _$jscoverage;
    }
})(typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : this);
if (! _$jscoverage["backend.coffee"]) {
    _$jscoverage["backend.coffee"] = [];
    _$jscoverage["backend.coffee"][1] = 0;
    _$jscoverage["backend.coffee"][5] = 0;
    _$jscoverage["backend.coffee"][8] = 0;
    _$jscoverage["backend.coffee"][13] = 0;
}

_$jscoverage["backend.coffee"].source = ["'use strict';", "", "# this script is supposed to have backend related code", "", "module = exports ? this", "", "", "$this =", "  getComments: (url, callback, errback) ->", "  getCount: (url, callback, errback)->", "  newComment: (url, title, email, comment, callback, errback) ->", "", "module.Backend = $this"];

(function() {
  var $this, module;

  _$jscoverage["backend.coffee"][1]++;

  'use strict';

  _$jscoverage["backend.coffee"][5]++;

  module = typeof exports !== "undefined" && exports !== null ? exports : this;

  _$jscoverage["backend.coffee"][8]++;

  $this = {
    getComments: function(url, callback, errback) {},
    getCount: function(url, callback, errback) {},
    newComment: function(url, title, email, comment, callback, errback) {}
  };

  _$jscoverage["backend.coffee"][13]++;

  module.Backend = $this;

}).call(this);
