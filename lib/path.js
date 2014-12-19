(function() {
    'use strict';
    
    /*jshint validthis:true */
    /*global File */
    
    var path = new pathProto();
    
    if (typeof module === 'object' && module.exports)
        module.exports = path;
    else
        global.path = path;
    
    function pathProto() {
        this.normalize = function(name) {
            var file = new File(name);
            
            return file.fsName;
        };
    }
})();
