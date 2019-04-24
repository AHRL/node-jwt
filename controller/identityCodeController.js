/**
 * 验证码
 * create By AHRL on 2019-4-21
 */

const baseController = require('./baseController')
const api = require('../tools/api')

module.exports = class extends baseController {
  constructor (options) {
    super(options)

    // 获取并设置验证码
    this.getIdentityCode = async (ctx, next) => {
      let key = ctx.request.body.key
      const code = Math.random().toString(16).slice(2, 6)
      const expires = 60 * 60 * 24 // 验证码有效期为24小时
      let flag
      if (key) {
        flag = await api.setRedis(key, code, expires)
      } else {
        key = api.md5(Date.now().toString()) + '-' // 唯一标识
        flag = await api.setRedis(key, code, expires)
      }
      if (flag) {
        ctx.body = { status: 200, msg: '标识获取成功', data: {key: key, code: code} }
      } else {
        ctx.body = { status: 500, msg: '标识获取失败' }
      }
    }

    // 查找唯一标识对应验证码并对比是否验证正确
    this.findIdentityCode = async (ctx, next) => {
      const params = ctx.request.body
      const flag = await api.getRedis(params.key)
      if (flag === params.identityCode) {
        ctx.body = { status: 200, msg: '验证成功' }
      } else {
        ctx.body = {status: 400, msg: '验证码错误'}
      }
    }
  }
}
