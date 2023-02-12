'use strict';

const fs = require('fs');
const path = require('path');

module.exports = {
  loadSubapps(rootDir) {
    const names = fs.readdirSync(rootDir);
    const subApps = new Map();
    for (const dirname of names) {
      if (!dirname.match(/\.com$/) || !fs.statSync(path.join(rootDir, dirname)).isDirectory()) {
        continue;
      }
      subApps.set(dirname, {
        name: dirname,
        baseDir: path.join(rootDir, dirname),
      });
    }
    return subApps;
  },
};
