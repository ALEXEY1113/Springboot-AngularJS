(function() {
  'use strict';

  angular
    .module('course')
    .factory('studentFactory', StudentFactory);

  StudentFactory.$inject = ['$http'];
  function StudentFactory($http) {

    // Variables
    var studentDeletedSuccess = null;

    var service = {
      // Methods
      getAllStudents : getAllStudents,

      addNewStudent : addNewStudent,
      
      editStudent : editStudent,

      deleteStudent : deleteStudent,
      getVarDeletedStudentSuccess : getVarDeletedStudentSuccess


    };
    
    return service;

    ////////////////
    function getAllStudents() {
      return $http.get('http://localhost:8080/students');
    }

    function addNewStudent(newStudent) {
      return $http.post('http://localhost:8080/students', newStudent);
    }

    function editStudent(idStudent, student) {
      return $http.put('http://localhost:8080/students/' + idStudent, student);
    }

    function deleteStudent(idStudent) {
      return $http.delete('http://localhost:8080/students/' + idStudent)
                    .then(function (res) {
                      console.log('FactoryResponse', res);
                      studentDeletedSuccess = res.data;
                    },
                    function(error) {
                      console.log('FactoryError: ', error);
                    });
    }

    function getVarDeletedStudentSuccess() {
      return studentDeletedSuccess;
    }
  }
})();