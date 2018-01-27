'use strict';

module.exports = app => {
  const _originalRender = app.context.render;
  // 覆写render
  app.context.render = function subAppRender(name, locals) {
    const subApp = this.subApp;
    if (subApp) {
      if (!locals) {
        locals = {};
      }
      locals._subAppName = subApp.name;
      name = subApp.name + '/view/' + name;
      return _originalRender.call(this, name, locals);
    }
  };
};
