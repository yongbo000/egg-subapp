'use strict';

module.exports = () => {
  return async function user(ctx, next) {
    if (!ctx.locals) {
      ctx.locals = {};
    }
    ctx.locals.name = 'jambo';
    await next();
  };
};
