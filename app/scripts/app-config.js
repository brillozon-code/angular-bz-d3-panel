(function() { // IIFE to avoid exposure in global scope.

  'use strict';

  /**
   * @ngdoc overview
   * @name bzD3App
   * @description
   * # bzD3App
   *
   * Main module of the application.
   */
  angular
    .module('bzD3App')
    .config( bzD3AppConfiguration);

  bzD3AppConfiguration.$inject = ['$routeProvider'];

  function bzD3AppConfiguration($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'bzD3AppController'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutController'
      })
      .otherwise({
        redirectTo: '/'
      });
  }

})(); // End of IIFE

