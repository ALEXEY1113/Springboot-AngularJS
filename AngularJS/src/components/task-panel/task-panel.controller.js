(function() {
  'use strict';

  angular
    .module('course')
    .controller('taskController', TaskController);

  TaskController.$inject = ['taskFactory', 'navService'];
  function TaskController(taskFactory, navService) {
    var vm = this;

    vm.$onInit = function() {
      initTask(null);
      
      vm.listTasks = null;
      
      vm.btnEditTaskPressed = false;
      vm.activeMenuTask = navService.getDefaultOptCRUD();
      navService.setDefautlOptTitle();
      vm.actionTaskTitle = navService.getTitleOptionActive();
      navService.setDefautlOptTitle();
      resetContentActive();

      // Charge List Tasks
      refreshListTasks();
    };

    // Options panel left-hand side
    vm.addOption = addOption;
    vm.editOption = editOption;
    vm.deleteOption = deleteOption;
    vm.listOption = listOption;

    // Buttons Forms
    vm.createNewTask = createNewTask;
    vm.cancelAddTask = cancelAddTask;
    vm.confirmEditTask = confirmEditTask;
    vm.cancelEditTask = cancelEditTask;
    vm.confirmDeleteTask = confirmDeleteTask;
    vm.cancelDeleteTask = cancelDeleteTask;

    // Div Alert Task
    navService.setDefaultDivAlert();
    vm.alertDivContent = [];

    /* 
     * Functions Buttons
     */
    function createNewTask(task) {
      vm.task = task;
      
      console.log('Task is: ', vm.task);

      var idTask = null;
      if (vm.editSelectedTask) {
        var est = JSON.parse(vm.editSelectedTask);
        idTask = est.id;
      }

      if (vm.editSelectedTask && vm.btnEditTaskPressed) {
        // It's an Edition
        // console.log('Edit Task', vm.btnEditTaskPressed);
        
        taskFactory.editTask(idTask, vm.task)
                        .then(function (response) {
                          // Success
                          // console.log('Response After Edit', response);
                           vm.alertDivContent = navService.getDivAlert('success', 'Task was edited successfully.');
                         },
                         function (error) {
                           // Error
                           vm.alertDivContent = navService.getDivAlert('danger', 'Task was not edited.');
                         });
      } else {
        // It's a New Task
        // console.log('New Task', vm.task);

        taskFactory.addNewTask(task)
                         .then(function (data) {
                           // Success
                           vm.alertDivContent = navService.getDivAlert('success', 'Task was created successfully.');
                         },
                         function (error) {
                           // Error
                           vm.alertDivContent = navService.getDivAlert('danger', 'Task was not created.');
                         });
      }

      initTask(null);
      vm.btnEditTaskPressed = false;
      vm.editSelectedTask = null;
    }
    function cancelAddTask() {
      navService.setDefautlOptTitle();
      vm.actionTaskTitle = navService.getTitleOptionActive();
      resetContentActive();
      
      initTask(null);
      vm.editSelectedTask = null;
    }

    function confirmEditTask() {
      // console.log('EditSelectedTask: ', vm.editSelectedTask);
      if (vm.editSelectedTask) {
        vm.btnEditTaskPressed = true;

        var est = JSON.parse(vm.editSelectedTask);
        vm.task.name = est.name;
        vm.task.state = est.state;
        vm.task.description = est.description;

        initTask('Edit');
        addOption('Edit');
      }
    }
    function cancelEditTask() {
      navService.setDefautlOptTitle();
      vm.actionTaskTitle = navService.getTitleOptionActive();
      resetContentActive();

      initTask(null);
      vm.editSelectedTask = null;
    }

    function confirmDeleteTask() {
      // Verify if deleteSelectedTask exist
      if (vm.deleteSelectedTask !== null) {
        var deletedTask = JSON.parse(vm.deleteSelectedTask);

        if (confirm('Are you sure to delete -->> ' + deletedTask.name + ' <<-- Task?')) {

          var idTask = deletedTask.id;
          vm.deletedTaskSuccess = null;
          // Trying to Delete Task
          taskFactory.deleteTask(idTask)
                            .then(function (response) {
                              
                              vm.alertDivContent = navService.getDivAlert('success', 'Task was Deleted.');
                              vm.deletedTaskSuccess = taskFactory.getVarDeletedTaskSuccess();
                              refreshListTasks();

                              if (vm.deletedTaskSuccess) {
                                alert('Task was Deleted.');
                              } else {
                                alert('Failed to delete a Task because has some dependencies.');
                              }
                            },
                            function(error) {
                              vm.deletedTaskSuccess = error;
                              vm.alertDivContent = navService.getDivAlert('danger', 'Failed to delete a Task.');
                            });
        }
      }
    }
    function cancelDeleteTask() {
      navService.setDefautlOptTitle();
      vm.actionTaskTitle = navService.getTitleOptionActive();
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
        vm.actionTaskTitle = navService.getTitleOptionActive() + ' a new Task';
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
      vm.actionTaskTitle = navService.getTitleOptionActive() + ' a Task';
      vm.contentActive = 'Edit';

      refreshListTasks();
    }

    function deleteOption() {
      setDefaultAlertDiv();
      // change options selection
      setOptionSelected('Delete');
      // change Title
      vm.actionTaskTitle = navService.getTitleOptionActive() + ' a Task';
      vm.contentActive = 'Delete';

      refreshListTasks();
    }

    function listOption() {
      setDefaultAlertDiv();
      // change options selection
      setOptionSelected('List');
      // change Title
      vm.actionTaskTitle = navService.getTitleOptionActive() + ' of all Tasks availables';
      vm.contentActive = 'List';

      refreshListTasks();
    }

    /*
     *  Local function 
     */
    function initTask(action) {
      if (vm.editSelectedTask && action == 'Edit') {
        
        var t = JSON.parse(vm.editSelectedTask);
        vm.task.name = t.name;
        vm.task.state = t.state;
        vm.task.description = t.description;
      } else {
        vm.task = {};
      }
    }

    function setOptionSelected(opt) {
      // change options selection
      navService.setActiveOptCRUD(opt);
      vm.activeMenuTask = navService.getActiveOptCRUD();
    }

    function resetContentActive() {
      vm.contentActive = '';
      vm.activeMenuTask = navService.getDefaultOptCRUD();
      vm.deleteSelectedTask = null;
      vm.editSelectedTask = null;
    }

    function setDefaultAlertDiv(){
      vm.alertDivContent = null;
    }

    function refreshListTasks() {
      taskFactory.getAllTasks()
                      .then(function(response) {
                        vm.listTasks = response.data;
                        vm.alertDivContent = navService.getDivAlert('success', 'Tasks Availables.');
                      },
                      function(error) {
                        vm.alertDivContent = navService.getDivAlert('danger', 'Failed to retrieve Tasks.');
                      });
    }
  }
})();