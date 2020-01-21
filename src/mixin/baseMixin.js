import { mapActions, mapState } from 'vuex'
import i18n from '@/locales/i18n'
import vuetify from '@/plugins/vuetify'
import { authMenu } from '@/api/auth'

export const initApplication = {
  created () {
    i18n.locale = this.locale
    vuetify.framework.lang.current = this.locale
    vuetify.framework.theme.dark = this.theme
  },
  computed: {
    ...mapState('base', {
      locale: 'locale',
      theme: 'theme'
    })
  }
}

export const initUser = {
  async created () {
    await this.initUser()
  },
  methods: {
    ...mapActions('user', {
      initUser: 'userInfo'
    })
  }
}

export const initMenu = {
  data: () => ({
    menus: []
  }),
  created () {
    authMenu().then(res => { this.menus = res.data })
  }
}

export const baseMethods = {
  methods: {
    ...mapActions('base', {
      handleLocale: 'changeLocale',
      handleTheme: 'changeTheme'
    })
  }
}
