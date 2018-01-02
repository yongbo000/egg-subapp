'use strict';

const fs = require('fs');
const path = require('path');
const is = require('is-type-of');
const globby = require('globby');
const utils = require('egg-core').utils;

const methods = utils.methods.concat([ 'all', 'resources', 'register', 'redirect' ]);

module.exports = app => {
  for (const subApp of app.subApps.values()) {
    // 推荐在 {subappname}/router/**/*.js 拆分路由
    const subAppRouterDir = path.join(subApp.baseDir, 'router');
    // 获取所有js文件
    let routerFilePaths = globby.sync([ '**/*.js' ], { cwd: subAppRouterDir }).map(filepath => {
      return path.join(subAppRouterDir, filepath);
    });

    // 默认router.js位置
    const routerJsFile = path.join(subApp.baseDir, 'router.js');
    // 支持 {subappname}/router.js 的默认写法
    routerFilePaths = [ routerJsFile ].concat(routerFilePaths);

    // 创建一个app实例
    const routerApp = createRouterApp(subApp, app);
    for (const fullpath of routerFilePaths) {
      if (fs.existsSync(fullpath) && fs.statSync(fullpath).isFile()) {
        // 加载路由
        require(fullpath)(routerApp);
      }
    }
  }
};

function createRouterApp(subApp, app) {
  const routerApp = {
    router: {},
    middleware: app.subAppMiddlewares[subApp.name],
    controller: app.controller[subApp.name],
  };
  methods.forEach(method => {
    routerApp[method] = routerApp.router[method] = function subAppRouter(...args) {
      const [ url, controller ] = args;
      const routerUrl = '/' + subApp.name + url;
      app.logger.info('[subApp:router] %s %s => %s', method.toUpperCase(), url, routerUrl);

      if (method === 'redirect') {
        args[0] = routerUrl;
        return app.router[method](...args);
      }

      if (is.string(controller)) {
        // support for app.get(url, 'viewPath');
        app.router[method](routerUrl, viewController(controller));
      } else {
        if (args.length > 2) {
          // get the arguments[1]...arguments[len - 2]
          const middlewares = args.slice(1, -1);
          // get the last arguments
          const lastOne = args[args.length - 1];

          if (is.string(lastOne)) {
            middlewares.push(viewController(lastOne));
            // support for app.get(url, middleware, ..., 'viewPath');
            app.router[method](routerUrl, ...middlewares);
          } else {
            // add last one to middlewares
            middlewares.push(lastOne);
            // support for app.get(url, middleware, ..., controller);
            app.router[method](routerUrl, ...middlewares);
          }
        } else {
          // support for app.get(url, controller);
          app.router[method](routerUrl, controller);
        }
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
