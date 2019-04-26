import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Success from '@/components/Success'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    }, {
      path: '/success',
      name: 'Success',
      component: Success
    }
  ]
})
