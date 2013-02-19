(function(ef, undef){
  'use strict';
  ef.extend('modules', function (publ, priv) {
    var modules = {};

    publ.register = function (moduleName, creator) {
      modules[moduleName] = {
        create: creator,
        instance: null
      };

      return publ; // chainable
    };

    publ.start = function (moduleName) {
      var module = modules[moduleName];

      if (module && typeof module.create === 'function') {
        module.instance = module.create(new ef.sandbox());
        if (module.instance.hasOwnProperty('init') && typeof module.instance.init === 'function') {
          module.instance.init();
        }
      }

      return publ; // chainable
    };

    publ.stop = function (moduleName) {
      var module = modules[moduleName];

      if (module && module.instance) {
        if (module.instance.hasOwnProperty('destroy') && typeof module.instance.destroy === 'function') {
          module.instance.destroy();
        }
        module.instance = null;
      }

      return publ; // chainable
    };

    publ.startAll = function () {
      for (var moduleName in modules) {
        publ.start(moduleName);
      }

      return publ; // chainable
    };

    publ.stopAll = function () {
      for (var moduleName in modules) {
        publ.stop(moduleName);
      }
      
      return publ; // chainable
    };

    return publ;
  });
}(ef));
