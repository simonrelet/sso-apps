(function() {
  'use strict';

  screman.init('screen.id.navigation');
  auth.ensureLoggedIn();

  // can be in a JSON file.
  const apps = Object.freeze({
    'screen.id.user-details': 'User Details',
    'screen.id.app-test': 'App Test',
  });

  const elements = {
    links: null,
  };

  function createLinks() {
    Object.keys(apps).forEach((id) => {
      const a = document.createElement('a');
      const li = document.createElement('li');

      a.setAttribute('href', screman.createOpenLink({ appId: id}));
      a.textContent = apps[id];
      li.append(a);
      elements.links.append(li);
    });
  }

  function bindElements() {
    document.getElementById('log-out-button').onclick = () => auth.logout();
    document.getElementById('current-username').textContent = auth.getUserName();

    elements.links = document.getElementById('links');
  }

  window.onload = function() {
    bindElements();
    createLinks();
  }
}())
