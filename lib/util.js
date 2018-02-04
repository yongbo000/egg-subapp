'use strict';

const fs = require('fs');
const path = require('path');

module.exports = {
  loadSubapps(baseDir) {
    const rootDir = path.join(baseDir, 'app');
    const names = fs.readdirSync(rootDir);
    const subApps = new Map();
    for (const name of names) {
      if (!name.match(/\.com$/) || !fs.statSync(path.join(rootDir, name)).isDirectory()) {
        continue;
      }
      subApps.set(name, {
        name,
        baseDir: path.join(rootDir, name),
      });
    }
    return subApps;
  },
};
