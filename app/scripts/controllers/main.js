(function() { // IIFE to avoid exposure in global scope.

  'use strict';

  /**
   * @ngdoc function
   * @name bzD3App.controller:MainCtrl
   * @description
   * # MainCtrl
   * Controller of the bzD3App
   */
  angular
    .module('bzD3App')
    .controller('bzD3AppController', bzD3AppController);

  bzD3AppController.$inject = ['$scope'];

  function bzD3AppController($scope) {
    var awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma',
      'BzD3'
    ];
    var novalue     = {data: [1] };
    var panelHeight = function() {
                        return 10 + 2*Math.max.apply(null, panelData.data);
                      };
    var panelData   = { data: [ 15, 25, 35, 45 ] };

    var renderPanel = function(d3,svg,data) {
      var height = $scope.panelHeight();

      svg.style('height',height)
         .style('background-color', 'ivory');

      var circles = svg.selectAll('circle')
                       .data(data)
                       .enter();
      circles.append('circle')
             .style('fill', 'green')
             .style('stroke', 'blue')
             .style('stroke-width', '2')
             .attr('cx',function(d,i) {return height*i + d;})
             .attr('cy',function() {return height/2;})
             .attr('r',function(d) {return d;});
      circles.append('text')
             .text('Should be: ' + height)
             .attr('x',20)
             .attr('y',20);
    };

    $scope.awesomeThings = awesomeThings;
    $scope.novalue       = novalue;
    $scope.panelData     = panelData;
    $scope.panelHeight   = panelHeight;
    $scope.renderPanel   = renderPanel;
  }

})(); // End of IIFE

