/**
 * The sandbox will serve as the API for the modules to access the methods from
 * the core and its extension.
 *
 * The reason why the sandbox is in it's own directory is to give the option to
 * have it be it's own repo with versioning (git sub module for instance). 
 *
 * The provided sandbox is purposefully generic. You can/should modify it or 
 * build your own to include whatever you want.
 *
 * FYI: If you decide to modify this sandbox and still use the module pattern 
 * provided by the core extension, make sure that the reference to the new
 * sandbox is correct when creating a module.
 */
(function(ef){
  var facade,
    methods = {
      'publish'       : 'core/publish',
      'subscribe'     : 'core/subscribe',
      'unsubscribe'   : 'core/unsubscribe',
      'subscribeOnce' : 'core/subscribeOnce',
      'render'        : 'mustache/render',
      'compile'       : 'mustache/compile',
      'compilePartial': 'mustache/compilePartial',
      'compileTokens' : 'mustache/compileTokens'
    },
    props = {};

  ef.sandbox = function(){
    this.actions = {};  
  };

  // Map the extension methods to a method name to be used by a sandbox. 
  for (facade in methods) {
    ef.sandbox.prototype[facade] = ef.extensions[methods[facade].split('/')[0]][methods[facade].split('.')[1]];
  }

  for (configuration in ef.core.conf) {
    ef.sandbox.prototype[configuration] = ef.core.conf[configuration];
  }

  ef.sandbox.prototype.engage = function(action) {
    var callback = this.actions[action];
    if (callback && typeof callback === 'function') {
      callback.call(this);
    }
  };

  ef.sandbox.prototype.waitforit = function(action, callback) {
    this.actions[action] = callback;
  };

  // convenience method
  ef.sandbox.prototype.init = function(callback) {
    this.waitforit('init', callback);
  };

  // convenience method
  ef.sandbox.prototype.destroy = function(callback) {
    this.waitforit('destroy', callback);
  };
}(ef));
