<template lang="pug">
  v-navigation-drawer#student-nav(v-model="drawer", fixed, height="640px", temporary)
    v-row.fill-height(no-gutters)
      v-navigation-drawer(v-model="drawer", mini-variant, mini-variant-width="56", dark)
        v-tooltip(right)
          template(v-slot:activator="{ on }")
            v-list-item(v-on="on")
              v-list-item-avatar
                v-img(:src="user.avatar")
          span 个人设置
        v-divider
        v-list-item(link)
          v-icon mdi-all-inclusive
        v-list-item(link)
          v-icon mdi-spin mdi-settings
        template(v-slot:append)
          v-tooltip(right)
            template(v-slot:activator="{ on }")
              v-list-item(link, @click="handleLogout", v-on="on")
                v-icon mdi-exit-to-app
            span 退出登录
      v-list.grow
        v-list-item(link)
          v-list-item-title home
        v-list-item(link)
          v-list-item-title home
        v-list-item(link)
          v-list-item-title home

</template>

<script>
import { logoutUrl } from '@/api/oauth'
import { mapState } from 'vuex'

export default {
  name: 'StudentNavigation',
  data: () => ({
    drawer: false
  }),
  computed: {
    ...mapState('user', {
      user: 'user'
    })
  },
  methods: {
    handleLogout () {
      logoutUrl()
    }
  }
}
</script>

<style scoped lang="stylus">
  #student-nav
    top auto !important
    bottom  0 !important
    margin-bottom 64px
    min-width 360px
</style>
