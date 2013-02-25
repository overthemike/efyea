(function(ef, m, undef){
  'use strict';
  ef.extend('mustache', function () {
    var ext = this;

    ext.render = function (template, view, partials) {
      return m.render(template, view, partials);
    };

    ext.compile = function (template, tags) {
      return m.render(template, tags);
    };

    ext.compilePartial = function (name, template, tags) {
      return m.compilePartial(name, template, tags);
    };

    ext.compileTokens = function (tokens, template) {
      return m.compileTokens(tokens, template);
    };
  });
}(ef, Mustache));
