/**
 * Copyright (c) 2014, 2016, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your application specific code will go here
 */
define(['ojs/ojcore', 'knockout', 'ojs/ojrouter', 'ojs/ojarraytabledatasource',
  'ojs/ojoffcanvas'],
  function(oj, ko) {
    function ControllerViewModel() {
      var self = this;
      
      //apply locale to menuNames
      var menuDashboard = 
               oj.Translations.getTranslatedString("menu.dashboard");
       var menuLectures = 
               oj.Translations.getTranslatedString("menu.lectures");
       var menuSignup = 
               oj.Translations.getTranslatedString("menu.signup");
       var menuProfile = 
               oj.Translations.getTranslatedString("menu.profile");

      // Router setup
      self.router = oj.Router.rootInstance;
      self.router.configure({
       'dashboard': {label: menuDashboard, isDefault: true},
       'lectures': {label:  menuLectures},
       'signup': {label: menuSignup},
       'profile': {label:  menuProfile}
      });
      oj.Router.defaults['urlAdapter'] = new oj.Router.urlParamAdapter();

      // Navigation setup
      var navData = [
      {name: menuDashboard, id: 'dashboard',
        iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-chart-icon-24'},
      {name: menuLectures, id: 'lectures',
        iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-fire-icon-24'},
      {name: menuSignup, id: 'signup',
        iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-people-icon-24'},
      {name: menuProfile, id: 'profile',
        iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-person-icon-24'}
      
      ];
      self.navDataSource = new oj.ArrayTableDataSource(navData, {idAttribute: 'id'});
      self.navChangeHandler = function (event, data) {
        if (data.option === 'selection' && data.value !== self.router.stateId()) {
          self.toggleDrawer();
        }
      }

      // Drawer setup
      self.toggleDrawer = function() {
        return oj.OffcanvasUtils.toggle({selector: '#navDrawer', modality: 'modal', content: '#pageContent'});
      }

      // Method for adjusting the content area top/bottom paddings to avoid overlap with any fixed regions. 
      // This method should be called whenever your fixed region height may change.  The application
      // can also adjust content paddings with css classes if the fixed region height is not changing between 
      // views.
      self.adjustContentPadding = function () {
        var topElem = document.getElementsByClassName('oj-applayout-fixed-top')[0];
        var contentElem = document.getElementsByClassName('oj-applayout-content')[0];
        var bottomElem = document.getElementsByClassName('oj-applayout-fixed-bottom')[0];

        if (topElem) {
          contentElem.style.paddingTop = topElem.offsetHeight+'px';
        }
        if (bottomElem) {
          contentElem.style.paddingBottom = bottomElem.clientHeight+'px';
        }
        // Add oj-complete marker class to signal that the content area can be unhidden.
        // See the override.css file to see when the content area is hidden.
        contentElem.classList.add('oj-complete');
      }
    }

    return new ControllerViewModel();
  }
);
