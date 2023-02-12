'use strict';

const path = require('path');

module.exports = appInfo => {
  const exports = {};

  const subAppRootDir = path.join(appInfo.baseDir, 'app/subapp');

  exports.subApp = {
    virtualHosts: {
      // 应用通过配置 virtualHosts 来自定义访问域名
    },
    middleware: {
      // 配置subapp的全局前置中间件，如 'demo.subapp.com': [ needLogin, ... ]
    },
    rootDir: subAppRootDir,
  };

  exports.view = {
    root: subAppRootDir,
    defaultViewEngine: 'nunjucks',
    mapping: {
      '.html': 'nunjucks',
    },
  };

  return exports;
};
