(function(global) {
    'use strict';
    
    /*jshint validthis:true */
    /*global File */
    
    var fs = new fsProto();
    
    if (typeof module === 'object' && module.exports)
        module.exports = fs;
    else
        global.fs = fs;
    
    function fsProto() {
        this.writeFileSync = function(name, data) {
            write(name, data, function(error) {
                if (error)
                    throwError(error);
            });
        };
        
        this.writeFile      = function(name, data, callback) {
            write(name, data, callback);
        };
        
        this.readFileSync = function(name) {
            var result;
            
            read(name, function(error, data) {
                if (error)
                    throwError(error);
                
                result = data;
            });
            
            return result;
        };
        
        this.readFile      = function(name, callback) {
            read(name, callback);
        };
        
        function write(name, data, callback) {
            var error = tryFile(name, function(file) {
                file.open('w:')     || throwError('EOPEN');
                file.write(data)    || throwError('EWRITE');
                file.close()        || throwError('ECLOSE');
            });
            
            callback(error);
        }
        
        function read(name, callback) {
            var data,
                error = tryFile(name, function(file) {
                    file.open('r:')             || throwError('EOPEN');
                    data = file.read(data)      || throwError('EREAD');
                    file.close()                || throwError('ECLOSE');
                });
            
            callback(error, data);
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
        
        function throwError(error) {
            throw error;
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
    
})(this);
