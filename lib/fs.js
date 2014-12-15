var fs;
 
(function() {
    'use strict';
    
    /*jshint validthis:true */
    /*global File */
        
    fs = new fsProto();
    
    function fsProto() {
        this.writeFileSync = function(name, data) {
            write(name, data, function(error) {
                if (error)
                    throw(error);
            });
        };
        
        this.writeFile      = function(name, data, callback) {
            write(name, data, callback);
        };
        
        function write(name, data, callback) {
            var error = tryFile(name, function(file) {
                file.open('w:');
                
                if (file.error) 
                    throw('EOPEN');
                
                file.write(data);
                
                if (file.error)
                    throw('EWRITE');
                
                file.close();
                
                if (file.error)
                    throw('ECLOSE');
            });
            
            callback(error);
        }
        
        function tryFile(name, fn) {
            var error,
                file = new File(name),
                code = tryCatch(function() {
                    fn(file);
                });
            
            if (code) {
                error = Error(file.error + ' ' + name);
                error.code = code;
            }
            
            return error;
        }
        
        function tryCatch(fn) {
            var error;
            
            try {
                fn();
            } catch(err) {
                error = err;
            }
            
            return error;
        }
        
    }
    
})();
