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
        this.basename   = function(p, ext) {
            var n       = p.lastIndexOf('/'),
                name    = p.substr(n + 1);
            
            if (ext)
                name    = name.replace(ext, '');
            
            return name;
        };
        
        this.dirname    = function(name) {
            var file    = new File(name),
                folder  = file.parent;
            
            return folder.fsName;
        };
        
        this.normalize  = function(name) {
            var file = new File(name);
            
            return file.fsName;
        };
    }
})();
