# angular-bz-d3-panel

**Version 0.2.1**

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
  <script src="bower_modules/angular-bz-d3-panel/bzD3Panel.min.js" type="text/javascript"></script>
  ...
</pre>

Then use the HTML panel wherever you want to add a drawing:

<pre>
  ...
  <body ng-app="application">
  ...
    <div ng-controller="PanelController">
      <bz-d3-panel data-content="panelData" data-draw="renderPanel">
        <p>
          This panel includes a drawing that has this caption.
        </p>
      </bz-d3-panel>
    </div>
  ...
  </body>
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

