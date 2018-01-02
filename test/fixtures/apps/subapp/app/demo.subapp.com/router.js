'use strict';

module.exports = app => {
  const { middleware } = app;
  app.get('/indexGenerator', middleware.userGenerator(), app.controller.home.indexGenerator);
};
