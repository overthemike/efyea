(function(ef, undef){
  'use strict';
  ef.extend('core', function () {
    var modules = {},
      ext = this;

    /**
     * Registers a module to be initiated.
     *
     * @param {string} moduleName The name of the module within the extension (will be namespaced)
     * @param {function} creator The module code encapsulated in a function callback.
     **/
    ext.register = function (moduleName, creator) {
      modules[moduleName] = {
        create: creator,
        sandbox: new ef.sandbox(moduleName)
      };

      return ext; // chainable
    };

    /**
     * "Starts" a module by calling the init method of that module.
     *
     * @param {string} moduleName The name of the module to be started.
     */
    ext.start = function (moduleName) {
      var module = modules[moduleName];

      if (module && typeof module.create === 'function') {
        module.create(module.sandbox);
        module.sandbox.engage('init');
      }

      return ext; // chainable
    };

    /**
     * "Stops" a module by calling the destroy method of the module and setting the instance to null.
     *
     * @param {string} moduleName The name of the module to be stopped.
     **/
    ext.stop = function (moduleName) {
      var module = modules[moduleName];

      module.sandbox.engage('destroy');
      module = null;

      return ext; // chainable
    };

    /**
     * Starts all modules currently registered to the core.
     * 
     * @see start()
     **/
    ext.startAll = function () {
      for (var moduleName in modules) {
        ext.start(moduleName);
      }

      return ext; // chainable
    };

    /**
     * Stops all modules currently registered to the core.
     *
     * @see stop()
     **/
    ext.stopAll = function () {
      for (var moduleName in modules) {
        ext.stop(moduleName);
      }
      
      return ext; // chainable
    };

    return ext;
  });
}(ef));
