const state = {
  course: null
}
const getters = {}

const mutations = {
  SET_COURSE (state, course) {
    state.course = course
  }
}

const actions = {
  setCourse ({ commit }, course) {
    commit('SET_COURSE', course)
  }
}

export default {
  namespaced: true,
  getters,
  mutations,
  actions,
  state
}
