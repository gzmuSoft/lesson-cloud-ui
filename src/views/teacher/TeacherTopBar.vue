<template lang="pug">
  v-row.px-3#teacher-topbar
    v-app-bar-nav-icon(@click.stop="changeDrawer")
    v-spacer
    v-btn(text, icon, @click="handleLogout")
      v-icon mdi-power

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
