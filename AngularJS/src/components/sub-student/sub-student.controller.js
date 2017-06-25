(function() {
  'use strict';

  angular
    .module('course')
    .controller('subStudentController', SubStudentController);

  SubStudentController.$inject = ['$location', 'navService', 'subStudentFactory'];
  function SubStudentController($location, navService, subStudentFactory) {
    var vm = this;

    vm.listClassRoomsDB = [];
    vm.listStudentsDB = [];
    vm.listCoursesDB = [];
    var listCoursesDBAux = [];
    vm.newSubStudent = null;
    vm.coursesSubStudent = [];

    vm.student = null;
    vm.courses = [];

    vm.preSelection = 'Confirm';
    vm.listSubs = [];

    vm.confirmSelection = confirmSelection;
    vm.backSubStudent = backSubStudent;
    vm.saveSubStudent = saveSubStudent;
    vm.cancelSubStudent = cancelSubStudent;

    vm.navOverview = navOverview;
    // vm.navSubStudent = navSubStudent;
    vm.navSubTeacher = navSubTeacher;
    vm.navSubTask = navSubTask;

    vm.getStudent = getStudent;
    ////////////////

    vm.$onInit = function() {
      subStudentFactory.getAllClassRoom()
                  .then(function (response) {
                    vm.listClassRoomsDB = response.data;
                  });

      subStudentFactory.getAllSubStudent()
                .then(function(response) {
                  vm.listSubs = response.data;
                });


      vm.actionSubStudentTitle = 'Add New Subscription Student';
      // navService.setAdminActiveDefaultNav();
      navService.setAdminActiveNav('SubStudent');
      vm.activeNavAdmin = navService.getAdminActiveNav();

      subStudentFactory.getAllStudents()
                      .then(function(response) {
                        vm.listStudentsDB = response.data;
                      });
      getAllCoursesDefault();
    };

    function getStudent() {
      if (vm.newSubStudent) {
        vm.student = JSON.parse(vm.newSubStudent);

        vm.listStudentCourses = [];
        subStudentFactory.getSubsStudentFromStudentId(vm.student.id)
                          .then(function (response) {
                            // console.log('Response Courses Student', response.data);
                            vm.listStudentCourses = response.data;

                            refreshListCoursesStudentSelected(vm.listStudentCourses);
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

    function backSubStudent() {
      vm.courses = [];
      vm.preSelection = 'Confirm';
    }
    function saveSubStudent() {
      // console.log('Saving Subscription Student');
      for (var i = 0; i < vm.courses.length; i++) {
        var courseId = vm.courses[i].id;
        var classRoomId = selectRandomIdClassRoom();

        var subStudent = {
                        'idClassRoom': classRoomId,
                        'idCourse': courseId,
                        'idStudent': vm.student.id,
                        'subscriptionStudentDate': new Date()
                      };

        subStudentFactory.saveSubsStudentCourses(subStudent);
      }
    }
    function cancelSubStudent() {
      console.log('Cancel Subscription Student');
      initSelectionDefault();
    }

    function initSelectionDefault() {
      vm.preSelection = 'Confirm';

      vm.newSubStudent = null;
      vm.coursesSubStudent = [];

      vm.student = null;
      vm.courses = [];
    }

    function refreshListCoursesStudentSelected(listStudentCourses) {
      getAllCoursesDefault();

      for (var i = 0; i < listStudentCourses.length; i++) {
        var course = listStudentCourses[i].course;

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
      subStudentFactory.getAllCourses()
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
  }
})();