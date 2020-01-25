<template lang="pug">
  v-navigation-drawer#student-nav(v-model="drawer", fixed, height="640px", temporary)
    v-row.fill-height(no-gutters)
      v-navigation-drawer(v-model="drawer", mini-variant, mini-variant-width="56", dark)
        v-tooltip(right)
          template(v-slot:activator="{ on }")
            v-list-item(v-on="on", style="padding-left: 8px;")
              v-list-item-avatar
                v-img(:src="user.avatar")
          span {{$t("base.personalSetting")}}
        v-divider
        v-tooltip(right)
          template(v-slot:activator="{ on }")
            v-list-item(link, v-on="on", @click="handleTheme")
              v-icon mdi-theme-light-dark
          span {{$t("app.changeTheme")}}
        v-tooltip(right)
          template(v-slot:activator="{ on }")
            v-list-item(link, v-on="on", @click="handleLocale")
              v-icon mdi-all-inclusive
          span {{$t("app.language")}}
        v-tooltip(right)
          template(v-slot:activator="{ on }")
            v-list-item(link, v-on="on")
              v-icon mdi-spin mdi-settings
          span {{$t("base.appSetting")}}
        template(v-slot:append)
          v-tooltip(right)
            template(v-slot:activator="{ on }")
              v-list-item(link, @click="handleLogout", v-on="on")
                v-icon mdi-exit-to-app
            span {{$t("base.logout")}}
      v-list.grow
        v-list-item(v-for="menu in menus", link, :key="menu.id", :to="{name : menu.routeName}")
          v-list-item-action
            v-icon {{menu.icon}}
          v-list-item-content
            v-list-item-title {{$t(menu.name)}}

</template>

<script>
import { logoutUrl } from '@/api/oauth'
import { initMenu, baseMethods } from '@/mixin/baseMixin'
import { mapState } from 'vuex'

export default {
  name: 'StudentNavigation',
  mixins: [initMenu, baseMethods],
  data: () => ({
    drawer: false
  }),
  computed: {
    ...mapState('user', { user: 'user' })
  },
  created () {
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
  @media screen and (max-width: 640px)
    height 100% !important
    margin-bottom 0 !important
</style>
