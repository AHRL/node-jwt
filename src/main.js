// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import store from './store'
import { Card, Form, FormItem, Input, Button } from 'element-ui'

Vue.config.productionTip = false
Vue.prototype.$axios = axios

// 设置http拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  config.url = 'http://127.0.0.1:8888' + config.url
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

Vue.use(Card)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Button)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
