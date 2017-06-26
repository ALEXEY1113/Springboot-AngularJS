(function() {
  'use strict';

  angular
    .module('course')
    .factory('authenticationFactory', AuthenticationFactory);

  AuthenticationFactory.$inject = ['$http', '$q'];
  function AuthenticationFactory($http, $q) {
    var service = {

      getByUsername : getByUsername
    
    };
    
    return service;

    ////////////////
    function getByUsername(username) {
      return $http.get('http://localhost:8080/login/' + username)
                    .then(function(user) {

                      return user;
                    },
                    function(err) {
                      return null;
                    });
      /*
      console.log('USRFACTORY: ', username);

      var deferred = $q.defer();

      var filtered = [{username : username}];   //$filter('filter')(getUsers(), { username: username });

      console.log('FILTERED: ', filtered, filtered.length);

      var user = filtered.length ? filtered[0] : null;

      console.log('USRFILTERED: ', user);

      deferred.resolve(user);
      return deferred.promise;*/
    }
  }
})();