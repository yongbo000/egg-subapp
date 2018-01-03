'use strict';

exports.keys = '123456';

exports.subApp = {
  virtualHosts: {
    'virtualhost.subapp.com': 'demo.subapp.com',
  },
};

exports.notfound = {
  pageUrl: 'http://demo.subapp.com/404.html',
};
