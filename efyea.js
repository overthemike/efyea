(ef = function(undef){
  'use strict';
  
  var core = (function (conf) {
    var publ = {
      extensions: {},
      conf: {}
    };

    /**
     * Allows extensions to add namespaced methods to the core.
     * Example:
     * (function(ef, undef){
     *   ef.extend('myExtensionName', function() {
     *     this.myExtensionMethod = function() {};
     *     return this;
     *   });
     * }(ef));
     *
     * @param {string} name The name of the extension. Will be used as an internal namespace.
     * @param {function} callback The constructor method for the extension.
     **/
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

    /**
     * Add public configuratoins to be seen by the entire app. For example, if you needed
     * to have an API key available to all methods that make an ajax request, you could put
     * that key here for easy access.
     *
     * @param {object} conf Key value pair of configuration properties.
     **/
    publ.config = function (conf) {
      for (configuration in conf) {
        publ.conf[conf] = configuration;
      }
    }

    return publ;
  }());

 return core;
}());
