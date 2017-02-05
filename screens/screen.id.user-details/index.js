(function() {
  screman.init('screen.id.user-details');
  auth.ensureLoggedIn();

  const elements = {
    user: null,
  };

  function createName(user) {
    const name = user.name;
    const elt = document.createElement('div');
    elt.setAttribute('class', 'name');
    elt.textContent = `${name.first} ${name.last}`;
    return elt;
  }

  function createUserName(user) {
    const elt = document.createElement('div');
    elt.setAttribute('class', 'username');
    elt.textContent = user.login.username;
    return elt;
  }

  function createInfo(user) {
    const elt = document.createElement('div');
    elt.setAttribute('class', 'info');
    elt.append(createName(user));
    elt.append(createUserName(user));
    return elt;
  }

  function createThumbnail(user) {
    const elt = document.createElement('img');
    elt.setAttribute('src', user.picture.medium);
    return elt;
  }

  function createTop(user) {
    const elt = document.createElement('div');
    elt.setAttribute('class', 'top');
    elt.append(createThumbnail(user));
    elt.append(createInfo(user));
    return elt;
  }

  function createAddress(user) {
    const location = user.location;
    const elt = document.createElement('div');
    elt.setAttribute('class', 'address');

    const line1 = document.createElement('div');
    line1.textContent = `${location.street}, ${location.city}`;

    const line2 = document.createElement('div');
    line2.textContent = `${location.state}, ${location.postcode}`;

    elt.append(line1);
    elt.append(line2);
    return elt;
  }

  function createPhones(user) {
    const elt = document.createElement('div');
    elt.setAttribute('class', 'phones');

    const line1 = document.createElement('div');
    line1.textContent = `Phone: ${user.phone}`;

    const line2 = document.createElement('div');
    line2.textContent = `Cell: ${user.cell}`;

    elt.append(line1);
    elt.append(line2);
    return elt;
  }

  function createBottom(user, showPhones) {
    const elt = document.createElement('div');
    elt.setAttribute('class', 'bottom');
    elt.append(createAddress(user));

    if (showPhones) {
      elt.append(createPhones(user));
    }

    return elt;
  }

  function displayUser(user, showPhones) {
    elements.user.append(createTop(user));
    elements.user.append(createBottom(user, showPhones));
  }

  function bindElements() {
    document.getElementById('log-out-button').onclick = () => auth.logout();
    document.getElementById('current-username').textContent = auth.getUserName();
    document.getElementById('return-link').setAttribute(
      'href',
      screman.createOpenLink({ appId: 'screen.id.navigation' })
    );
    document.getElementById('open-link').setAttribute(
      'href',
      screman.createOpenLinkWithResult({
        appId: 'screen.id.user-list',
        resultMap: { userId: 'user' },
      })
    );

    elements.user = document.getElementById('user');
  }

  window.onload = function() {
    bindElements();

    const userId = parseInt(screman.getQueries().user);
    const showPhones = screman.getQueries().hasOwnProperty('phones');

    if (!isNaN(userId)) {
      axios.get(`/api/users/${userId}`)
        .then(response => displayUser(response.data, showPhones))
        .catch(error => console.error(error));
    } else {
      elements.user.textContent = 'No user selected';
    }
  };
}())
