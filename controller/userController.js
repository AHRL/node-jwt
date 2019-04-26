/**
 * 用户相关操作
 * create By AHRL on 2019-4-22
 */

const baseController = require('./baseController')
const api = require('../tools/api')
const jwt = require('jsonwebtoken')

module.exports = class extends baseController {
  constructor (options) {
    super(options)

    this.login = async (ctx, next) => {
      const params = ctx.request.body
      let token = jwt.sign({
        code: params.password,
        date: new Date()
      }, 'token', { expiresIn: '1h' })
      const code = await api.getRedis(params.key)
      if (params.identityCode === code) {
        const isFind = await this.DBModel.User.findUser({ username: params.username })
        if (isFind.status === 'success') {
          if (isFind.data.length > 0) {
            if (isFind.data[0].password === api.md5(params.password + isFind.data[0].salt)) {
              const isUpdate = await this.DBModel.User.updateToken({ username: params.username }, { token: token })
              if (isUpdate.status === 'success') {
                const isFind = await this.DBModel.User.findUser({ username: params.username })
                ctx.body = { status: 200, msg: '验证成功', data: { username: isFind.data[0].username, token: isFind.data[0].token } }
              } else {
                ctx.body = { status: 500, msg: '操作失败' }
              }
            } else {
              ctx.body = { status: 402, msg: '密码错误' }
            }
          } else {
            ctx.body = { status: 401, msg: '用户名不存在' }
          }
        } else {
          ctx.body = { status: 500, msg: '服务器访问失败' }
        }
      } else {
        ctx.body = { status: 400, msg: '验证码错误' }
      }
    }

    // 注册
    this.register = async (ctx, option) => {
      console.log(this.DBModel)
      const params = ctx.request.body
      const isFind = await this.DBModel.User.findUser({ username: params.username })
      console.log('isFind', isFind)
      if (isFind.status === 'failed') {
        ctx.body = { status: 500, msg: '查询失败' }
      } else if (isFind.status === 'success' && !isFind.data.length) {
        const salt = api.md5(Date.now().toString()) + '-'
        const res = await this.DBModel.User.register({
          username: params.username,
          password: api.md5(params.password + salt),
          salt: salt
        })
        console.log('salt', salt)
        if (res.status === 'success') {
          ctx.body = { status: 200, msg: '注册成功，快去登录吧' }
        } else {
          ctx.body = { status: 500, msg: '注册失败，请重试' }
        }
      } else {
        ctx.body = { status: 400, msg: '该用户已存在' }
      }
    }

    // 请求测试
    this.request = async (ctx, option) => {
      const params = ctx.request.body
      try {
        jwt.verify(params.token, 'token')
        ctx.body = { status: 200, msg: '令牌未过期' }
      } catch (err) {
        ctx.body = { status: 401, msg: '令牌过期' }
      }
    }
  }
}
