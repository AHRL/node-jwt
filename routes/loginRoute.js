/**
 * 登录注册路由
 * create By AHRL on 2019-4-22
 */

const UserController = require('../controller/userController')
const IdentityController = require('../controller/identityCodeController')

module.exports = function (koaRouter, options) {
  const identityCode = new IdentityController(options)
  const userController = new UserController(options)

  koaRouter.post('/login', userController.login, identityCode.getIdentityCode)
  koaRouter.post('/register', userController.register)
}
