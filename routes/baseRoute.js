/**
 * 路由模块
 * create By AHRL on 2019-4-21
 */

const router = require('koa-router')()

const loginRouter = require('./loginRoute')
const identityCodeRoute = require('./identityCodeRoute')

module.exports = function (options) {
  loginRouter(router, options)
  identityCodeRoute(router, options)
  return router
}
