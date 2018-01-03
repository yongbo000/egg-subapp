'use strict';

const mock = require('egg-mock');

describe('test/subapp.test.js', () => {
  let app;
  before(() => {
    app = mock.app({
      baseDir: 'apps/subapp',
    });
    return app.ready();
  });

  after(() => {
    app.close();
  });

  afterEach(mock.restore);

  describe('middleware', () => {
    it('not find subapp, should return 404', () => {
      return app.httpRequest()
        .get('/indexAsync?__app=none.subapp.com')
        .expect('Redirecting to <a href="http://demo.subapp.com/404.html">http://demo.subapp.com/404.html</a>.')
        .expect(302);
    });

    it('no __app, should return 404', () => {
      return app.httpRequest()
        .get('/indexAsync')
        .expect('Redirecting to <a href="http://demo.subapp.com/404.html">http://demo.subapp.com/404.html</a>.')
        .expect(302);
    });

    it('get subappname from cookie', () => {
      return app.httpRequest()
        .get('/indexAsync')
        .set('Cookie', '__app=demo.subapp.com')
        .expect(/hi, jambo/)
        .expect(200);
    });

    it('get subappname from referer', () => {
      return app.httpRequest()
        .get('/indexAsync')
        .set('Referer', 'http://127.0.0.1?__app=demo.subapp.com')
        .expect(/hi, jambo/)
        .expect(200);
    });
  });

  describe('router', () => {
    it('redirect should work', () => {
      return app.httpRequest()
        .get('/redirect')
        .set('Cookie', '__app=demo.subapp.com')
        .expect('Redirecting to <a href="/">/</a>.')
        .expect(301);
    });

    it('support promise middleware', () => {
      return app.httpRequest()
        .get('/indexAsync?__app=demo.subapp.com')
        .expect(/hi, jambo/)
        .expect(200);
    });

    it('support generator middleware', () => {
      return app.httpRequest()
        .get('/indexGenerator?__app=demo.subapp.com')
        .expect(/hi, jambo/)
        .expect(200);
    });

    it('support for app.get(url, ..., viewPath)', () => {
      return app.httpRequest()
        .get('/index.html?__app=demo.subapp.com')
        .expect(/hi, jambo/)
        .expect(200);
    });
  });

  describe('service', () => {
    it('should ctx.subAppService.findUser work', () => {
      return app.httpRequest()
        .get('/findUser?__app=demo.subapp.com')
        .expect({
          name: 'jambo',
        })
        .expect(200);
    });
  });

  describe('virtualHosts should work', () => {
    it('virtualhost.subapp.com => demo.subapp.com', () => {
      return app.httpRequest()
        .get('/indexAsync?__app=virtualhost.subapp.com')
        .expect(/hi, jambo/)
        .expect(200);
    });
  });
});
