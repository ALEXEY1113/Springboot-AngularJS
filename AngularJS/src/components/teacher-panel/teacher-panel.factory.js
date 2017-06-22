(function() {
  'use strict';

  angular
    .module('course')
    .factory('teacherFactory', TeacherFactory);

  TeacherFactory.$inject = ['$http'];
  function TeacherFactory($http) {

    // Variables
    var teacherDeletedMessage = null;

    var service = {
      // Methods
      getAllTeachers : getAllTeachers,

      addNewTeacher : addNewTeacher,
      
      editTeacher : editTeacher,

      deleteTeacher : deleteTeacher,
      getVarDeletedTeacherSuccess : getVarDeletedTeacherSuccess


    };
    
    return service;

    ////////////////
    function getAllTeachers() {
      return $http.get('http://localhost:8080/teachers');
    }

    function addNewTeacher(newTeacher) {
      return $http.post('http://localhost:8080/teachers', newTeacher);
    }

    function editTeacher(idTeacher, teacher) {
      return $http.put('http://localhost:8080/teachers/' + idTeacher, teacher);
    }

    function deleteTeacher(idTeacher) {
      return $http.delete('http://localhost:8080/teachers/' + idTeacher)
                    .then(function (res) {
                      console.log('FactoryResponse', res);
                      teacherDeletedMessage = res.data;
                    },
                    function(error) {
                      console.log('FactoryError: ', error);
                    });
    }

    function getVarDeletedTeacherSuccess() {
      return teacherDeletedMessage;
    }
  }
})();