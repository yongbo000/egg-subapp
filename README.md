# egg-engine

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![David deps][david-image]][david-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/egg-engine.svg?style=flat-square
[npm-url]: https://npmjs.org/package/egg-engine
[travis-image]: https://img.shields.io/travis/eggjs/egg-engine.svg?style=flat-square
[travis-url]: https://travis-ci.org/eggjs/egg-engine
[codecov-image]: https://img.shields.io/codecov/c/github/eggjs/egg-engine.svg?style=flat-square
[codecov-url]: https://codecov.io/github/eggjs/egg-engine?branch=master
[david-image]: https://img.shields.io/david/eggjs/egg-engine.svg?style=flat-square
[david-url]: https://david-dm.org/eggjs/egg-engine
[snyk-image]: https://snyk.io/test/npm/egg-engine/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/egg-engine
[download-image]: https://img.shields.io/npm/dm/egg-engine.svg?style=flat-square
[download-url]: https://npmjs.org/package/egg-engine

help you create multi-site applications quickly and easily

## 安装

```
npm i egg-engine --save
```

## 依赖的插件

- view
- nunjucks

## 开启插件

```js
// config/plugin.js
exports.subapp = {
  enable: true,
  package: 'egg-engine',
};
```

## 使用说明

站点目录结构约定

```
app
 |- demo.subapp.com
    |- controller
    |- middleware
    |- service
    |- router
       |- index.js
       |- book.js
       |- ...
 |- demo2.subapp.com
    |- ...
```

> 各个站点的环境是隔离的，每个站点里定义的controller、middleware、service仅能被本站点的使用。

`controller、middleware的引用与egg里使用无异`，需要注意的是在controller里对service的使用，如下

```
class HomeController extends Controller {
  async findUser() {
    const { ctx } = this;
    // 通过ctx.subAppService获取到service上的实例
    ctx.body = await ctx.subAppService.user.findUser();
  }
}
```

## 详细配置

```
// config/config.default.js
exports.subApp = {
  virtualHosts: {
    // 自定义域名映射
    'custom-domain.com': 'demo.subapp.com',
  },
  middleware: {
    // 配置单个站点的全局前置中间件
    // 'demo.subapp.com': [ needLogin, ... ],
  },
};
```

请到 [config/config.default.js](config/config.default.js) 查看详细配置项说明。

## License

[MIT](LICENSE)
