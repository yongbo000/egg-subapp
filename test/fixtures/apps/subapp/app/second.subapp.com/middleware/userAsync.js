'use strict';

module.exports = () => {
  return async function user(ctx, next) {
    ctx.user = {
      name: 'jambo',
    };
    if (!ctx.locals) {
      ctx.locals = {};
    }
    ctx.locals.name = 'jambo';
    await next();
  };
};
