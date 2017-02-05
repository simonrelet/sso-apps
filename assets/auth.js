(function() {
  const loginScreenId = 'screen.id.login';

  function getToken() {
    return localStorage.getItem('token');
  }

  function login(username, password, redirectAppId) {
    const token = btoa(`${username}:${password}`);
    localStorage.setItem('token', token);
    localStorage.setItem('username', username);
    window.location = screman.createOpenLink({ appId: redirectAppId });
  }

  function ensureLoggedIn() {
    if (!getToken()) {
      window.location = screman.createOpenLinkWithResult({ appId: loginScreenId });
    }
  }

  function ensureNotLoggedIn(redirect) {
    if (getToken()) {
      window.location = screman.createOpenLink({ appId: redirect });
    }
  }

  function logout() {
    localStorage.removeItem('token');
    window.location = screman.createOpenLink({ appId: loginScreenId });
  }

  function getUserName() {
    return localStorage.getItem('username');
  }

  window.auth = {
    login,
    ensureLoggedIn,
    ensureNotLoggedIn,
    logout,
    getUserName,
  };
}())
