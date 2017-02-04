(function() {
  var prefix = '/screens';

  var locals = {
    appId: '',
    raw: {},
    queries: {},
    returnTo: '',

    // _toto=tata
    returnQueries: {},

    // ret-titi=titi
    returnValues: {},
  };

  function parseQueries() {
    var href = window.location.href;
    var queriesStr = href.substring(href.indexOf('?') + 1);

    if (queriesStr !== href && queriesStr) {
      var queries = queriesStr.split('&');
      for (var i = 0; i < queries.length; i++) {
        var parts = queries[i].split('=');
        var name = decodeURIComponent(parts[0]);
        var value = decodeURIComponent(parts[1] || '');

        if (name) {
          locals.raw[name] = value;

          if (name === 'redirect') {
            locals.returnTo = value;
          } else if (/^ret-/.test(name)) {
            locals.returnValues[name.substring(4)] = value;
          } else if (/^_/.test(name)) {
            locals.returnQueries[name] = value;
          } else {
            locals.queries[name] = value;
          }
        }
      }
    }
  }

  function queriesToString(queries, prefix, omit) {
    prefix = prefix || function(q) { return q; };
    omit = omit || {};
    var res = '';

    var omitValues = [];
    for(var q in omit) {
      if (omit.hasOwnProperty(q)) {
        omitValues.push(omit[q]);
      }
    }

    for (var q in queries) {
      if (queries.hasOwnProperty(q) && omitValues.indexOf(q) === -1) {
        res += '&' + prefix(q) + '=' + queries[q];
      }
    }
    return res;
  }

  window.screman = {
    getReturnTo: function() { return locals.returnTo; },
    getQueries: function() { return locals.queries; },
    getRaw: function() { return locals.raw; },

    init: function(appId) {
      locals.appId = appId;
      parseQueries();
    },

    createOpenLink: function(options) {
      return prefix + '/' + options.appId + '/'
        + (options.queries ? '?' + queriesToString(options.queries) : '');
    },

    createOpenLinkWithResult: function(options) {
      return prefix + '/' + options.appId + '/?redirect=' + locals.appId
        + queriesToString(options.queries)
        + queriesToString(options.resultMap, function(q) { return 'ret-' + q; })
        + queriesToString(locals.queries, function(q) { return '_' + q; }, options.resultMap)
        + queriesToString(locals.returnQueries, function(q) { return '_' + q; })
        + (locals.returnTo ? '&_redirect=' + locals.returnTo : '')
        + queriesToString(locals.returnValues, function(q) { return '_ret-' + q; });
    },

    createReturnLink: function(options) {
      var queries = {};
      for (var q in options.resultMap) {
        if (options.resultMap.hasOwnProperty(q)) {
          queries[locals.returnValues[q]] = options.resultMap[q];
        }
      }

      return prefix + '/' + locals.returnTo + '/?'
        + queriesToString(locals.returnQueries, function(q) { return q.substring(1); })
        + queriesToString(queries);
    }
  };
}())
