(function() {
  screman.init('screen.id.app-test');
  auth.ensureLoggedIn();

  function setParameters(parameters) {
    var elt = document.getElementById('parameters');
    elt.textContent = JSON.stringify(parameters, null, 2);
  }

  function bindElements() {
    document.getElementById('log-out-button').onclick = () => auth.logout();
    document.getElementById('current-username').textContent = auth.getUserName();
    document.getElementById('return-link').setAttribute(
      'href',
      screman.createOpenLink({ appId: 'screen.id.navigation' })
    );
  }

  window.onload = function() {
    bindElements();
    setParameters(screman.getRawQueries());
  };
}())
