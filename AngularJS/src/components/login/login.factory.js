(function() {
  'use strict';

  angular
    .module('course')
    .factory('loginFactory', LoginFactory);

  LoginFactory.$inject = ['$http', 'authenticationFactory'];
  function LoginFactory($http, authenticationFactory) {

    var isLoged = false;

    var service = {

      getIsLoged : getIsLoged,
      setLoged : setLoged,

      loginUser : loginUser/*,
      setCredentials : setCredentials,
      clearCredentials : clearCredentials
      */
    };
    
    return service;

    ////////////////
    function getIsLoged() { return isLoged; }
    function setLoged(val) { isLoged = val; }

    function loginUser(username, password, callback) {
      var response;
        authenticationFactory.getByUsername(username)
          .then(function (user) {
            // console.log('USER: ', user);
            if (user.data !== '' && user.data.password === password) {
              isLoged = true;
              response = { success: true };
            } else {
              isLoged = true;
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