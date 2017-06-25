(function() {
  'use strict';

  angular
    .module('course')
    .factory('subStudentFactory', SubStudentFactory);

  SubStudentFactory.$inject = ['$http'];
  function SubStudentFactory($http) {
    var service = {

      getAllClassRoom : getAllClassRoom,

      getAllStudents : getAllStudents,
      getSubsStudentFromStudentId : getSubsStudentFromStudentId,

      getAllCourses : getAllCourses,

      getAllSubStudent : getAllSubStudent,

      saveSubsStudentCourses : saveSubsStudentCourses
    };
    
    return service;

    ////////////////
    function getAllStudents() {
      return $http.get('http://localhost:8080/students');
    }
    function getSubsStudentFromStudentId(studentId) {
      return $http.get('http://localhost:8080/subs-students/' + studentId);
    }

    function getAllCourses() {
      return $http.get('http://localhost:8080/courses');
    }

    function getAllClassRoom() {
      return $http.get('http://localhost:8080/classrooms');
    }

    function getAllSubStudent() {
      return $http.get('http://localhost:8080/subs-students');
    }

    function saveSubsStudentCourses(subscriptionStudent) {
      // console.log('Data SubStudent', subscriptionStudent);
      return $http.post('http://localhost:8080/subs-students', subscriptionStudent);
    }
  }
})();