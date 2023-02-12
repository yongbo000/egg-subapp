'use strict';

module.exports = options => {
  return async function global(ctx, next) {
    const start = Date.now();
    await next();
    ctx.set(options.header, Date.now() - start);
  };
};
