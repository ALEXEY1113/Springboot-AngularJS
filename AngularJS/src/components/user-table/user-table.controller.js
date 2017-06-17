(function() {
  'use strict';

  angular
    .module('course')
    .controller('userTableController', UserTableController);

  UserTableController.$inject = ['userTableFactory'];
  
  function UserTableController(userTableFactory) {
    
    var vm = this;

    vm.$onInit = function() {
      // If Request Success
      userTableFactory.getUsers().then(function(data) {
        console.log('Data from User-Table Controller', data);
        vm.listUsers = data;
      },
      // If Request Error
      function(error) {
        console.log('Error on getUsers()', error);
      });

      // Llamamos a la funcion del factory
      userTableFactory.updateUsers();

    };

  }
})();