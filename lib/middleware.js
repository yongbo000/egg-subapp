'use strict';

const path = require('path');

module.exports = app => {
  for (const subApp of app.subApps.values()) {
    const target = {};
    const subAppMiddlewareBaseDir = path.join(subApp.baseDir, 'middleware');
    app.loader.loadToApp(subAppMiddlewareBaseDir, 'subAppMiddlewares', {
      call: false,
      override: true,
      caseStyle: 'lower',
      target,
    });
    app.subAppMiddlewares[subApp.name] = target;
  }
};
