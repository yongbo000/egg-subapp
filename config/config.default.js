'use strict';

const path = require('path');
const loadSubapps = require('../lib/util').loadSubapps;

module.exports = appInfo => {
  const exports = {};

  exports.subApp = {
    virtualHosts: {
      // 应用通过配置 virtualHosts 来自定义访问域名
    },
    middleware: {
      // 配置subapp的全局前置中间件，如 'demo.subapp.com': [ needLogin, ... ]
    },
  };

  exports.view = {
    root: path.join(appInfo.baseDir, 'app'),
    defaultViewEngine: 'nunjucks',
    mapping: {
      '.html': 'nunjucks',
    },
  };

  const subApps = loadSubapps(appInfo.baseDir);
  const ignoreDirs = Array.from(subApps.values()).reduce((prev, next) => {
    return prev.concat([
      `app/${next.name}/view`,
      `app/${next.name}/views`,
      `app/${next.name}/assets`,
    ]);
  }, []);

  exports.development = {
    ignoreDirs,
  };

  return exports;
};
