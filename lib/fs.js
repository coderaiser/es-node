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
        this.writeFileSync = function(name, data, options) {
            write(name, data, options, function(error) {
                if (error)
                    throwError(error);
            });
        };
        
        this.writeFile      = function(name, data, options, callback) {
            write(name, data, options, callback);
        };
        
        this.readFileSync = function(name, options) {
            var result;
            
            read(name, options, function(error, data) {
                if (error)
                    throwError(error);
                
                result = data;
            });
            
            return result;
        };
        
        this.readFile      = function(name, options, callback) {
            read(name, callback);
        };
        
        function write(name, data, options, callback) {
            var error;
            
            error = tryFile(name, options, function(file) {
                file.open('w:')             || throwError('EOPEN');
                file.write(data)            || throwError('EWRITE');
                file.close()                || throwError('ECLOSE');
            });
            
            callback(error);
        }
        
        function read(name, options, callback) {
            var data, error;
            
            error = tryFile(name, options, function(file) {
                file.open('r:')             || throwError('EOPEN');
                data = file.read(data)      || throwError('EREAD');
                file.close()                || throwError('ECLOSE');
            });
            
            callback(error, data);
        }
        
        function tryFile(name, options, fn) {
            var error, code, encoding,
                file = new File(name);
            
            if (options) {
                encoding        = options.encoding;
                file.encoding   = encoding || '';
            }
            
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
