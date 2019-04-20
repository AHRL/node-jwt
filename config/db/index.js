/**
 * mongodb配置属性
 * author: AHRL
 * time: 2019-4-19
 */

const mongoose = require('mongoose')
const config = require('../info')

module.exports = function (config) {
  mongoose.promise = global.promise
  mongoose.connect = config.mongodb.url

  mongoose.connection.on('connected', function () {
    console.log('连接mongoose成功')
  })

  mongoose.connection.on('error', function (err) {
    console.log(`mongoose连接异常，错误为${err}`)
  })

  mongoose.connection.on('disconnected', function () {
    console.log('连接mongoose断开')
  })

  return mongoose
}
