(function() {
  'use strict';

  angular
    .module('course')
    .factory('coursesAllFactory', CoursesAllFactory);

  CoursesAllFactory.$inject = ['$http'];
  function CoursesAllFactory($http) {

      // Variables
      var courseDeletedSuccess = null;

    var service = {
      // Methods
      getAllCourses : getAllCourses,

      addNewCourse : addNewCourse,
      
      editCourse : editCourse,

      deleteCourse : deleteCourse,
      getVarDeletedCourseSuccess : getVarDeletedCourseSuccess


    };
    
    return service;

    ////////////////
    function getAllCourses() {
      return $http.get('http://localhost:8080/courses');
    }

    function addNewCourse(newCourse) {
      return $http.post('http://localhost:8080/courses', newCourse);
    }

    function editCourse(idCourse, course) {
      return $http.put('http://localhost:8080/courses/' + idCourse, course);
    }

    function deleteCourse(idCourse) {
      return $http.delete('http://localhost:8080/courses/' + idCourse)
                    .then(function (res) {
                      console.log('FactoryResponse', res);
                      courseDeletedSuccess = res.data;
                    },
                    function(error) {
                      console.log('FactoryError: ', error);
                    });
    }

    function getVarDeletedCourseSuccess() {
      return courseDeletedSuccess;
    }
  }
})();