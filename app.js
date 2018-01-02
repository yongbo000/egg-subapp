'use strict';

const fs = require('fs');
const path = require('path');

module.exports = app => {
  // 自动加载 subapp 中间件
  app.config.coreMiddleware.push('subApp');

  // 加载子应用目录
  const rootDir = path.join(app.baseDir, 'app');
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

  app.subApps = subApps;

  process.nextTick(() => {
    // 重写render
    require('./lib/render')(app);
    // 加载service
    require('./lib/service')(app);
    // 加载controller
    require('./lib/controller')(app);
    // 加载middleware
    require('./lib/middleware')(app);
    // 加载router
    require('./lib/router')(app);
  });
};

