'use strict';

const { loadSubapps } = require('./lib/util');

module.exports = app => {
  // 自动加载 subapp 中间件
  app.config.coreMiddleware.push('subApp');

  // 加载子应用目录

  app.subApps = loadSubapps(app);

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

