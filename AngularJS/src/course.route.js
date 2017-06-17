(function() {
  'use strict';

  // Agregamos la ruta al modulo de la APP
  angular.module('course')
  .config(function($stateProvider, $urlRouterProvider) {
    // Ruta por default
    $urlRouterProvider.otherwise('login');   // Si no encuentra la ruta por defecto carga Login

    $stateProvider
    .state('login', {
      url: '/login',
      templateUrl: 'views/login.view.html'
    })
    .state('users', {
      url: '/users',
      templateUrl: 'views/user.view.html'
    });
  });
})();