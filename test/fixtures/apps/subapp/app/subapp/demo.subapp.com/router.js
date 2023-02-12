'use strict';

module.exports = app => {
  const { middleware } = app;
  app.get('/indexGenerator', middleware.userGenerator(), app.controller.home.indexGenerator);
  app.redirect('/redirect', '/', 301);
};
