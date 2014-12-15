var fs;
 
(function() {
    'use strict';
    
    /*jshint validthis:true */
    /*global File */
        
    fs = new fsProto();
    
    function fsProto() {
        var write = function (name, data, callback) {
            var error, isOpen, isWrite, isClose,
                file = new File(name);
            
            isOpen  = file.open('w:');
            
            if (!isOpen) {
                error = Error('Cannot open ' + name);
                error.code = 'EOPEN';
            }
            
            isWrite = file.write(data);
            
            if (isOpen && !isWrite) {
                error = Error('Cannot write ' + name);
                error.code = 'EWRITE';
            }
            
            isClose = file.close();
            
            if (isOpen && isWrite && !isClose) {
                error = Error('Cannot close ' + name);
                error.code = 'ECLOSE';
            }
            
            callback(error);
        };
        
        this.writeFileSync = function(name, data) {
            write(name, data, function(error) {
                if (error)
                    throw(error);
            });
        };
        
        this.writeFile      = function(name, data, callback) {
            write(name, data, callback);
        };
        
    }
    
})();