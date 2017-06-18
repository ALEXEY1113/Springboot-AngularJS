(function() {
  'use strict';

  angular
    .module('course')
    .controller('adminController', AdminController);

  AdminController.$inject = ['$location'];
  function AdminController($location) {
    var vm = this;
    
    vm.btnTeacher = teacher;
    vm.btnStudent = student;
    vm.btnCourse = course;
    vm.btnTask = task;


    // Button Teachers
    function teacher() {
      console.log('BTN Teacher');
      $location.path('/teachers');
    }

    // Button Student
    function student() {
      console.log('BTN Student');
      $location.path('/students');
    }

    // Button course
    function course() {
      console.log('BTN Course');
      $location.path('/courses');
    }

    // Button Teachers
    function task() {
      console.log('BTN Task');
      $location.path('/tasks');
    }
  }
})();