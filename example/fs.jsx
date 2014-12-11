(function() {
    'use strict';
    
    #include ../lib/fs.js
    
    fs.writeFile('readme.txt', 'all this simple', function(error) {
        if (error)
            alert(error);
    })
    
})();
