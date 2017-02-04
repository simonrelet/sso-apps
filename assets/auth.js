var auth = (function () {
  function getToken() {
    return localStorage.getItem('token');
  }

  return {
    login: function(username, password, redirectAppId) {
      var token = btoa(username + ':' + password);
      localStorage.setItem('token', token);
      window.location = screman.createOpenLink({ appId: redirectAppId });
    },

    ensureLoggedIn: function() {
      if (!getToken()) {
        window.location = screman.createOpenLinkWithResult({ appId: 'screen.id.login' });
      }
    },

    ensureNotLoggedIn: function(redirect) {
      if (getToken()) {
        window.location = screman.createOpenLink({ appId: redirect });
      }
    },

    logout: function() {
      localStorage.removeItem('token');
      window.location = screman.createOpenLink({ appId: 'screen.id.login' });
    }
  };
}());
