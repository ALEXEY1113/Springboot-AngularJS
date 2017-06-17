(function() {
  'use strict';

  // Usage:
  // 
  // Creates:
  // 

  angular
    .module('course')
    .component('loginForm', {
      templateUrl:'components/login/login.html',
      controller: 'loginController',
      bindings: {
      }
    });
})();