'use strict';

const fs = require('fs');
const path = require('path');
const is = require('is-type-of');
const assert = require('assert');
const inspect = require('util').inspect;
const globby = require('globby');
const utils = require('egg-core').utils;
const pathMatching = require('egg-path-matching');

const methods = utils.methods.concat([ 'all', 'resources', 'register', 'redirect' ]);

module.exports = app => {
  for (const subApp of app.subApps.values()) {
    // 推荐在 {subappname}/router/**/*.js 拆分路由
    const subAppRouterDir = path.join(subApp.baseDir, 'router');
    // 获取所有js文件
    let routerFilePaths = globby.sync([ '**/*.js' ], {
      cwd: subAppRouterDir
    }).map(filepath => {
      return path.join(subAppRouterDir, filepath);
    });

    // 默认router.js位置
    const routerJsFile = path.join(subApp.baseDir, 'router.js');
    // 支持 {subappname}/router.js 的默认写法
    routerFilePaths = [ routerJsFile ].concat(routerFilePaths);

    // 获取subapp需要前置的mw
    subApp.frontMws = getSubAppFrontMw(subApp, app);
    // 创建一个app实例
    const routerApp = createRouterApp(subApp, app);
    for (const fullpath of routerFilePaths) {
      if (fs.existsSync(fullpath) && fs.statSync(fullpath).isFile()) {
        // 加载路由
        require(fullpath)(routerApp, app);
      }
    }
  }
};

function getSubAppFrontMw(subApp, app) {
  const middlewares = app.config.subApp.middleware;
  if (!middlewares || !middlewares[subApp.name]) {
    return [];
  }
  return middlewares[subApp.name].map(name => {
    const options = app.config[name] || {};
    let mw = app.subAppMiddlewares[subApp.name][name];
    mw = mw(options, app);
    assert(is.function(mw), `Middleware ${name} must be a function, but actual is ${inspect(mw)}`);
    mw._name = name;
    // middlewares support options.enable, options.ignore and options.match
    mw = wrapMiddleware(mw, options);
    return mw;
  }).filter(mw => {
    return mw !== null;
  });
}

function createRouterApp(subApp, app) {
  const subAppName = subApp.name;
  const routerApp = {
    router: {},
    jsonp: app.jsonp.bind(app),
    middleware: app.subAppMiddlewares[subAppName],
    controller: app.controller[subAppName],
  };
  methods.forEach(method => {
    routerApp[method] = routerApp.router[method] = function subAppRouter(...args) {
      const url = args[0];
      const routerUrl = '/' + subAppName + url;
      app.logger.info('[subApp:router] %s %s => %s', method.toUpperCase(), url, routerUrl);

      args[0] = routerUrl;

      if (method === 'redirect') {
        return app.router[method](...args);
      }

      // 将前置的mw放在最前
      args = [ routerUrl ].concat(subApp.frontMws, args.slice(1));

      const lastOne = args.pop();
      if (is.string(lastOne)) {
        // support for app.get(url, ..., 'viewPath');
        const viewPath = path.join(app.baseDir, 'app', subAppName, 'view', lastOne);
        assert(fs.existsSync(viewPath), `${subAppName}/view/${lastOne} not exist`);
        app.router[method](...args, viewController(lastOne));
      } else {
        // support for app.get(url, ..., controller);
        app.router[method](...args, lastOne);
      }
    };
  });

  return routerApp;
}

function viewController(viewName) {
  return async function subAppController() {
    await this.render(viewName);
  };
}

function wrapMiddleware(mw, options) {
  // support options.enable
  if (options.enable === false) return null;

  // support generator function
  mw = utils.middleware(mw);

  // support options.match and options.ignore
  if (!options.match && !options.ignore) return mw;
  const match = pathMatching(options);

  const fn = (ctx, next) => {
    if (!match(ctx)) return next();
    return mw(ctx, next);
  };
  fn._name = mw._name + 'middlewareWrapper';
  return fn;
}
