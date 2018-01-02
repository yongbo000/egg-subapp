'use strict';

const path = require('path');

module.exports = appInfo => {
  const exports = {};

  exports.subApp = {
    virtualHosts: {
      // 应用通过配置 virtualHosts 来自定义访问域名
    },
  };

  exports.view = {
    root: path.join(appInfo.baseDir, 'app'),
    defaultViewEngine: 'nunjucks',
    mapping: {
      '.html': 'nunjucks',
    },
  };

  return exports;
};
