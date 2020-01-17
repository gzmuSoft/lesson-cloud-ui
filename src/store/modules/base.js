import i18n from '@/locales/i18n'
import vuetify from '@/plugins/vuetify'

const state = {
  theme: false,
  locale: 'zh'
}

const getters = {
  theme: state => state.theme,
  isZh: state => state.locale === 'zh'
}

const mutations = {
  SET_THEME (state) {
    state.theme = !state.theme
  },
  SET_LOCALE (state) {
    state.locale = state.locale === 'zh' ? 'en' : 'zh'
  }
}

const actions = {
  changeTheme ({ commit }) {
    commit('SET_THEME')
    vuetify.framework.theme.dark = !vuetify.framework.theme.dark
  },
  changeLocale ({ commit }) {
    commit('SET_LOCALE')
    i18n.locale = i18n.locale === 'zh' ? 'en' : 'zh'
    vuetify.framework.lang.current = i18n.locale
  }
}

export default {
  namespaced: true,
  getters,
  mutations,
  actions,
  state
}
