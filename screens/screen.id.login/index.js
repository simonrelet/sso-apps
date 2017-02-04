(function() {
  screman.init('screen.id.login');

  var redirect = screman.getReturnTo() || 'screen.id.navigation';
  auth.ensureNotLoggedIn(redirect);

  window.login = function() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    auth.login(username, password, redirect);
  }
}())
