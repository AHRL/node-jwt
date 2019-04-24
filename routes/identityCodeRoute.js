/**
 * 验证码路由
 * create By AHRL on 2019-4-21
 */

const IdentityCodeController = require('../controller/identityCodeController')

module.exports = function (koaRouter, options) {
  // get请求

  const identityCode = new IdentityCodeController(options)
  koaRouter.post('/getIdentityCode', identityCode.getIdentityCode)
}
