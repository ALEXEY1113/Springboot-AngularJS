(function() {
  'use strict';

  angular
    .module('course')
    .factory('subTeacherFactory', SubTeacherFactory);

  SubTeacherFactory.$inject = ['$http'];
  function SubTeacherFactory($http) {
    var service = {

      getAllClassRoom : getAllClassRoom,

      getAllTeachers : getAllTeachers,
      getSubsTeacherFromTeacherId : getSubsTeacherFromTeacherId,

      getAllCourses : getAllCourses,

      getAllSubTeacher : getAllSubTeacher,

      saveSubsTeacherCourses : saveSubsTeacherCourses
    };
    
    return service;

    ////////////////
    function getAllTeachers() {
      return $http.get('http://localhost:8080/teachers');
    }
    function getSubsTeacherFromTeacherId(teacherId) {
      return $http.get('http://localhost:8080/subs-teachers/' + teacherId);
    }

    function getAllCourses() {
      return $http.get('http://localhost:8080/courses');
    }

    function getAllClassRoom() {
      return $http.get('http://localhost:8080/classrooms');
    }

    function getAllSubTeacher() {
      return $http.get('http://localhost:8080/subs-teachers');
    }

    function saveSubsTeacherCourses(subscriptionTeacher) {
      console.log('Data SubTeacher', subscriptionTeacher);
      // return $http.post('http://localhost:8080/subs-teachers', subscriptionTeacher);
    }
  }
})();