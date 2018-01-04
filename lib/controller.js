'use strict';

const path = require('path');

module.exports = app => {
  const cache = new Map();
  // load subapp controller into app.controller[subAppName]
  for (const subApp of app.subApps.values()) {
    const target = {};
    const subAppControllerBaseDir = path.join(subApp.baseDir, 'controller');
    app.loader.loadController({
      target,
      directory: subAppControllerBaseDir,
    });
    cache.set(subApp.name, target);
  }

  for (const appName of cache.keys()) {
    readOnly(app.controller, appName, cache.get(appName));
  }

  function readOnly(controller, name, value) {
    Object.defineProperty(controller, name, {
      value,
      enumerable: false,
      configurable: false,
    });
  }
};
