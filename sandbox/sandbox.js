/**
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
  var method,
    methods = {
      'core.publish' : 'publish',
      'core.subscribe' : 'subscribe',
      'core.unsubscribe' : 'unsubscribe',
      'core.subscribeOnce' : 'subscribeOnce',
      'mustache.test' : 'test'
    };

  ef.sandbox = function(){
    this.actions = {};
  };

  // Map the extension methods to a method name to be used by a sandbox. 
  for (method in methods) {
    facade = methods[method];
    ef.sandbox.prototype[facade] = ef.extensions[method.split('.')[0]][method.split('.')[1]];
  }

  ef.sandbox.prototype.engage = function(action) {
    var callback = this.actions[action];
    if (callback && typeof callback === 'function') {
      callback();
    }
  };

  ef.sandbox.prototype.waitforit = function(action, callback) {
    this.actions[action] = callback;
  };
}(ef));
