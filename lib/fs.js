(function(global) {
    'use strict';
    
    /*jshint validthis:true */
    /*global File */
    /*global Folder */
    
    var fs = new fsProto();
    
    if (typeof module === 'object' && module.exports)
        module.exports = fs;
    else
        global.fs = fs;
    
    function fsProto() {
        this.mkdir          = function(path, callback) {
            var error = tryCatch(function() {
                fs.mkdirSync(path);
            });
            
            callback(error);
        };
        
        this.mkdirSync      = function(path) {
            var error = tryFolder(path, function(folder) {
                folder.create() || throwError('EDIR');
            });
            
            if (error)
                throwError(error);
        };
        
        this.rename       = function(from, to, callback) {
            var error = tryFile(from, function(file) {
                file.rename(to) || throwError('ERENAME');
            });
            
            callback(error);
        };
        
        this.renameSync       = function(from, to) {
            fs.rename(from, to, function(error) {
                if (error)
                    throwError(error);
            });
        };
        
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
                file.encoding   = encoding || 'UTF-8';
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
        
        function tryFolder(name, fn) {
            var error,
                folder  = new Folder(name),
                
                code    = tryCatch(function() {
                    fn(Folder);
                });
            
            if (code) {
                error = Error(folder.error + ' ' + name);
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
