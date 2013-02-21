(function(ef, undef){
  'use strict';
  ef.extend('core', function () {
    var modules = {},
      ext = this;

    ext.register = function (moduleName, creator) {
      modules[moduleName] = {
        create: creator,
        sandbox: new ef.sandbox(moduleName)
      };

      return ext; // chainable
    };

    ext.start = function (moduleName) {
      var module = modules[moduleName];

      if (module && typeof module.create === 'function') {
        module.create(module.sandbox);
        module.sandbox.engage('init');
      }

      return ext; // chainable
    };

    ext.stop = function (moduleName) {
      var module = modules[moduleName];

      module.sandbox.engage('destroy');

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
