'use strict';

module.exports = app => {
  const { router, controller, middleware } = app;
  router.get('/indexAsync', middleware.userAsync(), controller.home.indexAsync);
  router.get('/index.html', middleware.userAsync(), 'index.html');
  router.get('/findUser', controller.home.findUser);
};
