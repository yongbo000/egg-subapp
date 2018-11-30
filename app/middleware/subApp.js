'use strict';

const urlparse = require('url').parse;
const qsparse = require('querystring').parse;

module.exports = function(options, app) {
  const cookieField = '__app';

  // 优先级：
  // query > cookie > referer
  function tryGetSubAppHostName() {
    const cookieHostname = this.getCookie(cookieField);
    let hostname = this.query.__app || cookieHostname;

    // 从referer中取
    if (!hostname) {
      const referer = this.get('referer');
      if (referer) {
        const urlinfo = urlparse(referer);
        hostname = qsparse(urlinfo.query)[cookieField];
      }
    }

    // 最后获取的hostname和cookie中存的不一致，更新cookie
    if (hostname && hostname !== cookieHostname) {
      this.setCookie(cookieField, hostname);
    }
    return hostname;
  }

  return function* subapp(next) {
    let hostname = this.hostname;

    // 非线上环境
    if (app.config.env !== 'prod') {
      const __app = tryGetSubAppHostName.call(this);
      if (__app && __app !== hostname) {
        hostname = __app;
      }
    }

    // 1. 在config中有配置映射，按照配置路由
    let appName = Object.keys(options.virtualHosts)
      .find(item => options.virtualHosts[item].hostname === hostname);
    if (!appName) {
      // 2. 没有在config里配置映射，默认路由到 hostanme/view/xxx
      appName = hostname;
    }

    const subApp = app.subApps.get(appName);
    if (subApp) {
      // 路由到子应用
      this.routerPath = '/' + appName + this.path;
      this.subApp = subApp;
    } else {
      if (app.config.notfound.pageUrl) {
        return this.redirect(app.config.notfound.pageUrl);
      }
    }

    yield next;
  };
};
