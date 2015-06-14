
'use strict'

angular.module("bzD3Module")
  .directive('bzD3Panel',['d3Service','$window','$document',
    function(d3Service,$window,$document) {

      return {
        restrict: 'EA',
        template: '<div ng-transclude></div>',
        transclude: true,

        scope: {
          content: '=', // Isolated bidirectional binding.
          draw:    '='  // Drawing function from user.
        },

        link: function(scope,element,attrs) {
          d3Service.d3().then(function(d3) {
            var margin  = parseInt(attrs.margin)  || 20;
            var height  = parseInt(attrs.height)  || 50;
            var padding = parseInt(attrs.padding) || 5;

            var svg = d3.select(element[0])
                        .insert('svg',':first-child')
                        .style('stroke-width','0px')
                        .style('background-color','#bf8ea6')
                        .style('height',height)
                        .style('width','100%');

            $window.onresize = function() {
              scope.$apply;
            };

            // Redraw when the size changes.
            scope.$watch(function() {
              return element[0].firstElementChild.clientWidth;
              // return angular.element($window)[0].innerWidth;
            }, function() {
              if(scope.content) {
                scope.render(scope.content.data);
              }
            });

            // Redraw when the data changes.
            scope.$watch('content', function(newVals,oldVals) {
              if(scope.content) {
                return scope.render(scope.content.data);
              }
            }, true);

            scope.defaultDraw = function(d3,svg,data) {
              var g = svg.selectAll("g")
                         .data(data).enter().append("g");
              g.append("circle")
               .style("fill", "red")
               .style("stroke", "black")
               .style("stroke-width", "2")
               .attr("cx",45)
               .attr("cy",45)
               .attr("r",40);
              g.append("text")
               .attr("x",10)
               .attr("y",40)
               .text("LOL WUT");
            }

            // Rendering function.  The fun happens here.  :)
            scope.render = function(data) {
              if(!scope.draw) {
                var novalue = [0];
                scope.defaultDraw(d3, svg, novalue);
              } else {
                if(data) {
                  scope.draw(d3, svg, data, element, attrs);
                }
              }

            };

          });

        }};
    }]);

