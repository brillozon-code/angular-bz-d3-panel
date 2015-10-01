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
        counter:    '=',
        bzD3Render: '=', // Internal actions.
        content:    '=', // Data to draw.
        render:     '=', // Create drawing.
        redraw:     '='  // Redraw drawing.
      },

      link: function(scope,element,attrs) {
        // Keep our actions handy.
        scope.bzD3Render = {
          render:   scope.render,
          redraw:   scope.redraw,
          doRender: doRender,
          doRedraw: doRedraw
        };

        // The actual drawing.
        var svg;

        // DEPRECATED. Location adjustments.
        var margin  = parseInt(attrs.margin)  || 20;
        var padding = parseInt(attrs.padding) || 5;

        var height; 
        var width;

        establishSize();

        function establishSize() {
          // Drawing height from container.
          if(attrs.height) {
            height  = parseInt(attrs.height);
          } else {
            height = $(element).parent().height();
            attrs.height = height;
          }

          // Drawing width from container.
          if(attrs.width) {
            width = parseInt(attrs.width);
          } else {
            width = $(element).parent().width();
            attrs.width = width;
          }
        }

        bzD3.d3().then(function(d3) {
          // Create the drawing after we have the D3.js library available.
          svg = d3.select(element[0])
                  .insert('svg',':first-child')
                  .style('height', height + 'px')
                  .style('width', width + 'px');

          // Check for changes when the window is resized.
          $window.onresize = function() {
            scope.$apply;
          };

          // Redraw when the size changes.
          scope.$watch(function() {
            return element[0].firstElementChild.clientWidth;

          }, function() {
            if(scope.content) {
              establishSize();
              scope.bzD3Render.doRedraw(scope.content);
            }
          });

          // Redraw when the data changes.
          scope.$watchCollection('content', function(newVals,oldVals) {
            if(scope.content) {
              establishSize();
              scope.bzD3Render.doRedraw(scope.content);
            }
          }, true);

          // Render the drawing as soon as feasible.
          scope.bzD3Render.doRender(scope.content);

        });

        // Rendering function.  The fun happens here.  :)
        function doRender(data) {
          if(!scope.bzD3Render.render) {
            var novalue = [0];
            defaultRender(d3, svg, novalue, element, attrs);
          } else {
            if(data) {
              scope.bzD3Render.render(d3, svg, data, element, attrs);
            }
          }

          if(scope.content) {
            // Add the content if there is data to draw with.  Otherwise
            // this will be called when data becomes available.
            scope.bzD3Render.doRedraw(scope.content);
          }

        };

        // Redrawing function.  The fun happens here.  :)
        function doRedraw(data) {
          if(!scope.bzD3Render.redraw) {
            var novalue = [0];
            defaultRedraw(d3, svg, novalue, element, attrs);
          } else {
            if(data) {
              scope.bzD3Render.redraw(d3, svg, data, element, attrs);
            }
          }

        };

        function defaultRender(d3, svg, data, element, attrs) {
          svg.style('stroke-width', '0px')
             .style('background-color', '#bf8ea6');

        }

        function defaultRedraw(d3, svg, data, element, attrs) {
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
           .attr("y",(height/2))
           // .style('color','ivory')
           // .style('stroke','ivory')
           .text("LOL WUT");
          g.append("text")
           .attr("x",30)
           .attr("y",20)
           .text('Number of insert events: ' + ++scope.counter);
        }

      }};
  }

})(); // End of IIFE

