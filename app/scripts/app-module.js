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
  .module('bzD3App', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'bzD3'
  ]);

})(); // End of IIFE

