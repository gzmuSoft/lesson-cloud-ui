<template lang="pug">
  v-row.px-3#teacher-topbar
    v-app-bar-nav-icon(@click.stop="changeDrawer")
    v-spacer
    v-tooltip(bottom)
      template(v-slot:activator="{ on }")
        v-btn.mr-2(text, icon, v-on="on", @click="handleTheme")
          v-icon mdi-theme-light-dark
      span {{$t("app.changeTheme")}}
    v-tooltip(bottom)
      template(v-slot:activator="{ on }")
        v-btn.mr-2(text, icon, v-on="on", @click="handleLocale")
          v-icon mdi-all-inclusive
      span {{$t("app.language")}}
    v-tooltip(bottom)
      template(v-slot:activator="{ on }")
        v-btn.mr-2(text, icon, v-on="on")
          v-icon mdi-spin mdi-settings
      span {{$t("base.appSetting")}}
    v-tooltip(bottom)
      template(v-slot:activator="{ on }")
        v-btn(text, icon, v-on="on", @click="handleLogout")
          v-icon mdi-power
      span {{$t("base.logout")}}

</template>

<script>
import { logoutUrl } from '@/api/oauth'
import { baseMethods } from '@/mixin/baseMixin'

export default {
  name: 'TeacherTopBar',
  mixins: [baseMethods],
  data: () => ({
    //
  }),
  methods: {
    changeDrawer () {
      this.$emit('changeDrawer')
    },
    handleLogout () {
      logoutUrl()
    }
  }
}
</script>

<style scoped lang="stylus">

</style>
