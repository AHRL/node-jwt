/**
 * 工具函数
 * create By AHRL on 2019-4-21
 */

const info = require('../config/info')
const redis = require('redis')
const crypto = require('crypto') // node内置模块加密

const api = {
  /**
   * 获取redis
   *
   * @param {*} auth 字段
   */
  async getRedis (auth) {
    const config = {
      host: info.redis.host,
      port: info.redis.port,
      db: info.redis.db
    }

    // 创建redis连接
    const client = redis.createClient(config)
    return new Promise((resolve, reject) => {
      // 从redis获取数据
      client.get(auth, function (err, reply) {
        if (err) {
          reject(new Error())
        } else {
          resolve(JSON.parse(reply))
        }
      })
    })
  },
  /**
   * 设置redis
   *
   * @param {*} auth 字段
   * @param {*} str 值
   * @param {*} expires 过期时间
   */
  async setRedis (auth, str, expires) {
    const config = {
      host: info.redis.host,
      port: info.redis.port,
      db: info.redis.db
    }

    // 创建redis连接
    const client = redis.createClient(config)
    return new Promise((resolve, reject) => {
      // 保存数据到redis
      client.set(auth, JSON.stringify(str), 'EX', expires, function (err) {
        if (err) {
          reject(new Error())
        } else {
          resolve(true)
        }
      })
    })
  },

  md5 (str, encoding) {
    return crypto
      .createHash('md5') // 指定hash算法
      .update(str) // 使用编码更新字符串，默认为utf-8
      .digest(encoding || 'hex') // 加密字符串
  }
}

module.exports = api
