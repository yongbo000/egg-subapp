'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async indexAsync() {
    const { ctx } = this;
    await ctx.render('index.html');
  }

  * indexGenerator() {
    const { ctx } = this;
    yield ctx.render('index.html');
  }

  async findUser() {
    const { ctx } = this;
    ctx.body = await ctx.subAppService.user.findUser();
  }
}

module.exports = HomeController;
