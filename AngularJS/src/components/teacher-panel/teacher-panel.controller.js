(function() {
  'use strict';

  angular
    .module('course')
    .controller('teacherController', TeacherController);

  TeacherController.$inject = ['teacherFactory', 'navService'];
  function TeacherController(teacherFactory, navService) {
    var vm = this;

    vm.$onInit = function() {
      vm.accordionArrayTeachers = [];

      initTeacher(null);
      
      vm.listTeachers = null;
      
      vm.btnEditTeacherPressed = false;
      vm.activeMenuTeacher = navService.getDefaultOptCRUD();
      navService.setDefautlOptTitle();
      vm.actionTeacherTitle = navService.getTitleOptionActive();
      navService.setDefautlOptTitle();
      resetContentActive();

      // Charge List Teachers
      refreshListTeachers();
    };

    // Options panel left-hand side
    vm.addOption = addOption;
    vm.editOption = editOption;
    vm.deleteOption = deleteOption;
    vm.listOption = listOption;

    // Buttons Forms
    vm.createNewTeacher = createNewTeacher;
    vm.cancelAddTeacher = cancelAddTeacher;
    vm.confirmEditTeacher = confirmEditTeacher;
    vm.cancelEditTeacher = cancelEditTeacher;
    vm.confirmDeleteTeacher = confirmDeleteTeacher;
    vm.cancelDeleteTeacher = cancelDeleteTeacher;

    // Div Alert Teacher
    navService.setDefaultDivAlert();
    vm.alertDivContent = [];

    /* 
     * Functions Buttons
     */
    function createNewTeacher(teacher) {
      vm.teacher = teacher;
      
      var idTeacher = null;
      if (vm.editSelectedTeacher) {
        // var estchr = JSON.parse(vm.editSelectedTeacher);
        var estchr = vm.editSelectedTeacher;
        idTeacher = estchr.id;
      }

      if (vm.editSelectedTeacher && vm.btnEditTeacherPressed) {
        // It's an Edition
        // console.log('Edit Teacher', vm.btnEditTeacherPressed);
        
        teacherFactory.editTeacher(idTeacher, vm.teacher)
                        .then(function (response) {
                          // Success
                          // console.log('Response After Edit', response);
                           vm.alertDivContent = navService.getDivAlert('success', 'Teacher was edited successfully.');
                         },
                         function (error) {
                           // Error
                           vm.alertDivContent = navService.getDivAlert('danger', 'Teacher was not edited.');
                         });
      } else {
        // It's a New Teacher
        // console.log('New Teacher', vm.teacher);

        teacherFactory.addNewTeacher(teacher)
                         .then(function (data) {
                           // Success
                           vm.alertDivContent = navService.getDivAlert('success', 'Teacher was created successfully.');
                         },
                         function (error) {
                           // Error
                           vm.alertDivContent = navService.getDivAlert('danger', 'Teacher was not created.');
                         });
      }

      initTeacher(null);
      vm.btnEditTeacherPressed = false;
      vm.editSelectedTeacher = null;
      vm.accordionArrayTeachers = [];
    }
    function cancelAddTeacher() {
      navService.setDefautlOptTitle();
      vm.actionTeacherTitle = navService.getTitleOptionActive();
      resetContentActive();
      
      initTeacher(null);
      vm.editSelectedTeacher = null;

      vm.accordionArrayTeachers = [];
    }

    function confirmEditTeacher(index) {
      vm.editSelectedTeacher = vm.listTeachers[index];

      // console.log('EditSelectedTeacher: ', vm.editSelectedTeacher);
      if (vm.editSelectedTeacher) {
        vm.btnEditTeacherPressed = true;

        // var estchr = JSON.parse(vm.editSelectedTeacher);
        var estchr = vm.editSelectedTeacher;
        vm.teacher.code = estchr.code;
        vm.teacher.name = estchr.name;
        vm.teacher.lastname = estchr.lastname;
        vm.teacher.email = estchr.email;
        vm.teacher.phone = estchr.phone;
        vm.teacher.address = estchr.address;
        vm.teacher.salary = estchr.salary;

        initTeacher('Edit');
        addOption('Edit');
      }
    }
    function cancelEditTeacher() {
      navService.setDefautlOptTitle();
      vm.actionTeacherTitle = navService.getTitleOptionActive();
      resetContentActive();

      initTeacher(null);
      vm.editSelectedTeacher = null;

      vm.accordionArrayTeachers = [];
    }

    function confirmDeleteTeacher(index) {
      vm.deleteSelectedTeacher = vm.listTeachers[index];

      // Verify if deleteSelectedTeacher exist
      if (vm.deleteSelectedTeacher !== null) {
        // var deletedTeacher = JSON.parse(vm.deleteSelectedTeacher);
        var deletedTeacher = vm.deleteSelectedTeacher;

        if (confirm('Are you sure to delete -->> ' + deletedTeacher.name + ' <<-- Teacher?')) {

          var idTeacher = deletedTeacher.id;
          vm.deletedTeacherSuccess = null;
          // Trying to Delete Teacher
          teacherFactory.deleteTeacher(idTeacher)
                            .then(function (response) {
                              
                              vm.alertDivContent = navService.getDivAlert('success', 'Teacher was Deleted.');
                              vm.deletedTeacherSuccess = teacherFactory.getVarDeletedTeacherSuccess();
                              refreshListTeachers();

                              if (vm.deletedTeacherSuccess) {
                                alert('Teacher was Deleted.');
                              } else {
                                alert('Failed to delete a Teacher because has some dependencies.');
                              }
                            },
                            function(error) {
                              vm.deletedTeacherSuccess = error;
                              vm.alertDivContent = navService.getDivAlert('danger', 'Failed to delete a Teacher.');
                            });
        }
      }
    }
    function cancelDeleteTeacher() {
      navService.setDefautlOptTitle();
      vm.actionTeacherTitle = navService.getTitleOptionActive();
      resetContentActive();

      vm.accordionArrayTeachers = [];
    }

    /* 
     * Functions Options Selected
     */
    function addOption(type) {
      setDefaultAlertDiv();
      // change options selection
      if (type != 'Edit') {
        setOptionSelected('Add');
        vm.actionTeacherTitle = navService.getTitleOptionActive() + ' a new Teacher';
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
      vm.actionTeacherTitle = navService.getTitleOptionActive() + ' a Teacher';
      vm.contentActive = 'Edit';

      refreshListTeachers();
    }

    function deleteOption() {
      setDefaultAlertDiv();
      // change options selection
      setOptionSelected('Delete');
      // change Title
      vm.actionTeacherTitle = navService.getTitleOptionActive() + ' a Teacher';
      vm.contentActive = 'Delete';

      refreshListTeachers();
    }

    function listOption() {
      setDefaultAlertDiv();
      // change options selection
      setOptionSelected('List');
      // change Title
      vm.actionTeacherTitle = navService.getTitleOptionActive() + ' of all Teachers availables';
      vm.contentActive = 'List';

      refreshListTeachers();
    }

    /*
     *  Local function 
     */
    function initTeacher(action) {
      if (vm.editSelectedTeacher && action == 'Edit') {
        
        // var tea = JSON.parse(vm.editSelectedTeacher);
        var tea = vm.editSelectedTeacher;
        vm.teacher.code = tea.code;
        vm.teacher.name = tea.name;
        vm.teacher.lastname = tea.lastname;
        vm.teacher.email = tea.email;
        vm.teacher.phone = tea.phone;
        vm.teacher.address = tea.address;
        vm.teacher.salary = tea.salary;
      } else {
        vm.teacher = {};
      }
    }

    function setOptionSelected(opt) {
      // change options selection
      navService.setActiveOptCRUD(opt);
      vm.activeMenuTeacher = navService.getActiveOptCRUD();
    }

    function resetContentActive() {
      vm.contentActive = '';
      vm.activeMenuTeacher = navService.getDefaultOptCRUD();
      vm.deleteSelectedTeacher = null;
      vm.editSelectedTeacher = null;
    }

    function setDefaultAlertDiv(){
      vm.alertDivContent = null;
    }

    function refreshListTeachers() {
      teacherFactory.getAllTeachers()
                      .then(function(response) {
                        vm.listTeachers = response.data;
                        vm.alertDivContent = navService.getDivAlert('success', 'Teachers Availables.');
                      },
                      function(error) {
                        vm.alertDivContent = navService.getDivAlert('danger', 'Failed to retrieve Teachers.');
                      });
    }
  }
})();