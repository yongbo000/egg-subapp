'use strict';

const mock = require('egg-mock');

describe('test/subapp.test.js', () => {
  let app;
  before(done => {
    app = mock.app({
      baseDir: 'apps/subapp',
    });
    app.ready(done);
  });

  after(() => {
    app.close();
  });

  afterEach(mock.restore);

  describe('router', () => {
    it('support promise middleware', done => {
      app.httpRequest()
        .get('/indexAsync?__app=demo.subapp.com')
        .expect(/hi, jambo/)
        .expect(200, done);
    });

    it('support generator middleware', done => {
      app.httpRequest()
        .get('/indexGenerator?__app=demo.subapp.com')
        .expect(/hi, jambo/)
        .expect(200, done);
    });

    it('support for app.get(url, middleware, ..., viewPath)', done => {
      app.httpRequest()
        .get('/index.html?__app=demo.subapp.com')
        .expect(/hi, jambo/)
        .expect(200, done);
    });
  });

  describe('service', () => {
    it('should ctx.subAppService.findUser work', done => {
      app.httpRequest()
        .get('/findUser?__app=demo.subapp.com')
        .expect({
          name: 'jambo',
        })
        .expect(200, done);
    });
  });

  describe('virtualHosts should work', () => {
    it('virtualhost.subapp.com => demo.subapp.com', done => {
      app.httpRequest()
        .get('/indexAsync?__app=virtualhost.subapp.com')
        .expect(/hi, jambo/)
        .expect(200, done);
    });
  });
});
