(function() { // IIFE to avoid exposure in global scope.

  'use strict'

  angular
    .module("bzD3")
    .directive('bzD3Panel', bzD3Panel);

  bzD3Panel.$inject = ['d3Service', '$window'];

  function bzD3Panel(bzD3, $window) {
    return {
      restrict: 'EA',
      template: '<div ng-transclude></div>',
      transclude: true,

      scope: {
        content: '=', // Isolated bidirectional binding.
        draw:    '='  // Drawing function from user.
      },

      link: function(scope,element,attrs) {
        bzD3.d3().then(function(d3) {
          var margin  = parseInt(attrs.margin)  || 20;
          var padding = parseInt(attrs.padding) || 5;

          var height;
          if(attrs.height) {
            height  = parseInt(attrs.height);
          } else {
            height = $(element).parent().height();
            attrs.height = height;
          }

          var width;
          if(attrs.width) {
            width = parseInt(attrs.width);
          } else {
            width = $(element).parent().width();
            attrs.width = width;
          }

          var svg = d3.select(element[0])
                      .insert('svg',':first-child')
                      .style('height', height)
                      .style('width', width);

          $window.onresize = function() {
            scope.$apply;
          };

          // Redraw when the size changes.
          scope.$watch(function() {
            return element[0].firstElementChild.clientWidth;
            // return angular.element($window)[0].innerWidth;
          }, function() {
            if(scope.content) {
              scope.render(scope.content);
            }
          });

          // Redraw when the data changes.
          scope.$watchCollection('content', function(newVals,oldVals) {
            if(scope.content) {
              return scope.render(scope.content);
            }
          }, true);

          scope.defaultDraw = function(d3, svg, data, element, attrs) {
            svg.style('stroke-width', '0px')
               .style('background-color', '#bf8ea6');

            var g = svg.selectAll("g")
                       .data(data).enter().append("g");
            g.append("circle")
             .style("fill", "red")
             .style("stroke", "black")
             .style("stroke-width", "2")
             .attr("cx",width/2)
             .attr("cy",height/2)
             .attr("r",40);
            g.append("text")
             .attr("x",(width/2)-30)
             .attr("y",(height/2) - 10)
             .text("LOL WUT");
          }

          // Rendering function.  The fun happens here.  :)
          scope.render = function(data) {
            if(!scope.draw) {
              var novalue = [0];
              scope.defaultDraw(d3, svg, novalue, element, attrs);
            } else {
              if(data) {
                scope.draw(d3, svg, data, element, attrs);
              }
            }

          };

        });

      }};
  }

})(); // End of IIFE

