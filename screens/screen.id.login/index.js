(function() {
  'use strict';

  screman.init('screen.id.login');
  const redirect = screman.getCaller() || 'screen.id.navigation';
  auth.ensureNotLoggedIn(redirect);

  const elements = {
    username: null,
    password: null,
    button: null,
  };

  function canSubmit() {
    return elements.username.value && elements.password.value;
  }

  function login() {
    auth.login(
      elements.username.value,
      elements.password.value,
      redirect
    );
  }

  function handleKey(event) {
    // enter key
    if (event.keyCode === 13 && canSubmit()) {
      login();
    } else {
      canSubmit()
        ? elements.button.removeAttribute('disabled')
        : elements.button.setAttribute('disabled', '')
    }
  }

  function bindElements() {
    elements.username = document.getElementById('username');
    elements.password = document.getElementById('password');
    elements.button = document.getElementById('button');

    elements.username.onkeyup = handleKey;
    elements.password.onkeyup = handleKey;
    elements.button.onclick = login;
  }

  window.onload = function() {
    bindElements()
  }
}())
