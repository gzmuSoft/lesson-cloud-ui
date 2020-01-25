import { authMe } from '@/api/auth'

const state = {
  user: null,
  student: null,
  teacher: null
}

const getters = {
  studentClass: state => state.student.classesId
}

const mutations = {
  AUTH_ME (state, me) {
    state.user = me.user
    if (me.isStudent) state.student = me.student
    else if (me.isTeacher) state.teacher = me.teacher
  },
  INIT_ME (state) {
    Object.keys(state).forEach(key => {
      state[key] = null
    })
  }
}

const actions = {
  userInfo ({ commit, dispatch }) {
    authMe().then(res => {
      commit('AUTH_ME', res.data)
      if (res.data.refresh) dispatch('auth/refreshToken', {}, { root: true })
    })
  },
  initUser ({ commit }) {
    commit('INIT_ME')
  }
}

export default {
  namespaced: true,
  getters,
  mutations,
  actions,
  state
}
