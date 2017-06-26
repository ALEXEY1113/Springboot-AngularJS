(function() {
  'use strict';

  angular
    .module('course')
    .factory('subTaskFactory', SubTaskFactory);

  SubTaskFactory.$inject = ['$http'];
  function SubTaskFactory($http) {
    var service = {

      getAllStudents : getAllStudents,

      getAllTasks : getAllTasks,
      getSubsTaskFromTaskId : getSubsTaskFromTaskId,

      getAllCourses : getAllCourses,

      getAllSubTask : getAllSubTask,

      saveSubsTaskCourses : saveSubsTaskCourses
    };
    
    return service;

    ////////////////
    function getAllStudents() {
      return $http.get('http://localhost:8080/students');
    }

    function getAllCourses() {
      return $http.get('http://localhost:8080/courses');
    }

    function getAllTasks() {
      return $http.get('http://localhost:8080/tasks');
    }

    function getSubsTaskFromTaskId(taskId) {
      return $http.get('http://localhost:8080/subs-tasks/' + taskId);
    }

    function getAllSubTask() {
      return $http.get('http://localhost:8080/subs-tasks');
    }

    function saveSubsTaskCourses(subscriptionTask) {
      // console.log('Data SubTask', subscriptionTask);
      return $http.post('http://localhost:8080/subs-tasks', subscriptionTask);
    }
  }
})();