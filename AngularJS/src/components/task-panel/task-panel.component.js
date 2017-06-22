(function() {
  'use strict';

  // Usage:
  // 
  // Creates:
  // 

  angular
    .module('course')
    .component('taskPanel', {
      templateUrl: 'components/task-panel/task-panel.html',
      controller: 'taskController',
      bindings: {
      }
    });
})();