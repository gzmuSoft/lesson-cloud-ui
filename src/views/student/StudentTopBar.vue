<template lang="pug">
  v-system-bar#student-topbar(lights-out, fixed, app, window, dark)
    v-icon {{$t("base.welcome")}}, {{user.name}}
    v-spacer
    v-icon mdi-signal-cellular-outline
    v-icon mdi-battery
    span 12:30
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'StudentTopBar',
  data: () => ({
    //
  }),
  computed: {
    ...mapState('user', {
      user: 'user'
    })
  }
}
</script>

<style scoped lang="stylus">

</style>
