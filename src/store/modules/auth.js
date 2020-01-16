const state = {
  accessToken: null,
  refreshToken: null,
  expiresIn: null,
  sub: null,
  userName: null,
  isTeacher: null,
  isStudent: null,
  authorities: null
}

const getters = {
  isAuth: state => state.accessToken !== null && state.refreshToken !== null && state.sub !== null,
  isStudent: state => state.isStudent,
  isTeacher: state => state.isTeacher,
  token: state => state.accessToken
}

const mutations = {
  SET_TOKEN (state, token) {
    state.accessToken = token.access_token
    state.refreshToken = token.refresh_token
    state.expiresIn = token.expires_in
    state.sub = token.sub
    state.isTeacher = token.is_teacher
    state.isStudent = token.is_student
    state.authorities = token.authorities
    state.userName = token.user_name
  },
  LOGOUT (state) {
    Object.keys(state).forEach(key => {
      state[key] = null
    })
  }
}

const actions = {
  oauthToken ({ commit }, token) {
    commit('SET_TOKEN', token)
  },
  logout ({ commit }) {
    commit('LOGOUT')
  }
}

export default {
  namespaced: true,
  getters,
  mutations,
  actions,
  state
}
