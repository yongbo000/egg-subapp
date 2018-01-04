'use strict';

const path = require('path');

module.exports = app => {
  const cache = new Map();
  for (const subApp of app.subApps.values()) {
    const target = {};
    const subAppMiddlewareBaseDir = path.join(subApp.baseDir, 'middleware');
    app.loader.loadToApp(subAppMiddlewareBaseDir, 'subAppMiddlewares', {
      call: false,
      override: true,
      caseStyle: 'lower',
      target,
    });
    cache.set(subApp.name, target);
  }

  for (const appName of cache.keys()) {
    app.subAppMiddlewares[appName] = cache.get(appName);
  }
};
