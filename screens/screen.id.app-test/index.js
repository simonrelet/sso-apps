(function() {
  screman.init('screen.id.app-test');
  auth.ensureLoggedIn();

  function setParameters(parameters) {
    var elt = document.getElementById('parameters');
    elt.textContent = JSON.stringify(parameters, null, 2);
  }

  window.createLink = function() {
    var application = document.getElementById('application').value || 'screen.id.app-test';
    var queries = document.getElementById('queries').value;
    var url = screman.createOpenLink({ appId: application })
      + (queries ? '?' + queries : '');

    var elt = document.createElement('a');
    elt.setAttribute('href', url);
    elt.textContent = url;

    var linkElt = document.getElementById('link');
    linkElt.innerHTML = '';
    linkElt.append(elt);
  }

  function createReturnLink() {
    document.getElementById('return-link').setAttribute(
      'href',
      screman.createOpenLink({ appId: 'screen.id.navigation' }));
  }

  window.onload = function() {
    createReturnLink();

    setParameters(screman.getRaw());
  };
}())
