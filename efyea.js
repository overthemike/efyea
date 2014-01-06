(ef = function(undef){
  'use strict';
  
  var core = (function (conf) {
    var publ = {
      extensions: {},
      conf: {}
    };

    publ.extend = function (name, callback) {
      var method,
        extension;

      // create an internal namespace for the extension
      publ.extensions[name] = publ.extensions[name] || {};

      extension = callback.call(publ.extensions[name]);
  
      for (method in extension) {
        if (extension.hasOwnProperty(method) && typeof extension[method] === 'function') {
          publ.extensions[name][method] = extension[method];
        }
      }
      
      return publ;
    };

    publ.config = function (conf) {
      for (configuration in conf) {
        publ.conf[conf] = configuration;
      }
    }

    return publ;
  }());

 return core;
}());
