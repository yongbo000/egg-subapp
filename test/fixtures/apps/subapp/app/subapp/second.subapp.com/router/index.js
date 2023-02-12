'use strict';

module.exports = app => {
  const { router, controller, middleware } = app;
  router.get('/indexAsync', middleware.userAsync(), controller.home.indexAsync);
  router.get('/findUser.json', controller.home.findUser);
};
