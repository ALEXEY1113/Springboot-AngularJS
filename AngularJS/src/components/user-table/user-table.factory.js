(function() {
  'use strict';

  angular
    .module('course')
    .factory('userTableFactory', UserTableFactory);

  UserTableFactory.$inject = ['$http', '$q'];
  function UserTableFactory($http, $q) {
    
    var service = {
      // Definition of Use => nombrePublicoDelFactory : funcionARealizar
      getUsers : getUsers,
      updateUsers: updateUsers
    };
    
    return service;

    ////////////////
    function getUsers() {
      //console.log('Get Users from Factory');
      var users;
          // JSON de Users Static
          // = [
          //   {"name":"Bob", "lastname":"Smith", "age":25},
          //   {"name":"Prince", "lastname":"Gordon", "age":24},
          //   {"name":"Ryan", "lastname":"Keanu", "age":29},
          //   {"name":"Samantha", "lastname":"Taylor", "age":35},
          //   {"name":"Marion", "lastname":"Dylan", "age":20}
          // ];
      
      // Accediendo al Servicio del Backend
      users = $http.get('http://localhost:8080/students').then(function(response) {
        return response.data;
      });

      return users;
    }

    // Function for test sync methods
    function updateUsers() {

      var promises = [updateUserA(), updateUserB(), updateUserC()];

      $q.all(promises).then(function(values) {
        console.log(values[0]);   // User A
        console.log(values[1]);   // User B
        console.log(values[2]);   // User C
      });
    }

    // funcion que devuelve un Promise para procesos largos
    function updateUserA() {
      var defered = $q.defer();
      var promise = defered.promise;

      defered.resolve('User A has been updated...');
      // defered.reject('Error Updating User A');
    }

    function updateUserB() {
      var defered = $q.defer();
      var promise = defered.promise;

      defered.resolve('User B has been updated...');
      // defered.reject('Error Updating User B');
    }

    function updateUserC() {
      var defered = $q.defer();
      var promise = defered.promise;

      defered.resolve('User C has been updated...');
      // defered.reject('Error Updating User C');
    }
  }
})();