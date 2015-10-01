# angular-bz-d3-panel

**Version 0.3.0**

Simple encapsulation of D3 to allow drawing within a defined panel in an
HTML page.

## Usage

Start by installing the built JavaScript module:

<pre>
  bash> bower install angular-bz-d3-panel
</pre>

Then add the module to the HTML file:

<pre>
  ...
  &lt;script src="bower_modules/angular-bz-d3-panel/bzD3Panel.min.js" type="text/javascript">&lt;/script>
  ...
</pre>

Then use the HTML panel wherever you want to add a drawing:

<pre>
  ...
  &lt;body ng-app="application">
  ...
    &lt;div ng-controller="PanelController">
      &lt;bz-d3-panel data-content="panelData" data-render="renderPanel" data-redraw="redrawPanel">
        &lt;p>
          This panel includes a drawing that has this caption.
        &lt;/p>
      &lt;/bz-d3-panel>
    &lt;/div>
  ...
  &lt;/body>
  ...
</pre>

Where the panel controller scope includes the 'panelData' variable
containing the data to be drawn, and the 'renderPanel' function that uses
D3.js to draw that data.

<pre>
  module("application",["bzD3"])
    .controller("PanelController",[ function() {
      $scope.panelData = { data: [ 15, 25, 35 ] };

      $scope.renderPanel = function(d3,svg,data) {
        svg.style('background-color','ivory');
      }

      $scope.redrawPanel = function(d3,svg,data) {
        var circles = svg.selectAll("circle")
                         .data(data)
                         .enter();
        circles.append("circle")
               .style("fill", "red")
               .style("stroke", "black")
               .style("stroke-width", "2")
               .attr("cx",function(d,i) {return 2*40*(i+1) + d;})
               .attr("cy",40)
               .attr("r",function(d) {return d;});
      }
    }])
</pre>

## Examples

## Develop

<pre>
  bash> grunt serve
</pre>

## Testing

<pre>
  bash> grunt test
</pre>

## Deploy

<pre>
  bash> grunt bower
  bash> git push origin master
</pre>

