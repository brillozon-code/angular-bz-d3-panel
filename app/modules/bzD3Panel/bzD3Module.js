
'use strict';

angular.module('bzD3Module', [])
  .factory('d3Service', ['$document', '$q', '$rootScope',
    function($document, $q, $rootScope) {
      
      var d = $q.defer();
      function onScriptLoad() {
        // Load client in the browser.
        $rootScope.$apply(function() { d.resolve(window.d3); });
      }

      // Callback when loaded.
      // @TODO: add fallback to local copy if CDN not available.
      var scriptTag   = $document[0].createElement('script');
      scriptTag.type  = 'text/javascript';
      scriptTag.async = true;
      scriptTag.src   = "http://d3js.org/d3.v3.min.js";
      scriptTag.onload = onScriptLoad;

      scriptTag.onreadystatechange = function() {
        if(this.readyState == 'complete') onScriptLoad();
      }

      var s = $document.prop("body");
      s.appendChild(scriptTag);

      return {
        d3: function() { return d.promise; }
      };

  }]);


