var data = (function() {
  var db = Object.freeze([
    { id: 1, name: 'name1', email: 'email1' },
    { id: 2, name: 'name2', email: 'email2' },
    { id: 3, name: 'name3', email: 'email3' },
  ]);

  function getAll() {
    return db;
  }

  function getId(id) {
    return db.find(function(obj) {
      return obj.id === id;
    });
  }

  return {
    getAll,
    getId,
  };
}());
