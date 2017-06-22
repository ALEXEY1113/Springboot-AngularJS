(function() {
  'use strict';

  // Usage:
  // 
  // Creates:
  // 

  angular
    .module('course')
    .component('task', {
      templateUrl: 'components/task/task.html',
      controller: 'taskController',
      bindings: {
      }
    });
})();