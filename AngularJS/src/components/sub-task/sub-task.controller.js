(function() {
  'use strict';

  angular
    .module('course')
    .controller('subTaskController', SubTaskController);

  SubTaskController.$inject = ['$location', 'navService', 'subTaskFactory'];
  function SubTaskController($location, navService, subTaskFactory) {
    var vm = this;

    vm.listStudentsDB = [];
    vm.listCoursesDB = [];
    vm.listTasksDB = [];

    var listCoursesDBAux = [];
    var listStudentsDBAux = [];

    vm.newSubTask = null;

    vm.task = null;
    vm.courses = [];
    vm.students = [];

    vm.studentsArrayView = [];
    vm.coursesArrayView = [];

    vm.preSelection = 'Confirm';
    vm.listSubsDB = [];

    vm.confirmSelection = confirmSelection;
    vm.backSubTask = backSubTask;
    vm.saveSubTask = saveSubTask;
    vm.cancelSubTask = cancelSubTask;

    vm.navOverview = navOverview;
    vm.navSubStudent = navSubStudent;
    vm.navSubTeacher = navSubTeacher;
    // vm.navSubTask = navSubTask;

    vm.studentChange = studentChange;
    vm.courseChange = courseChange;

    vm.getTask = getTask;
    ////////////////

    vm.$onInit = function() {
      // Getting All Subscription Task
      getAllSubTask();

      vm.actionSubTaskTitle = 'Add New Subscription Task';
      // navService.setAdminActiveDefaultNav();
      navService.setAdminActiveNav('SubTask');
      vm.activeNavAdmin = navService.getAdminActiveNav();

      getAllStudentsDefault();
      getAllCoursesDefault();
      subTaskFactory.getAllTasks()
                      .then(function(response) {
                        vm.listTasksDB = response.data;
                      });
    };

    function studentChange() {
      vm.studentsArrayView = [];

      if (vm.studentsSubTask) {
        for (var s = 0; s < vm.studentsSubTask.length; s++) {
          var json = JSON.parse(vm.studentsSubTask[s]);
          vm.studentsArrayView.push(json.name + ' ' + json.lastname);
        }
      }
    }

    function courseChange() {
      vm.coursesArrayView = [];

      if (vm.coursesSubTask) {
        for (var s = 0; s < vm.coursesSubTask.length; s++) {
          var json = JSON.parse(vm.coursesSubTask[s]);
          vm.coursesArrayView.push(json.name + ' ' + json.grade);
        }
      }
    }

    function getTask() {
      if (vm.newSubTask) {
        vm.task = JSON.parse(vm.newSubTask);

        vm.listTaskCourses = [];
        subTaskFactory.getSubsTaskFromTaskId(vm.task.id)
                        .then(function (response) {
                          // console.log('Response Courses Task', response.data);
                          vm.listTaskCourses = response.data;

                          refreshListCoursesTaskSelected(vm.listTaskCourses);
                        });
      }
    }

    function confirmSelection(courses, students) {
      // Convert all selections to Objects
      for (var i = 0; i < courses.length; i++) {
        vm.courses.push(JSON.parse(courses[i]));
      }

      for (var j = 0; j < students.length; j++) {
        vm.students.push(JSON.parse(students[j]));
      }

      vm.preSelection = 'Done';
    }

    function backSubTask() {
      vm.courses = [];
      vm.students = [];
      vm.preSelection = 'Confirm';
      vm.saveSubsTaskDone = false;

      // Task with Courses Availables
      getTask();

      // General List of Subscriptions Task
      getAllSubTask();
    }
    function saveSubTask() {
      // console.log('Saving Subscription Task');
      for (var i = 0; i < vm.courses.length; i++) {
        var courseId = vm.courses[i].id;

        for (var j = 0; j < vm.students.length; j++) {
          var studentId = vm.students[j].id;

          var subTask = {
                        'idStudent': studentId,
                        'idCourse': courseId,
                        'idTask': vm.task.id,
                        'subscriptionTaskDate': new Date()
                      };

          // Save Subscription Task
          subTaskFactory.saveSubsTaskCourses(subTask);
        }
      }

      // Show Message Success
      vm.alertDivContent = navService.getDivAlert('success', 'Subscription Task was created successfully.');

      // Reset Fields after save Subscriptions Task
      vm.saveSubsTaskDone = true;

      // Refres List SubscriptionsDB
      getAllSubTask();
    }
    function cancelSubTask() {
      // console.log('Cancel Subscription Task');
      initSelectionDefault();
    }

    function initSelectionDefault() {
      vm.preSelection = 'Confirm';

      vm.saveSubsTaskDone = false;

      vm.task = null;
      vm.newSubTask = null;

      vm.courses = [];
      vm.students = [];
    }

    function refreshListCoursesTaskSelected(listTaskCourses) {
      getAllCoursesDefault();

      for (var i = 0; i < listTaskCourses.length; i++) {
        var course = listTaskCourses[i].course;

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
      subTaskFactory.getAllCourses()
                        .then(function(response) {
                          listCoursesDBAux = response.data;
                        });
    }

    function getAllStudentsDefault() {
      subTaskFactory.getAllStudents()
                      .then(function (response) {
                        // listStudentsDBAux = response.data;
                        vm.listStudentsDB = response.data;
                      });
    }

    function getAllSubTask () {
      subTaskFactory.getAllSubTask()
                      .then(function(response) {
                        vm.listSubsDB = response.data;
                      });
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
    function navSubTeacher() {
      navService.setAdminActiveNav('SubTeacher');
      vm.activeNavAdmin = navService.getAdminActiveNav();

      // Redirect to Sub Student
      $location.path('/sub-teacher');
    }
  }
})();