(function() {
  'use strict';

  angular
    .module('course')
    .controller('coursesAllController', CoursesAllController);

  CoursesAllController.$inject = ['coursesAllFactory', 'navService'];
  function CoursesAllController(courseAllFactory, navService) {
    var vm = this;

    vm.course = null;
    vm.listCourses = null;
    resetContentActive();
    vm.activeMenuCourse = navService.getDefaultOptCRUD();
    navService.setDefautlOptTitle();
    vm.actionCourseTitle = navService.getTitleOptionActive();

    // Options panel left-hand side
    vm.addOption = addOption;
    vm.editOption = editOption;
    vm.deleteOption = deleteOption;
    vm.listOption = listOption;

    // Buttons Forms
    vm.createNewCourse = createNewCourse;
    vm.cancelAddCourse = cancelAddCourse;
    vm.editCourse = editCourse;
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
    function cancelAddCourse() {
      navService.setDefautlOptTitle();
      vm.actionCourseTitle = navService.getTitleOptionActive();
      resetContentActive();
    }

    function editCourse(course) {

    }
    function cancelEditCourse() {
      navService.setDefautlOptTitle();
      vm.actionCourseTitle = navService.getTitleOptionActive();
      resetContentActive();
    }

    function confirmDeleteCourse() {
      // Verify if deleteSelectedCourse exist
      if (vm.deleteSelectedCourse !== null) {
        var deletedCourse = JSON.parse(vm.deleteSelectedCourse);

        var idCourse = deletedCourse.id;
        console.log('IDCOURSE', idCourse);
        var promise;
        // TODO
        courseAllFactory.deleteCourse(idCourse)
                          .then(function (response) {
                            vm.alertDivContent = navService.getDivAlert('success', 'Course was Deleted.');
                            promise = response;
                          },
                          function(error) {
                            promise = response;
                            vm.alertDivContent = navService.getDivAlert('danger', 'Failed to delete Courses.');
                          });

        console.log('DeleteCourse: ', vm.deleteSelectedCourse);
        console.log('PROMISE: ', promise);
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
    function addOption() {
      setDefaultAlertDiv();
      // change options selection
      setOptionSelected('Add');
      // change Title
      vm.actionCourseTitle = navService.getTitleOptionActive() + ' a new Course';
      vm.contentActive = 'Add';
    }

    function editOption() {
      setDefaultAlertDiv();
      // change options selection
      setOptionSelected('Edit');
      // change Title
      vm.actionCourseTitle = navService.getTitleOptionActive() + ' a Course';
      vm.contentActive = 'Edit';
    }

    function deleteOption() {
      setDefaultAlertDiv();
      // change options selection
      setOptionSelected('Delete');
      // change Title
      vm.actionCourseTitle = navService.getTitleOptionActive() + ' a Course';
      vm.contentActive = 'Delete';

      courseAllFactory.getAllCourses()
                        .then(function (courses) {
                          vm.listCourses = courses.data;
                          vm.alertDivContent = navService.getDivAlert('success', 'All Courses.');
                        },
                        function(error) {
                          vm.alertDivContent = navService.getDivAlert('danger', 'Failed to retrieve Courses.');
                        });
    }

    function listOption() {
      setDefaultAlertDiv();
      // change options selection
      setOptionSelected('List');
      // change Title
      vm.actionCourseTitle = navService.getTitleOptionActive() + ' of all Courses availables';
      vm.contentActive = 'List';

      courseAllFactory.getAllCourses()
                        .then(function (courses) {
                          vm.listCourses = courses.data;
                          vm.alertDivContent = navService.getDivAlert('success', 'Courses Availables.');
                        },
                        function(error) {
                          vm.alertDivContent = navService.getDivAlert('danger', 'Failed to retrieve Courses.');
                        });
    }

    /*
     *  Local function 
     */
    function setOptionSelected(opt) {
      // change options selection
      navService.setActiveOptCRUD(opt);
      vm.activeMenuCourse = navService.getActiveOptCRUD();
    }

    function resetContentActive() {
      vm.contentActive = '';
      vm.activeMenuCourse = navService.getDefaultOptCRUD();
      vm.deleteSelectedCourse = null;
    }

    function setDefaultAlertDiv(){
      vm.alertDivContent = null;
    }
  }
})();