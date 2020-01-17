<template lang="pug">
  v-row.px-3#teacher-topbar
    v-app-bar-nav-icon(@click.stop="changeDrawer")
    v-spacer
    v-tooltip(bottom)
      template(v-slot:activator="{ on }")
        v-btn(text, icon, v-on="on", @click="handleLogout")
          v-icon mdi-power
      span {{$t("base.logout")}}

</template>

<script>
import { logoutUrl } from '@/api/oauth'

export default {
  name: 'TeacherTopBar',
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
