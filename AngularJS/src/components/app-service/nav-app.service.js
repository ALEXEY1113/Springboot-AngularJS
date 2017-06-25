(function() {
  'use strict';

  angular
    .module('course')
    .service('navService', NavService);

  NavService.$inject = [];
  function NavService() {
    // Navbar
    this.setActive = setActive;
    this.getActiveMenu = getActiveMenu;
    // Options Genreal CRUD
    this.getDefaultOptCRUD = getDefaultOptCRUD;
    this.setActiveOptCRUD = setActiveOptCRUD;
    this.getActiveOptCRUD = getActiveOptCRUD;
    // Options Navbar Admin
    this.getAdminActiveNav = getAdminActiveNav;
    this.setAdminActiveDefaultNav = setAdminActiveDefaultNav;
    this.setAdminActiveNav = setAdminActiveNav;
    // Titles for Options
    this.setDefautlOptTitle = setDefautlOptTitle;
    this.getTitleOptionActive = getTitleOptionActive;
    // Div Alerts
    this.getDivAlert = getDivAlert;
    this.setDefaultDivAlert = setDefaultDivAlert;

    ////////////////

    // Variables Navbar
    var navItemsMenu = ['Home', 'Courses', 'Teachers', 'Students', 'Tasks'];
    var activeMenu = navItemsMenu[0];
    // Variables Options General
    var optionsCRUD = ['', 'Add', 'Edit', 'Delete', 'List'];
    var optionsActive = optionsCRUD[0];
    var titleOptionActive = 'Choose an Option in the panel left-hand side';
    // Variables for Admin
    var optionsAdminNav = ['Overview', 'SubStudent', 'SubTeacher', 'SubTask'];
    var optAdminActive = optionsAdminNav[0];
    // Varialbes Div Alert
    var alertClassDiv = 'success';
    var alertMessageDiv = 'Some message';

    // Functions for Main Navbar
    function getActiveMenu(){ return activeMenu; }
    function setActive(itemMenu) {
      for (var i = 0; i < navItemsMenu.length; i++) {
        if (navItemsMenu[i] === itemMenu){
          activeMenu = navItemsMenu[i];
          break;
        }
      }
    }

    // Functions for Admin Operations
    function getAdminActiveNav() { return optAdminActive; }
    function setAdminActiveDefaultNav() { optAdminActive = optionsAdminNav[0]; }
    function setAdminActiveNav(opt) { optAdminActive = opt; }
    
    // Functions for General CRUD Operations
    function getActiveOptCRUD() { return optionsActive; }
    function getDefaultOptCRUD() { return optionsCRUD[0]; }
    function setActiveOptCRUD(optionName) {

      switch (optionName ) {
        case 'Add' :
              optionsActive = optionsCRUD[1];
              titleOptionActive = 'Add';
              break;
        case 'Edit' :
              optionsActive = optionsCRUD[2];
              titleOptionActive = 'Edit';
              break;
        case 'Delete' :
              optionsActive = optionsCRUD[3];
              titleOptionActive = 'Delete';
              break;
        case 'List' :
              optionsActive = optionsCRUD[4];
              titleOptionActive = 'List';
              break;
        default:
              optionsActive = optionsCRUD[0];
              titleOptionActive = '';
      }
    }
    // Title Options
    function getTitleOptionActive() { return titleOptionActive; }
    function setDefautlOptTitle() { titleOptionActive = 'Choose an Option in the panel left-hand side'; }

    // Div Alerts
    function getDivAlert(type, message) {
      alertClassDiv = type;
      alertMessageDiv = message;

      return {type: alertClassDiv, msg: alertMessageDiv};
    }
    function setDefaultDivAlert() {
      alertClassDiv = 'success';
      alertMessageDiv = '';
    }
  }
})();