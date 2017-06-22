(function() {
  'use strict';

  angular
    .module('course')
    .controller('navAppController', NavAppController);

  NavAppController.$inject = ['$location', 'navService'];
  function NavAppController($location, navService) {
    var vm = this;
    
    // We defined default Menu 
    vm.activeMenu = navService.getActiveMenu();

    vm.admin = admin;
    vm.courses = courses;
    vm.teachers = teachers;
    vm.students = students;
    vm.tasks = tasks;

    function admin() {
      // console.log('Nav -> Admin');
      //setActive('Home');
      navService.setActive('Home');
      vm.activeMenu = navService.getActiveMenu();

      // Redirect
      $location.path('/admin-control');
    }

    function courses() {
      // console.log('Nav -> Courses');
      //setActive('Courses');
      navService.setActive('Courses');
      vm.activeMenu = navService.getActiveMenu();

      // Redirect
      $location.path('/courses');
    }

    function teachers() {
      // console.log('Nav -> Teachers');
      navService.setActive('Teachers');
      vm.activeMenu = navService.getActiveMenu();

      // Redirect
      $location.path('/teachers');
    }

    function students() {
      // console.log('Nav -> Students');
      navService.setActive('Students');
      vm.activeMenu = navService.getActiveMenu();

      // Redirect
      $location.path('/students');
    }

    function tasks() {
      // console.log('Nav -> Tasks');
      navService.setActive('Tasks');
      vm.activeMenu = navService.getActiveMenu();

      // Redirect
      $location.path('/tasks');
    }
  }
})();