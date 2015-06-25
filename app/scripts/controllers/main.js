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
    var panelData   = { data: [ 15, 25, 35, 45, 55, 65, 75 ] };
    // var panelData   = { data: [ 15, 25, 35, 45 ] };
    var panelHeight = function() {
                        return 10 + 2*Math.max.apply(null, panelData.data);
                      };
    var panelWidth = function() {
                        var mxw = Math.max.apply(null,panelData.data);
                        return (mxw) + 2*mxw*panelData.data.length;
                      };

    var renderPanel = function(d3,svg,data,element,attrs) {
      var height = panelHeight();
      var newWidth = panelWidth();
      if( newWidth > attrs.width) {
        svg.style('width',newWidth);
      }

      svg.style('height',height)
         .style('background-color', 'lightcyan');

      var root = svg.append('g');

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

      root.append('text')
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

