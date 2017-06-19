(function() {
  'use strict';

  angular
    .module('course')
    .factory('coursesAllFactory', CoursesAllFactory);

  CoursesAllFactory.$inject = ['$http'];
  function CoursesAllFactory($http) {
    var service = {
      // Methods
      getAllCourses : getAllCourses,
      addNewCourse : addNewCourse,
      deleteCourse : deleteCourse
    };
    
    return service;

    ////////////////
    function getAllCourses() {
      return $http.get('http://localhost:8080/courses');
    }

    function addNewCourse(newCourse) {
      return $http.post('http://localhost:8080/courses', newCourse);
    }

    function deleteCourse(idCourse) {
      return $http.delete('http://localhost:8080/courses/' + idCourse)
                    .then(function (res) {
                      console.log('RESPONSE: ', res);
                    },
                    function(error) {
                      console.log('RESPONSE ERR: ', error);
                    });
    }
  }
})();