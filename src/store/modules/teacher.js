const state = {
  course: null,
  question: null
}
const getters = {}

const mutations = {
  SET_COURSE (state, course) {
    state.course = course
  },
  SET_QUESTION (state, question) {
    state.question = question
  }
}

const actions = {
  setCourse ({ commit }, course) {
    commit('SET_COURSE', course)
  },
  setQuestion ({ commit }, question) {
    commit('SET_QUESTION', question)
  }
}

export default {
  namespaced: true,
  getters,
  mutations,
  actions,
  state
}
