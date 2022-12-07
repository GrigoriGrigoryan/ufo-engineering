module.exports.routes = {
  'post /insert': {
    controller: 'UserController',
    action: 'insertUserData',
  },
  'get /users': {
    controller: 'UserController',
    action: 'generateUsersList',
  },
};
