var auth = (function () {
  function getToken() {
    return localStorage.getItem('token');
  }

  return {
    login: function(username, password, redirect) {
      var token = btoa(username + ':' + password);
      localStorage.setItem('token', token);
      window.location = '/' + redirect;
    },

    ensureLoggedIn: function(redirect) {
      if (!getToken()) {
        window.location = '/login/?redirect=' + redirect;
      }
    },

    ensureNotLoggedIn: function(redirect) {
      if (getToken()) {
        window.location = '/' + redirect;
      }
    },

    logout: function() {
      localStorage.removeItem('token');
      window.location = '/login/';
    }
  };
}());
