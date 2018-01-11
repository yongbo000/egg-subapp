'use strict';

exports.keys = '123456';

exports.subApp = {
  virtualHosts: {
    'virtualhost.subapp.com': 'demo.subapp.com',
  },
  middleware: {
    'demo.subapp.com': [ 'globalMw', 'disabledMw' ],
  },
};

exports.globalMw = {
  header: 'x-response-time',
  ignore: /indexAsync/i,
};

exports.disabledMw = {
  enable: false,
};

exports.notfound = {
  pageUrl: 'http://demo.subapp.com/404.html',
};
