'use strict';

const path = require('path');

module.exports = {
  loadSubapps(app) {
    const subApps = new Map();
    for (const name in app.config.subApp.virtualHosts) {
      subApps.set(name, {
        name,
        baseDir: path.dirname(app.config.subApp.virtualHosts[name].baseDir),
      });
    }
    return subApps;
  },
};
