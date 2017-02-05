(function() {
  const prefix = '/screens';

  const locals = {
    appId: '',
    rawQueries: {},
    inputQueries: {},
    caller: '',

    // _toto=tata
    broadcastQueries: {},

    // ret-titi=titi
    returnQueriesMap: {},
  };

  function getQueriesStr() {
    const href = window.location.href;
    const queriesStr = href.substring(href.indexOf('?') + 1);
    return queriesStr === href ? '' : queriesStr;
  }

  function decode(query) {
    const parts = query.split('=');
    return {
      name: decodeURIComponent(parts[0]),
      value: decodeURIComponent(parts[1] || ''),
    };
  }

  function switchQueryType(acc, query) {
    acc.rawQueries[query.name] = query.value;

    if (query.name === 'redirect') {
      acc.caller = query.value;
    } else if (/^ret-/.test(query.name)) {
      acc.returnQueriesMap[query.name.substring(4)] = query.value;
    } else if (/^_/.test(query.name)) {
      acc.broadcastQueries[query.name] = query.value;
    } else {
      acc.inputQueries[query.name] = query.value;
    }

    return acc;
  }

  function parseQueries() {
    const queriesStr = getQueriesStr();
    if (queriesStr) {
      queriesStr.split('&')
        .map(decode)
        .filter(q => !!q.name)
        .reduce(switchQueryType, locals);
    }
  }

  // function queriesToString(queries, prefix, omit) {
  //   prefix = prefix || function(q) { return q; };
  //   omit = omit || {};
  //   var res = '';
  //
  //   var omitValues = [];
  //   for(var q in omit) {
  //     if (omit.hasOwnProperty(q)) {
  //       omitValues.push(omit[q]);
  //     }
  //   }
  //
  //   for (var q in queries) {
  //     if (queries.hasOwnProperty(q) && omitValues.indexOf(q) === -1) {
  //       res += '&' + prefix(q) + '=' + queries[q];
  //     }
  //   }
  //   return res;
  // }

  function getCaller() {
    return locals.caller;
  }

  function getQueries() {
    return locals.inputQueries;
  }

  function getRawQueries() {
    return locals.rawQueries;
  }

  function init(appId) {
    locals.appId = appId;
    parseQueries();
  }

  function transformKeys(obj, transform) {
    const reducer = (acc, k) => (
      Object.assign(acc, { [transform(k)]: obj[k] })
    );

    return Object.keys(obj).reduce(reducer, {});
  }

  function omit(obj, keys) {
    const reducer = (acc, k) => (
      Object.assign(acc, { [k]: obj[k] })
    );

    return Object.keys(obj)
      .filter(k => !keys.includes(k))
      .reduce(reducer, {});
  }

  function queriesToString(queries) {
    const queriesStr = Object.keys(queries)
      .map(k => `${k}=${queries[k]}`)
      .join('&');

    return queriesStr ? `?${queriesStr}` : '';
  }

  function createOpenLink(options) {
    const appUrl = `${prefix}/${options.appId}/`;
    const queriesStr = queriesToString(options.queries || {});

    return `${appUrl}${queriesStr}`;
  }

  function createOpenLinkWithResult(options) {
    const appUrl = `${prefix}/${options.appId}/`;
    const queriesStr = queriesToString(Object.assign(
      { redirect: locals.appId },
      options.queries,
      transformKeys(options.resultMap, k => `ret-${k}`),
      transformKeys(
        omit(locals.rawQueries, Object.values(options.resultMap)),
        k => `_${k}`
      )
    ));

    return `${appUrl}${queriesStr}`;
  }

  function createReturnLink(options) {
    const appUrl = `${prefix}/${locals.caller}/`;
    const queriesStr = queriesToString(Object.assign(
      transformKeys(locals.broadcastQueries, k => k.substring(1)),
      Object.keys(options.resultMap).reduce((acc, k) => Object.assign(acc, {
        [locals.returnQueriesMap[k]]: options.resultMap[k]
      }), {})
    ));

    return `${appUrl}${queriesStr}`;
  }

  window.screman = {
    getCaller,
    getQueries,
    getRawQueries,
    init,
    createOpenLink,
    createOpenLinkWithResult,
    createReturnLink,
  };
}())
