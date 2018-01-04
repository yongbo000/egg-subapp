'use strict';

module.exports = {
  getCookie(key, opts) {
    opts = Object.assign({
      signed: false,
    }, opts);
    return this.cookies.get(key, opts);
  },

  setCookie(key, value, opts) {
    opts = Object.assign({
      signed: false,
    }, opts);
    return this.cookies.set(key, value, opts);
  },

  get subAppService() {
    return this[this.subApp.name + '.subAppServices'];
  },
};
