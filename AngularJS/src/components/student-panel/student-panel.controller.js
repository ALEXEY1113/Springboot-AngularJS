(function() {
  'use strict';

  angular
    .module('course')
    .controller('studentController', StudentController);

  StudentController.$inject = ['studentFactory', 'navService'];
  function StudentController(studentFactory, navService) {
    var vm = this;

    vm.$onInit = function() {
      initStudent(null);
      
      vm.listStudents = null;
      
      vm.btnEditStudentPressed = false;
      vm.activeMenuStudent = navService.getDefaultOptCRUD();
      navService.setDefautlOptTitle();
      vm.actionStudentTitle = navService.getTitleOptionActive();
      navService.setDefautlOptTitle();
      resetContentActive();

      // Charge List students
      refreshListStudent();
    };

    // Options panel left-hand side
    vm.addOption = addOption;
    vm.editOption = editOption;
    vm.deleteOption = deleteOption;
    vm.listOption = listOption;

    // Buttons Forms
    vm.createNewStudent = createNewStudent;
    vm.cancelAddStudent = cancelAddStudent;
    vm.confirmEditStudent = confirmEditStudent;
    vm.cancelEditStudent = cancelEditStudent;
    vm.confirmDeleteStudent = confirmDeleteStudent;
    vm.cancelDeleteStudent = cancelDeleteStudent;

    // Div Alert student
    navService.setDefaultDivAlert();
    vm.alertDivContent = [];

    /* 
     * Functions Buttons
     */
    function createNewStudent(student) {
      vm.student = student;
      
      var idStudent = null;
      if (vm.editSelectedStudent) {
        var est = JSON.parse(vm.editSelectedStudent);
        idStudent = est.id;
      }

      if (vm.editSelectedStudent && vm.btnEditStudentPressed) {
        // It's an Edition
        // console.log('Edit student', vm.btnEditStudentPressed);
        
        studentFactory.editStudent(idStudent, vm.student)
                        .then(function (response) {
                          // Success
                          // console.log('Response After Edit', response);
                           vm.alertDivContent = navService.getDivAlert('success', 'Student was edited successfully.');
                         },
                         function (error) {
                           // Error
                           vm.alertDivContent = navService.getDivAlert('danger', 'Student was not edited.');
                         });
      } else {
        // It's a New student
        // console.log('New student', vm.student);

        studentFactory.addNewStudent(student)
                         .then(function (data) {
                           // Success
                           vm.alertDivContent = navService.getDivAlert('success', 'Student was created successfully.');
                         },
                         function (error) {
                           // Error
                           vm.alertDivContent = navService.getDivAlert('danger', 'Student was not created.');
                         });
      }

      initStudent(null);
      vm.btnEditStudentPressed = false;
      vm.editSelectedStudent = null;
    }
    function cancelAddStudent() {
      navService.setDefautlOptTitle();
      vm.actionStudentTitle = navService.getTitleOptionActive();
      resetContentActive();
      
      initStudent(null);
      vm.editSelectedStudent = null;
    }

    function confirmEditStudent() {
      // console.log('EditSelectedStudent: ', vm.editSelectedStudent);
      if (vm.editSelectedStudent) {
        vm.btnEditStudentPressed = true;

        var est = JSON.parse(vm.editSelectedStudent);
        vm.student.code = est.code;
        vm.student.name = est.name;
        vm.student.lastname = est.lastname;
        vm.student.email = est.email;
        vm.student.phone = est.phone;
        vm.student.address = est.address;

        initStudent('Edit');
        addOption('Edit');
      }
    }
    function cancelEditStudent() {
      navService.setDefautlOptTitle();
      vm.actionStudentTitle = navService.getTitleOptionActive();
      resetContentActive();

      initStudent(null);
      vm.editSelectedStudent = null;
    }

    function confirmDeleteStudent() {
      // Verify if deleteSelectedstudent exist
      if (vm.deleteSelectedStudent !== null) {
        var deletedStudent = JSON.parse(vm.deleteSelectedStudent);

        if (confirm('Are you sure to delete -->> ' + deletedStudent.name + ' <<-- Student?')) {

          var idStudent = deletedStudent.id;
          vm.deletedStudentSuccess = null;
          // Trying to Delete student
          studentFactory.deleteStudent(idStudent)
                            .then(function (response) {
                              
                              vm.alertDivContent = navService.getDivAlert('success', 'Student was Deleted.');
                              vm.deletedStudentSuccess = studentFactory.getVarDeletedStudentSuccess();
                              refreshListStudent();

                              if (vm.deletedStudentSuccess) {
                                alert('Student was Deleted.');
                              } else {
                                alert('Failed to delete a Student because has some dependencies.');
                              }
                            },
                            function(error) {
                              vm.deletedStudentSuccess = error;
                              vm.alertDivContent = navService.getDivAlert('danger', 'Failed to delete a Student.');
                            });
        }
      }
    }
    function cancelDeleteStudent() {
      navService.setDefautlOptTitle();
      vm.actionStudentTitle = navService.getTitleOptionActive();
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
        vm.actionStudentTitle = navService.getTitleOptionActive() + ' a new Student';
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
      vm.actionStudentTitle = navService.getTitleOptionActive() + ' a Student';
      vm.contentActive = 'Edit';

      refreshListStudent();
    }

    function deleteOption() {
      setDefaultAlertDiv();
      // change options selection
      setOptionSelected('Delete');
      // change Title
      vm.actionStudentTitle = navService.getTitleOptionActive() + ' a Student';
      vm.contentActive = 'Delete';

      refreshListStudent();
    }

    function listOption() {
      setDefaultAlertDiv();
      // change options selection
      setOptionSelected('List');
      // change Title
      vm.actionStudentTitle = navService.getTitleOptionActive() + ' of all Student availables';
      vm.contentActive = 'List';

      refreshListStudent();
    }

    /*
     *  Local function 
     */
    function initStudent(action) {
      if (vm.editSelectedStudent && action == 'Edit') {
        
        var est = JSON.parse(vm.editSelectedStudent);
        vm.student.code = est.code;
        vm.student.name = est.name;
        vm.student.lastname = est.lastname;
        vm.student.email = est.email;
        vm.student.phone = est.phone;
        vm.student.address = est.address;
      } else {
        vm.student = {};
      }
    }

    function setOptionSelected(opt) {
      // change options selection
      navService.setActiveOptCRUD(opt);
      vm.activeMenuStudent = navService.getActiveOptCRUD();
    }

    function resetContentActive() {
      vm.contentActive = '';
      vm.activeMenuStudent = navService.getDefaultOptCRUD();
      vm.deleteSelectedStudent = null;
      vm.editSelectedStudent = null;
    }

    function setDefaultAlertDiv(){
      vm.alertDivContent = null;
    }

    function refreshListStudent() {
      studentFactory.getAllStudents()
                      .then(function(response) {
                        vm.listStudents = response.data;
                        vm.alertDivContent = navService.getDivAlert('success', 'Students Availables.');
                      },
                      function(error) {
                        vm.alertDivContent = navService.getDivAlert('danger', 'Failed to retrieve Students.');
                      });
    }
  }
})();