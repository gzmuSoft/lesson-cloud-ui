import Vue from 'vue'
import base from './modules/base'
import auth from './modules/auth'
import user from './modules/user'
import teacher from './modules/teacher'
import createVuexAlong from 'vuex-along'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    base, auth, user, teacher
  },
  plugins: [
    createVuexAlong({
      name: 'lesson-cloud', // 设置保存的集合名字，避免同站点下的多项目数据冲突
      local: {
        list: ['base', 'auth', 'user']
      }
    })
  ]
})
