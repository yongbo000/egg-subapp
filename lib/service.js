'use strict';

const path = require('path');

module.exports = app => {
  const cache = new Map();
  for (const subApp of app.subApps.values()) {
    const target = {};
    const subAppServiceBaseDir = path.join(subApp.baseDir, 'service');
    app.loader.loadToContext(subAppServiceBaseDir, subApp.name + '.subAppServices', {
      call: true,
      override: true,
      caseStyle: 'lower',
      target,
    });
    cache.set(subApp.name, target);
  }
};
