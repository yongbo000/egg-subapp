'use strict';

const path = require('path');

module.exports = app => {
  // load subapp controller into app.controller[subAppName]
  for (const subApp of app.subApps.values()) {
    const target = {};
    const subAppControllerBaseDir = path.join(subApp.baseDir, 'controller');
    app.loader.loadController({
      target,
      directory: subAppControllerBaseDir,
    });
    readOnly(app.controller, subApp.name, target);
  }

  function readOnly(controller, name, value) {
    Object.defineProperty(controller, name, {
      value,
      enumerable: false,
      configurable: false,
    });
  }
};
