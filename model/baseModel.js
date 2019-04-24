/**
 * 集成全部model
 * create By AHRL on 2019-4-22
 */

const User = require('./userModel')

module.exports = class {
  constructor (mongoose) {
    this.User = new (User)(mongoose)
  }
}
