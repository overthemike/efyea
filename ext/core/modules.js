(function(ef, undef){
  'use strict';
  ef.extend('core', function () {
    var modules = {},
      ext = this;

    ext.register = function (moduleName, creator) {
      modules[moduleName] = {
        create: creator,
        instance: null
      };

      return ext; // chainable
    };

    ext.start = function (moduleName) {
      var module = modules[moduleName];

      if (module && typeof module.create === 'function') {
        module.instance = module.create(new ef.sandbox());
        if (module.instance.hasOwnProperty('init') && typeof module.instance.init === 'function') {
          module.instance.init();
        }
      }

      return ext; // chainable
    };

    ext.stop = function (moduleName) {
      var module = modules[moduleName];

      if (module && module.instance) {
        if (module.instance.hasOwnProperty('destroy') && typeof module.instance.destroy === 'function') {
          module.instance.destroy();
        }
        module.instance = null;
      }

      return ext; // chainable
    };

    ext.startAll = function () {
      for (var moduleName in modules) {
        ext.start(moduleName);
      }

      return ext; // chainable
    };

    ext.stopAll = function () {
      for (var moduleName in modules) {
        ext.stop(moduleName);
      }
      
      return ext; // chainable
    };

    return ext;
  });
}(ef));
