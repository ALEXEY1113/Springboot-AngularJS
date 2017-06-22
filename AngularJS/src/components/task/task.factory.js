(function() {
  'use strict';

  angular
    .module('course')
    .factory('taskFactory', TaskFactory);

  TaskFactory.$inject = ['$http'];
  function TaskFactory($http) {

    // Variables
    var taskDeletedMessage = null;

    var service = {
      // Methods
      getAllTasks : getAllTasks,

      addNewTask : addNewTask,
      
      editTask : editTask,

      deleteTask : deleteTask,
      getVarDeletedTaskSuccess : getVarDeletedTaskSuccess


    };
    
    return service;

    ////////////////
    function getAllTasks() {
      return $http.get('http://localhost:8080/tasks');
    }

    function addNewTask(newTask) {
      return $http.post('http://localhost:8080/tasks', newTask);
    }

    function editTask(idTask, task) {
      return $http.put('http://localhost:8080/tasks/' + idTask, task);
    }

    function deleteTask(idTask) {
      return $http.delete('http://localhost:8080/tasks/' + idTask)
                    .then(function (res) {
                      console.log('FactoryResponse', res);
                      taskDeletedMessage = res.data;
                    },
                    function(error) {
                      console.log('FactoryError: ', error);
                    });
    }

    function getVarDeletedTaskSuccess() {
      return taskDeletedMessage;
    }
  }
})();