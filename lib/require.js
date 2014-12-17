/*jshint -W079*/
var require;
/*jshint +W079 */

(function() {
    'use strict';
    
    var Modules = {};
    
    /*global File */
    
    /*jshint -W020 */
    require = function(name) {
        var code, module,
            begin   = 'var module = { exports:{} }; (function(module, exports) {',
            end     = '})(module, module.exports); return module.exports;',
            path    = getFilePath(name);
            
        if (Modules[path]) {
            module          = Modules[path];
        } else {
            code            = readFileSync(name);
            module          = Function(begin + code + end)();
            Modules[path]   = module;
        }
        
        return module;
    };
    /*jshint +W020 */
    
    function readFileSync(name) {
        var data,
            file    = tryOpen(name, ['.js', '.jsx']);
        
        if (!data)
            data = file.read(data)  || throwError(file.error);
        
        file.close()            || throwError(file.error);
        
        return data;
    }
    
    function getFilePath(name) {
        var file = new File(name);
        return file.absoluteURI;
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
