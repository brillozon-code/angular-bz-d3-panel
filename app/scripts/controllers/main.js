'use strict';

/**
 * @ngdoc function
 * @name angularBzD3PanelApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularBzD3PanelApp
 */
angular.module('angularBzD3PanelApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.novalue     = {data: [1] };
    $scope.panelData   = { data: [ 15, 25, 35, 45 ] };
    $scope.panelHeight = function() {
      return 10 + 2*Math.max.apply(null,$scope.panelData.data);
    }
    $scope.renderPanel = function(d3,svg,data) {
      var height = $scope.panelHeight();
      svg.style('height',height);
      var circles = svg.selectAll("circle")
                       .data(data)
                       .enter();
      circles.append("circle")
             .style("fill", "green")
             .style("stroke", "blue")
             .style("stroke-width", "2")
             .attr("cx",function(d,i) {return height*i + d;})
             .attr("cy",function(d) {return height/2;})
             .attr("r",function(d) {return d;});
      circles.append("text")
             .text('Should be: ' + height)
             .attr("x",20)
             .attr("y",20)
    }
  });

