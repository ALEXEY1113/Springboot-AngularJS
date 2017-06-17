(function() {
  'use strict';

  angular
    .module('course')
    .factory('loginFactory', LoginFactory);

  LoginFactory.$inject = ['$http', 'userFactory'];
  function LoginFactory($http, userFactory) {
    var service = {
      loginUser : loginUser/*,
      setCredentials : setCredentials,
      clearCredentials : clearCredentials
      */
    };
    
    return service;

    ////////////////
    function loginUser(username, password, callback) {
      var response;
        userFactory.getByUsername(username)
          .then(function (user) {
            console.log('USER: ', user);
            if (user) {
              response = { success: true };
            } else {
              response = { success: false, message: 'Username or Password is incorrect.' };
            }
            callback(response);
          });

        // TODO
        /*
        $http.post('/api/authentication', {username: username, password: password})
              .success(function(response) {
                callback(response);
              });
        */
    }
  }
})();