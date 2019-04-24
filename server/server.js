/**
 * node后台服务
 * create By AHRL on 2019-4-22
 */

const Koa = require('koa2')
const cors = require('kcors')
const app = new Koa()
const path = require('path')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const mongodb = require('../config/db')()
const DBModel = new (require('../model/baseModel'))(mongodb)
const router = require('../routes/baseRoute')({ DBModel: DBModel })
const info = require('../config/info')
const convert = require('koa-convert')
const koaStatic = require('koa-static')

// 服务端口
process.env.PORT = info.serverAddress.port || 3000

// error handler
onerror(app)

// 请求体设置
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text'], // 请求类型
  jsonLimit: '5mb',
  formLimit: '4096kb'
}))

app.use(cors()) // 允许跨域
app.use(json())
app.use(logger())

// 由于koa-static目前不支持koa2，所以只能用koa-convert封装一下
app.use(convert(koaStatic(
  path.join(__dirname, `../dist`)
)))

// 启动的日志
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// 路由入口
app.use(router.routes(), router.allowedMethods())
app.listen(process.env.PORT, () => {
  console.log(`the server is start at port ${process.env.PORT}`)
})
