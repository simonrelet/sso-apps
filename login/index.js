(function() {
  var redirect = queries.parse().redirect || 'navigation';
  auth.ensureNotLoggedIn(redirect);

  window.login = function() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    auth.login(username, password, redirect);
  }
}())
