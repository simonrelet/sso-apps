(function() {
  screman.init('screen.id.user-details');
  auth.ensureLoggedIn();

  function createName(user) {
    var name = document.createElement('div');
    name.setAttribute('class', 'name');
    name.textContent = user.name.first + ' ' + user.name.last;
    return name;
  }

  function createUserName(user) {
    var name = document.createElement('div');
    name.setAttribute('class', 'username');
    name.textContent = user.login.username;
    return name;
  }

  function createInfo(user) {
    var elt = document.createElement('div');
    elt.setAttribute('class', 'info');
    elt.append(createName(user));
    elt.append(createUserName(user));
    return elt;
  }

  function createThumbnail(user) {
    var elt = document.createElement('img');
    elt.setAttribute('src', user.picture.medium);
    return elt;
  }

  function createTop(user) {
    var elt = document.createElement('div');
    elt.setAttribute('class', 'top');
    elt.append(createThumbnail(user));
    elt.append(createInfo(user));
    return elt;
  }

  function createAddress(user) {
    var elt = document.createElement('div');
    elt.setAttribute('class', 'address');

    var line1 = document.createElement('div');
    line1.textContent = user.location.street + ', ' + user.location.city;

    var line2 = document.createElement('div');
    line2.textContent = user.location.state + ', ' + user.location.postcode;

    elt.append(line1);
    elt.append(line2);
    return elt;
  }

  function createPhones(user) {
    var elt = document.createElement('div');
    elt.setAttribute('class', 'phones');

    var line1 = document.createElement('div');
    line1.textContent = 'Phone: ' + user.phone;

    var line2 = document.createElement('div');
    line2.textContent = 'Cell: ' + user.cell;

    elt.append(line1);
    elt.append(line2);
    return elt;
  }

  function createBottom(user, showPhones) {
    var elt = document.createElement('div');
    elt.setAttribute('class', 'bottom');
    elt.append(createAddress(user));

    if (showPhones) {
      elt.append(createPhones(user));
    }

    return elt;
  }

  function displayUser(user, showPhones) {
    var elt = document.getElementById('user');
    elt.append(createTop(user));
    elt.append(createBottom(user, showPhones));
  }

  function setOpenLinkUrl() {
    var url = screman.createOpenLinkWithResult({
      appId: 'screen.id.user-list',
      resultMap: { userId: 'user' },
    });

    var link = document.getElementById('open-link');
    link.setAttribute('href', url);
  }

  function createReturnLink() {
    document.getElementById('return-link').setAttribute(
      'href',
      screman.createOpenLink({ appId: 'screen.id.navigation' }));
  }

  window.onload = function() {
    createReturnLink();

    var userId = parseInt(screman.getQueries().user);
    var showPhones = screman.getQueries().hasOwnProperty('phones');

    setOpenLinkUrl();

    if (!isNaN(userId)) {
      axios.get('/api/users/' + userId)
        .then(function (response) {
          displayUser(response.data, showPhones);
        })
        .catch(function (error) {
          console.error(error);
        });
    } else {
      var elt = document.getElementById('user');
      elt.textContent = 'No user selected';
    }
  };
}())