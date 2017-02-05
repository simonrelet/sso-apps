(function() {
  screman.init('screen.id.user-list');
  auth.ensureLoggedIn();

  const elements = {
    userCount: null,
    users: null,
  };

  function createThumbnail(user) {
    const elt = document.createElement('img');
    elt.setAttribute('src', user.picture.thumbnail);
    return elt;
  }

  function getName(user) {
    return `${user.name.first} ${user.name.last}`;
  }

  function createName(user) {
    const elt = document.createElement('div');
    elt.textContent = getName(user);
    return elt;
  }

  function createUsername(user) {
    const elt = document.createElement('div');
    elt.setAttribute('class', 'username');
    elt.textContent = user.login.username;
    return elt;
  }

  function createInfo(user) {
    const elt = document.createElement('div');
    elt.setAttribute('class', 'info');
    elt.append(createName(user));
    elt.append(createUsername(user));
    return elt;
  }

  function createUser(user) {
    const name = getName(user);
    const url = screman.createReturnLink({
      resultMap: { userId: user.id },
    });

    const elt = document.createElement('a');
    elt.setAttribute('class', 'user');
    elt.setAttribute('href', url);
    elt.setAttribute('title', `${name} (${user.login.username})`);
    elt.append(createThumbnail(user));
    elt.append(createInfo(user));
    return elt;
  }

  function displayUsers(users) {
    elements.userCount.textContent = users.length;
    users.forEach(user => {
      elements.users.append(createUser(user));
    });
  }

  function bindElements() {
    document.getElementById('log-out-button').onclick = () => auth.logout();
    document.getElementById('current-username').textContent = auth.getUserName();
    document.getElementById('return-link').setAttribute(
      'href',
      screman.createOpenLink({ appId: 'screen.id.navigation' })
    );

    elements.userCount = document.getElementById('user-count');
    elements.users = document.getElementById('users');
  }

  window.onload = function() {
    bindElements();

    axios.get('/api/users/')
      .then(response => displayUsers(response.data))
      .catch(error => console.error(error));
  };
}())
