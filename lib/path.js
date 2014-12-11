var path;

(function() {
    'use strict';
    
    /*jshint validthis:true */
    /*global File */
    
    path = new pathProto();
    
    function pathProto() {
        this.normalize = function(name) {
            var file = new File(name);
            
            return file.relativeURI;
        };
    }
})();