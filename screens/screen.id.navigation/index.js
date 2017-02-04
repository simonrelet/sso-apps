(function() {
  screman.init('screen.id.navigation');
  auth.ensureLoggedIn();

  // can be in a JSON file.
  var apps = {
    // <screen-id>: <display-name>
    'screen.id.user-details': 'User Details',
    'screen.id.app-test': 'App Test',
  };

  function createLinks() {
    var elt = document.getElementById('links');
    var li;
    var a;

    for (var id in apps) {
      if (apps.hasOwnProperty(id)) {
        a = document.createElement('a');
        li = document.createElement('li');

        a.setAttribute('href', screman.createOpenLink({ appId: id}));
        a.textContent = apps[id];
        li.append(a);
        elt.append(li);
      }
    }
  }

  window.onload = function() {
    createLinks();
  }
}())
