/**
 * 基本信息
 * created By AHRL on 2019-4-19
 */

let info = {
	clientAddress: {
		host: 'localhost',
		port: 8080
	},
	serverAddress: {
		url: 'http://localhost:8888',
		host: 'localhost',
		port: 8888
	},
	mongodb: {
    url: 'mongodb://localhost:27017/node-jwt',
    host: 'localhost',
    port: 27017,
    db: 'node-jwt'
	},
	redis: {
    host: 'localhost',
    port: 6379,
    db: 7
  }
}
module.exports = info
