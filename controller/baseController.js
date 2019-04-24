/**
 * 基础控制器
 * create By AHRL on 2019-4-22
 */
const _ = require('underscore')

module.exports = class {
  constructor (options) {
    let self = this
    if (options) {
      _.map(options, function (val, key) {
        self[key] = val
      })
    }
  }
}
