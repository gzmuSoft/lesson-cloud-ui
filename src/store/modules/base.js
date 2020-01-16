const state = {
  theme: false
}

const getters = {
  theme: state => {
    return state.theme
  }
}

const mutations = {
  SET_THEME (state) {
    state.theme = !state.theme
  }
}

const actions = {
  changeTheme ({ commit }) {
    commit('SET_THEME')
  }
}

export default {
  namespaced: true,
  getters,
  mutations,
  actions,
  state
}
