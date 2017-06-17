(function() {
  'use strict';

  // Usage:
  // 
  // Creates:
  // 

  angular
    .module('course')
    .component('userItem', {
      templateUrl: 'components/user-item/user-item.html',
      controller: 'userItemController',
      bindings: {
        // Recibimos los Usuarios de UserTable a UserItem
        user: '<'
      }
    });
})();