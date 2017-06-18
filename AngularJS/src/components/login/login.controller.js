(function() {
  'use strict';

  angular
    .module('course')
    .controller('loginController', LoginController);

  // $location => funcion propia de angular para redireccionar
  LoginController.$inject = ['$location', 'loginFactory'];
  
  function LoginController($location, loginFactory) {
    var vm = this;

    // Variables que se podrán mostrar en la vista
    vm.email = '';
    vm.password = '';
    vm.displayMessage = false;

    vm.areEmptyFields = function() {
      if (!vm.email || !vm.password) {
        vm.displayMessage = true;
        console.log('One field is empty : dm=' + vm.displayMessage);
        return true;
      } else {
        console.log('Credentials: ', vm.email, vm.password);
        loginFactory.loginUser(vm.email, vm.password, function(response) {
          console.log('1erResponse: ', response);
          if (response.success) {
            console.log('2doResponse: ', response);
            // LoginFactory.setCredentials(vm.email.password);
            $location.path('/admin-control');
            return false;
          } else {
            vm.displayMessage = true;
            return true;
          }
        });
      }
    };
  }
})();