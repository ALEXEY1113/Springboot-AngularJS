(function() {
  'use strict';

  // Usage:
  // 
  // Creates:
  // 

  angular
    .module('course')
    .component('studentPanel', {
      templateUrl: 'components/student-panel/student-panel.html',
      controller: 'studentController',
      bindings: {
      }
    });
})();