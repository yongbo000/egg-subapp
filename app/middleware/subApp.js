'use strict';

const urlparse = require('url').parse;
const qsparse = require('querystring').parse;

module.exports = (options, app) => {
  const cookieField = '__app';

  // 优先级：
  // query > cookie > referer
  const tryGetSubAppHostName = ctx => {
    const cookieHostname = ctx.getCookie(cookieField);
    let hostname = ctx.query.__app || cookieHostname;

    // 从referer中取
    if (!hostname) {
      const referer = ctx.get('referer');
      if (referer) {
        const urlinfo = urlparse(referer);
        hostname = qsparse(urlinfo.query)[cookieField];
      }
    }

    // 最后获取的hostname和cookie中存的不一致，更新cookie
    if (hostname && hostname !== cookieHostname) {
      ctx.setCookie(cookieField, hostname);
    }
    return hostname;
  };

  return async (ctx, next) => {
    let hostname = ctx.hostname;

    // 非线上环境,允许通过?__app=hostname来指定域名
    if (app.config.env !== 'prod') {
      const __app = tryGetSubAppHostName(ctx);
      if (__app && __app !== hostname) {
        hostname = __app;
      }
    }

    // 1. 在config中有配置映射，按照配置路由
    let appDirName = options.virtualHosts[hostname];
    if (!appDirName) {
      // 2. 没有在config里配置映射，默认路由到 hostanme/view/xxx
      appDirName = hostname;
    }

    const subApp = app.subApps.get(appDirName);
    if (subApp) {
      // 路由到子应用
      ctx.routerPath = '/' + appDirName + ctx.path;
      ctx.subApp = subApp;
    }
    // else {
    //   if (app.config.notfound.pageUrl) {
    //     return ctx.redirect(app.config.notfound.pageUrl);
    //   }
    // }

    await next();
  };
};
