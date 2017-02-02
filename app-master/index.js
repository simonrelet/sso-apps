(function() {
  auth.ensureLoggedIn('app-master');

  function createThumbnail(user) {
    var elt = document.createElement('img');
    elt.setAttribute('src', user.picture.thumbnail);
    return elt;
  }

  function getName(user) {
    return user.name.first + ' ' + user.name.last;
  }

  function createName(user) {
    var elt = document.createElement('div');
    elt.textContent = getName(user);
    return elt;
  }

  function createUsername(user) {
    var elt = document.createElement('div');
    elt.setAttribute('class', 'username');
    elt.textContent = user.login.username;
    return elt;
  }

  function createInfo(user) {
    var elt = document.createElement('div');
    elt.setAttribute('class', 'info');
    elt.append(createName(user));
    elt.append(createUsername(user));
    return elt;
  }

  function createUser(user) {
    var elt = document.createElement('a');
    elt.setAttribute('class', 'user');
    elt.setAttribute('href', '/app-details/?userId=' + user.id);
    elt.setAttribute('title', getName(user) + ' (' + user.login.username + ')');
    elt.append(createThumbnail(user));
    elt.append(createInfo(user));
    return elt;
  }

  function displayUsers(users) {
    var userCount = document.getElementById('user-count');
    userCount.textContent = users.length;

    var usersList = document.getElementById('users');
    for (var i = 0; i < users.length; i++) {
      usersList.append(createUser(users[i]));
    }
  }

  window.onload = function() {
    axios.get('/api/users/')
      .then(function (response) {
        displayUsers(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  };
}())
