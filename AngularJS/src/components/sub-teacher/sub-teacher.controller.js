(function() {
  'use strict';

  angular
    .module('course')
    .controller('subTeacherController', SubTeacherController);

  SubTeacherController.$inject = ['$location', 'navService', 'subTeacherFactory'];
  function SubTeacherController($location, navService, subTeacherFactory) {
    var vm = this;

    vm.listClassRoomsDB = [];
    vm.listTeacherDB = [];
    vm.listCoursesDB = [];
    var listCoursesDBAux = [];
    vm.newSubTeacher = null;
    vm.coursesSubTeacher = [];

    vm.teacher = null;
    vm.courses = [];

    vm.preSelection = 'Confirm';
    vm.listSubs = [];

    vm.confirmSelection = confirmSelection;
    vm.backSubTeacher = backSubTeacher;
    vm.saveSubTeacher = saveSubTeacher;
    vm.cancelSubTeacher = cancelSubTeacher;

    vm.navOverview = navOverview;
    vm.navSubStudent = navSubStudent;
    // vm.navSubTeacher = navSubTeacher;
    vm.navSubTask = navSubTask;

    vm.getTeacher = getTeacher;
    ////////////////

    vm.$onInit = function() {
      subTeacherFactory.getAllClassRoom()
                  .then(function (response) {
                    vm.listClassRoomsDB = response.data;
                  });

      subTeacherFactory.getAllSubTeacher()
                .then(function(response) {
                  vm.listSubs = response.data;
                });


      vm.actionSubTeacherTitle = 'Add New Subscription Teacher';
      // navService.setAdminActiveDefaultNav();
      navService.setAdminActiveNav('SubTeacher');
      vm.activeNavAdmin = navService.getAdminActiveNav();

      subTeacherFactory.getAllTeachers()
                      .then(function(response) {
                        vm.listTeachersDB = response.data;
                      });
      getAllCoursesDefault();
    };

    function getTeacher() {
      if (vm.newSubTeacher) {
        vm.teacher = JSON.parse(vm.newSubTeacher);

        vm.listTeacherCourses = [];
        subTeacherFactory.getSubsTeacherFromTeacherId(vm.teacher.id)
                          .then(function (response) {
                            // console.log('Response Courses Teacher', response.data);
                            vm.listTeacherCourses = response.data;

                            refreshListCoursesTeacherSelected(vm.listTeacherCourses);
                          });
      }
    }

    function confirmSelection(courses) {
      // Convert all selections to Objects
      for (var i = 0; i < courses.length; i++) {
        vm.courses.push(JSON.parse(courses[i]));
      }

      vm.preSelection = 'Done';
    }

    function backSubTeacher() {
      vm.courses = [];
      vm.preSelection = 'Confirm';

      getTeacher();
    }
    function saveSubTeacher() {
      // console.log('Saving Subscription Teacher');
      for (var i = 0; i < vm.courses.length; i++) {
        var courseId = vm.courses[i].id;
        var classRoomId = selectRandomIdClassRoom();

        var subTeacher = {
                          'idClassRoom': classRoomId,
                          'idCourse': courseId,
                          'idTeacher': vm.teacher.id,
                          'subscriptionTeacherDate': new Date()
                        };
        
        // Save Subscription Teacher
        subTeacherFactory.saveSubsTeacherCourses(subTeacher);
      }

      // Show Message Success
      vm.alertDivContent = navService.getDivAlert('success', 'Subscription Teacher Created Successfully.');

      // Reset Fields after save Subscriptions Teacher
      vm.teacher = null;
      vm.courses = [];
      vm.saveSubsTeacherDone = true;
    }
    function cancelSubTeacher() {
      console.log('Cancel Subscription Teacher');
      initSelectionDefault();
    }

    function initSelectionDefault() {
      vm.preSelection = 'Confirm';

      vm.newSubTeacher = null;
      vm.coursesSubTeacher = [];

      vm.teacher = null;
      vm.courses = [];
    }

    function refreshListCoursesTeacherSelected(listTeacherCourses) {
      getAllCoursesDefault();

      for (var i = 0; i < listTeacherCourses.length; i++) {
        var course = listTeacherCourses[i].course;

        for (var j = 0; j < listCoursesDBAux.length; j++) {
          var courseDB = listCoursesDBAux[j];

          if (courseDB.id === course.id) {
            // console.log('Items Before', listCoursesDBAux.length);
            listCoursesDBAux.splice(j, 1);
            // console.log('Items After', listCoursesDBAux.length);
          }
        }
      }

      vm.listCoursesDB = listCoursesDBAux;
    }

    function getAllCoursesDefault() {
      subTeacherFactory.getAllCourses()
                        .then(function(response) {
                          listCoursesDBAux = response.data;
                        });
    }

    function selectRandomIdClassRoom() {
      return vm.listClassRoomsDB[Math.floor(Math.random() * vm.listClassRoomsDB.length)].id;
    }

    // Navbar Functions
    function navOverview() {
      navService.setAdminActiveNav('OverView');
      vm.activeNavAdmin = navService.getAdminActiveNav();

      // Redirect to Sub Student
      $location.path('/admin-control');
    }
    function navSubStudent() {
      navService.setAdminActiveNav('SubStudent');
      vm.activeNavAdmin = navService.getAdminActiveNav();

      // Redirect to Sub Student
      $location.path('/sub-student');
    }
    function navSubTask() {
      navService.setAdminActiveNav('SubTask');
      vm.activeNavAdmin = navService.getAdminActiveNav();

      // Redirect to Sub Student
      $location.path('/sub-task');
    }
  }
})();