'use strict';

module.exports = () => {
  return function* user(next) {
    if (!this.locals) {
      this.locals = {};
    }
    this.locals.name = 'jambo';
    yield next;
  };
};
