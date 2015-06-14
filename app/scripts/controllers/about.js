(function() { // IIFE to avoid exposure in global scope.

  'use strict';

  /**
   * @ngdoc function
   * @name bzD3App.controller:AboutCtrl
   * @description
   * # AboutCtrl
   * Controller of the bzD3App
   */
  angular
    .module('bzD3App')
    .controller('AboutController', AboutController);

  AboutController.$inject = ['$scope'];

  function AboutController($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  }

})(); // End of IIFE

