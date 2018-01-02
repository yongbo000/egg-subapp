# egg-subapp

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![David deps][david-image]][david-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/egg-subapp.svg?style=flat-square
[npm-url]: https://npmjs.org/package/egg-subapp
[travis-image]: https://img.shields.io/travis/eggjs/egg-subapp.svg?style=flat-square
[travis-url]: https://travis-ci.org/eggjs/egg-subapp
[codecov-image]: https://img.shields.io/codecov/c/github/eggjs/egg-subapp.svg?style=flat-square
[codecov-url]: https://codecov.io/github/eggjs/egg-subapp?branch=master
[david-image]: https://img.shields.io/david/eggjs/egg-subapp.svg?style=flat-square
[david-url]: https://david-dm.org/eggjs/egg-subapp
[snyk-image]: https://snyk.io/test/npm/egg-subapp/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/egg-subapp
[download-image]: https://img.shields.io/npm/dm/egg-subapp.svg?style=flat-square
[download-url]: https://npmjs.org/package/egg-subapp

help you create multi-site applications quickly and easily

## 安装

```
npm i egg-subapp --save
```

## 依赖的插件

- view

## 开启插件

```js
// config/plugin.js
exports.subapp = {
  enable: true,
  package: 'egg-subapp',
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

## 详细配置

```
// config/config.default.js
exports.subApp = {
  virtualHosts: {
    // 自定义域名映射
    'custom-domain.com': 'demo.subapp.com',
  },
};
```

请到 [config/config.default.js](config/config.default.js) 查看详细配置项说明。

## License

[MIT](LICENSE)
