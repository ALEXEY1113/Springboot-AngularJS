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

    .state('students', {
      url: '/students',
      templateUrl: 'views/student.view.html'
    })

    .state('teachers', {
      url: '/teachers',
      templateUrl: 'views/teacher.view.html'
    })
    
    .state('courses', {
      url: '/courses',
      templateUrl: 'views/course.view.html'
    })
    
    .state('tasks', {
      url: '/tasks',
      templateUrl: 'views/task.view.html'
    })
    
    .state('admin-control', {
      url: '/admin-control',
      templateUrl: 'views/admin.view.html'
    });
  });
})();