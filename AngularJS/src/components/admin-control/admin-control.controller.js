(function() {
  'use strict';

  angular
    .module('course')
    .controller('adminController', AdminController);

  AdminController.$inject = ['$location', 'navService'];
  function AdminController($location, navService) {
    var vm = this;
    
    vm.$onInit = function() {
      navService.setAdminActiveNav('Overview');
      vm.activeNavAdmin = navService.getAdminActiveNav();
    };

    // Navbar Admin
    vm.navSubStudent = navSubStudent;
    vm.navSubTeacher = navSubTeacher;
    vm.navSubTask = navSubTask;
    vm.navOverview = navOverview;

    // Top Menu
    vm.btnTeacher = teacher;
    vm.btnStudent = student;
    vm.btnCourse = course;
    vm.btnTask = task;

    // Navbar Admin functions
    function navSubStudent() {
      navService.setAdminActiveNav('SubStudent');
      vm.activeNavAdmin = navService.getAdminActiveNav();

      // Redirect to Sub Student
      $location.path('/sub-student');
    }
    function navSubTeacher() {
      navService.setAdminActiveNav('SubTeacher');
      vm.activeNavAdmin = navService.getAdminActiveNav();

      // Redirect to Sub Student
      $location.path('/sub-teacher');
    }
    function navSubTask() {
      navService.setAdminActiveNav('SubTask');
      vm.activeNavAdmin = navService.getAdminActiveNav();

      // Redirect to Sub Student
      $location.path('/sub-task');
    }
    function navOverview() {
      navService.setAdminActiveNav('Overview');
      vm.activeNavAdmin = navService.getAdminActiveNav();
    }

    // Button Teachers
    function teacher() {
      // console.log('BTN Teacher');
      $location.path('/teachers');
    }

    // Button Student
    function student() {
      // console.log('BTN Student');
      $location.path('/students');
    }

    // Button course
    function course() {
      // console.log('BTN Course');
      $location.path('/courses');
    }

    // Button Teachers
    function task() {
      // console.log('BTN Task');
      $location.path('/tasks');
    }
  }
})();