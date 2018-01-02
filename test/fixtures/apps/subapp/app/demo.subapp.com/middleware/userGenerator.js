'use strict';

module.exports = () => {
  return function* user(next) {
    this.user = {
      name: 'jambo',
    };
    if (!this.locals) {
      this.locals = {};
    }
    this.locals.name = 'jambo';
    yield next;
  };
};
