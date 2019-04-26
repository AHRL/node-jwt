import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    username: '',
    token: null
  },
  mutations: {
    LOGIN_IN (state, data) {
      state.username = data.username
      state.token = data.token
    },
    LOGIN_OUT (state) {
      state.username = ''
      state.token = ''
    }
  }
})
