(function() {
  'use strict';

  // Usage:
  // 
  // Creates:
  // 

  angular
    .module('course')
    .component('teacherPanel', {
      templateUrl: 'components/teacher-panel/teacher-panel.html',
      controller: 'teacherController',
      bindings: {
      }
    });
})();