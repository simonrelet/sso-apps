var queries = {
  parse: function() {
    var res = {};
    var rawQueries = window.location.href.match(/.*\?(.*)/);
    var queries = (rawQueries ? rawQueries[1] : '').split('&');

    for (var i = 0; i < queries.length; i++) {
      var parts = queries[i].split('=');
      res[decodeURIComponent(parts[0])] = decodeURIComponent(parts[1] || '');
    }

    return res;
  }
};
