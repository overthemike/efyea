(ef = function(undef){
  'use strict';
  
  var core = (function (conf) {
    var publ = {extensions: []},
      priv = {
        conf: conf || {}
      };

    publ.extend = function (name, callback) {
      var params = [publ, priv],
        method,
        methods = [],
        extension;

      extension = callback.apply(publ, params);

      for (method in extension) {
        if (extension.hasOwnProperty(method) && typeof extension[method] === 'function') {
          methods.push(method);
          publ[method] = extension[method];
        }
      }

      publ.extensions.push({'name':name, 'methods':methods}); // debugging
      
      return publ;
    };

    return publ;
  }());

 return core;
}());
