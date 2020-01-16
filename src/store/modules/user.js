import { authMe } from '@/api/auth'

const state = {
  user: null,
  student: null,
  teacher: null
}

const getters = {
}

const mutations = {
  AUTH_ME (state, me) {
    console.log(me)
    state.user = me.user
    if (me.isStudent) state.student = me.student
    else if (me.isTeacher) state.teacher = me.teacher
  }
}

const actions = {
  userInfo ({ commit }) {
    authMe().then(res => {
      commit('AUTH_ME', res.data)
    })
  }
}

export default {
  namespaced: true,
  getters,
  mutations,
  actions,
  state
}
