/**
 * The reason why the sandbox is in it's own directory is to give the option to
 * have it be it's own repo with versioning (git sub module for instance). 
 *
 * The provided sandbox is purposely generic. You can modify it or build your
 * own to include whatever kind of features you want (i.e. permissions for your
 * modules).
 */
(function(ef){
  ef.sandbox = function () {
    var publ = {},
      priv = {};

    /**
     * These are the methods that will be available to the modules. All that is
     * needed is the name of the methods from whatever extensions you're using
     * to be supplied in this array, and the modules will have access to them.
     */
    publ.methods = [
      'publish',
      'subscribe',
      'unsubscribe',
      'subscribeOnce'
    ];

    priv.assign = function (method) {
      if (method in ef && typeof ef[method] === 'function') {
        publ[method] = ef[method];
      }
    };

    for (var i = 0, len = publ.methods.length; i < len; i+=1) {
      priv.assign(publ.methods[i]);
    }

    return publ;
  };
}(ef));
