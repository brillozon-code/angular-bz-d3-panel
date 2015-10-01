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
                        return  0 + 2*Math.max.apply(null, panelData.data);
                      };
    var panelWidth = function() {
                        var mxw = Math.max.apply(null,panelData.data);
                        return (mxw) + 2*mxw*panelData.data.length;
                      };
    var panelXScale;
    var panelYScale;
    var root;

    var renderPanel = function(d3,svg,data,element,attrs) {
      panelXScale = d3.scale.linear().domain([0,panelWidth() ]).range([0,attrs.width ]);
      panelYScale = d3.scale.linear().domain([0,panelHeight()]).range([0,attrs.height]);

      svg.style('width',attrs.width)
         .style('height',attrs.height)
         .style('background-color', 'lightcyan');

      root = svg.append('g');
    };

    var redrawPanel = function(d3,svg,data,element,attrs) {
      svg.style('width',attrs.width)
         .style('height',attrs.height);

      var maxdata   = Math.max.apply(null,panelData.data);
      var maxradius = Math.min(panelXScale(maxdata),panelYScale(maxdata));

      var circles = svg.selectAll('circle')
                       .data(data)
                       .enter();
      circles.append('circle')
             .style('fill', 'green')
             .style('stroke', 'blue')
             .style('stroke-width', '2')
             .attr('cx', function(d,i) {return panelXScale(4*maxradius*i + 2*d);})
             .attr('cy', function()    {return panelYScale(2*maxradius);})
             .attr('r',  function(d)   {return Math.min(panelXScale(d),panelYScale(d));});

      root.append('text')
         .text('Should be: ' + attrs.height)
         .attr('x',20)
         .attr('y',20);
    };

    $scope.awesomeThings = awesomeThings;
    $scope.novalue       = novalue;
    $scope.panelData     = panelData;
    $scope.panelHeight   = panelHeight;
    $scope.renderPanel   = renderPanel;
    $scope.redrawPanel   = redrawPanel;

    var counter = 0;
    $scope.counter = counter;
  }

})(); // End of IIFE

