/*jshint -W079*/
var require;
/*jshint +W079 */

(function() {
    'use strict';
    
    var Dir = '';
    
    /*global File */
    
    /*jshint -W020 */
    require = function(name) {
        var begin   = 'var module = {}; (function(module, exports) {',
            end     = '})(module, module.exports); return module.exports;',
            code    = readFileSync(Dir + name),
            module  = Function(begin + code + end)();
        
        return module;
    };
    /*jshint +W020 */
    
    require.dir     = function(dir) {
        Dir = dir;
    };
    
    function readFileSync(name) {
        var data,
            file = tryOpen(name, ['.js', '.jsx']);
        
        data = file.read(data)  || throwError(file.error);
        file.close()            || throwError(file.error);
        
        return data;
    }
    
    function throwError(error) {
        throw error;
    }
    
    function tryOpen(name, exts) {
        var file;
        
        some(exts, function(ext) {
            var is;
            
            file    = new File(name + ext);
            is      = file.open('r:');
            
            return is;
        });
        
        if (file.error)
            throw file.error;
        
        return file;
    }
    
    function some(array, fn) {
        var i, is,
            n = array.length;
        
        for (i = 0; i < n; i++) {
            is = fn(array[i], i, n);
            
            if (is)
                break;
        }
    }
    
})();
