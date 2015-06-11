
'use strict';

/**
 * @ngdoc overview
 * @name angularBzD3PanelApp
 * @description
 * # angularBzD3PanelApp
 *
 * Main module of the application.
 */
angular
  .module('angularBzD3PanelApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'bzD3Module'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
