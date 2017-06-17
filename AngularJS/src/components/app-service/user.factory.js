(function() {
  'use strict';

  angular
    .module('course')
    .factory('userFactory', UserFactory);

  UserFactory.$inject = ['$http', '$q'];
  function UserFactory($http, $q) {
    var service = {
      getByUsername : getByUsername
    };
    
    return service;

    ////////////////
    function getByUsername(username) {
      /*
      return $http.get('/api/users/' + username)
                    .then(handleSuccess, handleError('Error getting user by username'));*/
      // var response = { username: 'Bob', password: '1234' };
      // return response;

      console.log('USRFACTORY: ', username);

      var deferred = $q.defer();

      var filtered = [{username : username}];   //$filter('filter')(getUsers(), { username: username });

      console.log('FILTERED: ', filtered, filtered.length);

      var user = filtered.length ? filtered[0] : null;

      console.log('USRFILTERED: ', user);

      deferred.resolve(user);
      return deferred.promise;
    }
  }
})();