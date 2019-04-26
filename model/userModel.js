/**
 * 用户相关数据库操作
 * create By AHRL on 2019-4-21
 */

module.exports = class {
  constructor (mongoose) {
    const Schema = mongoose.Schema
    const userSchema = new Schema({
      username: String, // 用户名
      password: String, // 密码
      token: String, // token值
      salt: String // 密钥
    })

    const User = mongoose.model('User', userSchema)

    // 注册
    this.register = function (moduleObj) {
      return new Promise((resolve, reject) => {
        const userObj = new User({
          ...moduleObj,
          token: ''
        })
        userObj.save((err, data) => {
          if (err) {
            reject(new Error({state: 'failed', msg: '注册失败，请重试', data: err}))
          } else {
            resolve({status: 'success', msg: '注册成功，现在去登录吧', data: data})
          }
        })
      })
    }

    // 查找用户
    this.findUser = function (option) {
      return new Promise((resolve, reject) => {
        User.find(option, function (err, data) {
          if (err) {
            reject(new Error({ status: 'failed', msg: '查询失败', data: err }))
          } else {
            resolve({ status: 'success', msg: '查询成功', data: data })
          }
        })
      })
    }

    // 更新用户token
    this.updateToken = function (query, update) {
      return new Promise((resolve, reject) => {
        User.update(query, {$set: update}, function (err, data) {
          if (err) {
            reject(new Error({ status: 'failed', msg: '更新失败', data: err }))
          } else {
            resolve({ status: 'success', msg: '更新成功', data: data })
          }
        })
      })
    }
  }
}
