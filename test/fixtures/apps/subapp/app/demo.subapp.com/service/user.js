'use strict';

const Service = require('egg').Service;

class UserService extends Service {
  findUser() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          name: 'jambo',
        });
      }, 500);
    });
  }
}

module.exports = UserService;
