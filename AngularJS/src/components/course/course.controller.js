(function() {
  'use strict';

  angular
    .module('course')
    .controller('coursesAllController', CoursesAllController);

  CoursesAllController.$inject = ['coursesAllFactory', 'navService'];
  function CoursesAllController(courseAllFactory, navService) {
    var vm = this;

    vm.$onInit = function() {
      initCourse(null);
      
      vm.indexCourseSelected = null;
      vm.listCourses = null;
      
      vm.btnEditPressed = false;
      vm.activeMenuCourse = navService.getDefaultOptCRUD();
      vm.actionCourseTitle = navService.getTitleOptionActive();
      navService.setDefautlOptTitle();
      resetContentActive();

      // Charge List Courses
      refreshListCourses();
    };

    // Options panel left-hand side
    vm.addOption = addOption;
    vm.editOption = editOption;
    vm.deleteOption = deleteOption;
    vm.listOption = listOption;

    // Buttons Forms
    vm.createNewCourse = createNewCourse;
    vm.cancelAddCourse = cancelAddCourse;
    vm.confirmEditCourse = confirmEditCourse;
    vm.cancelEditCourse = cancelEditCourse;
    vm.confirmDeleteCourse = confirmDeleteCourse;
    vm.cancelDeleteCourse = cancelDeleteCourse;

    // Div Alert Course
    navService.setDefaultDivAlert();
    vm.alertDivContent = [];

    /* 
     * Functions Buttons
     */
    function createNewCourse(course) {
      vm.course = course;
      
      var idCourse = null;
      if (vm.editSelectedCourse) {
        var esc = JSON.parse(vm.editSelectedCourse);
        idCourse = esc.id;
      }

      if (vm.editSelectedCourse && vm.btnEditPressed) {
        // It's an Edition
        // console.log('Edit Course', vm.editSelectedCourse);
        
        courseAllFactory.editCourse(idCourse, vm.course)
                        .then(function (response) {
                          // Success
                          console.log('Response After Edit', response);
                           vm.alertDivContent = navService.getDivAlert('success', 'Course was edited successfully.');
                         },
                         function (error) {
                           // Error
                           vm.alertDivContent = navService.getDivAlert('danger', 'Course was not edited.');
                         });
      } else {
        // It's a New Course
        // console.log('New Course', vm.course);

        courseAllFactory.addNewCourse(course)
                         .then(function (data) {
                           // Success
                           vm.alertDivContent = navService.getDivAlert('success', 'Course was created successfully.');
                         },
                         function (error) {
                           // Error
                           vm.alertDivContent = navService.getDivAlert('danger', 'Course was not created.');
                         });
      }

      initCourse(null);
      vm.editSelectedCourse = null;
    }
    function cancelAddCourse() {
      navService.setDefautlOptTitle();
      vm.actionCourseTitle = navService.getTitleOptionActive();
      resetContentActive();
      
      initCourse(null);
      vm.editSelectedCourse = null;
    }

    function confirmEditCourse() {
      // console.log('EditSelectedCourse: ', vm.editSelectedCourse);
      if (vm.editSelectedCourse) {
        vm.btnEditPressed = true;

        var esc = JSON.parse(vm.editSelectedCourse);
        vm.course.name = esc.name;
        vm.course.code = esc.code;
        vm.course.grade = esc.grade;
        vm.course.description = esc.description;

        initCourse('Edit');
        addOption('Edit');
      }
    }
    function cancelEditCourse() {
      navService.setDefautlOptTitle();
      vm.actionCourseTitle = navService.getTitleOptionActive();
      resetContentActive();

      initCourse(null);
      vm.editSelectedCourse = null;
    }

    function confirmDeleteCourse() {
      // Verify if deleteSelectedCourse exist
      if (vm.deleteSelectedCourse !== null) {
        var deletedCourse = JSON.parse(vm.deleteSelectedCourse);

        if (confirm('Are you sure to delete -->> ' + deletedCourse.name + ' <<-- Course?')) {

          var idCourse = deletedCourse.id;
          vm.deletedCourseSuccess = null;
          // Trying to Delete Course
          courseAllFactory.deleteCourse(idCourse)
                            .then(function (response) {
                              
                              vm.alertDivContent = navService.getDivAlert('success', 'Course was Deleted.');
                              vm.deletedCourseSuccess = courseAllFactory.getVarDeletedCourseSuccess();
                              refreshListCourses();

                              if (vm.deletedCourseSuccess) {
                                alert('Course was Deleted.');
                              } else {
                                alert('Failed to delete a Course because has some dependencies.');
                              }
                            },
                            function(error) {
                              vm.deletedCourseSuccess = error;
                              vm.alertDivContent = navService.getDivAlert('danger', 'Failed to delete a Course.');
                            });
        }
      }
    }
    function cancelDeleteCourse() {
      navService.setDefautlOptTitle();
      vm.actionCourseTitle = navService.getTitleOptionActive();
      resetContentActive();
    }

    /* 
     * Functions Options Selected
     */
    function addOption(type) {
      setDefaultAlertDiv();
      // change options selection
      if (type != 'Edit') {
        setOptionSelected('Add');
        vm.actionCourseTitle = navService.getTitleOptionActive() + ' a new Course';
      }
      else{
        setOptionSelected('Edit');
      }
      // change Title
      vm.contentActive = 'Add';
    }

    function editOption() {
      setDefaultAlertDiv();
      // change options selection
      setOptionSelected('Edit');
      // change Title
      vm.actionCourseTitle = navService.getTitleOptionActive() + ' a Course';
      vm.contentActive = 'Edit';

      refreshListCourses();
    }

    function deleteOption() {
      setDefaultAlertDiv();
      // change options selection
      setOptionSelected('Delete');
      // change Title
      vm.actionCourseTitle = navService.getTitleOptionActive() + ' a Course';
      vm.contentActive = 'Delete';

      refreshListCourses();
      // courseAllFactory.getAllCourses()
      //                   .then(function (courses) {
      //                     vm.listCourses = courses.data;
      //                     vm.alertDivContent = navService.getDivAlert('success', 'All Courses.');
      //                   },
      //                   function(error) {
      //                     vm.alertDivContent = navService.getDivAlert('danger', 'Failed to retrieve Courses.');
      //                   });
    }

    function listOption() {
      setDefaultAlertDiv();
      // change options selection
      setOptionSelected('List');
      // change Title
      vm.actionCourseTitle = navService.getTitleOptionActive() + ' of all Courses availables';
      vm.contentActive = 'List';

      refreshListCourses();
      // courseAllFactory.getAllCourses()
      //                   .then(function (courses) {
      //                     vm.listCourses = courses.data;
      //                     vm.alertDivContent = navService.getDivAlert('success', 'Courses Availables.');
      //                   },
      //                   function(error) {
      //                     vm.alertDivContent = navService.getDivAlert('danger', 'Failed to retrieve Courses.');
      //                   });
    }

    /*
     *  Local function 
     */
    function initCourse(action) {
      if (vm.editSelectedCourse && action == 'Edit') {
        
        var c = JSON.parse(vm.editSelectedCourse);
        // vm.course.id = c.id;
        vm.course.name = c.name;
        vm.course.code = c.code;
        vm.course.grade = c.grade;
        vm.course.description = c.description;
      } else {
        vm.course = {};
        // vm.course.id = '';
        // vm.course.name = '';
        // vm.course.code = '';
        // vm.course.grade = '';
        // vm.course.description = '';
      }
    }

    function findIfIsEdit(course) {
      var ext = false;
      for (var i = 0; i < vm.listCourses.lenght; i++) {
        var c = vm.listCourses[i];
        if (c.id == course.id) {
          ext = true;
          break;
        }
      }

      return ext;
    }

    function setOptionSelected(opt) {
      // change options selection
      navService.setActiveOptCRUD(opt);
      vm.activeMenuCourse = navService.getActiveOptCRUD();
    }

    function resetContentActive() {
      vm.contentActive = '';
      vm.activeMenuCourse = navService.getDefaultOptCRUD();
      vm.deleteSelectedCourse = null;
      vm.editSelectedCourse = null;
    }

    function setDefaultAlertDiv(){
      vm.alertDivContent = null;
    }

    function refreshListCourses() {
      courseAllFactory.getAllCourses()
                      .then(function(response) {
                        vm.listCourses = response.data;
                        vm.alertDivContent = navService.getDivAlert('success', 'Courses Availables.');
                      },
                      function(error) {
                        vm.alertDivContent = navService.getDivAlert('danger', 'Failed to retrieve Courses.');
                      });
    }
  }
})();