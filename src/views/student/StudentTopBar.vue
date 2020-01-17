<template lang="pug">
  v-system-bar#student-topbar(lights-out, fixed, app, window, dark)
    span {{$t("base.welcome")}}, {{user.name}}
    v-spacer
    v-icon mdi-signal-cellular-outline
    v-icon mdi-battery
    span {{now}}
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'StudentTopBar',
  data: () => ({
    now: ''
  }),
  created () {
    setInterval(() => {
      this.now = this.nowTime()
    }, 1000)
  },
  computed: {
    ...mapState('user', {
      user: 'user'
    })
  },
  methods: {
    nowTime () {
      const date = new Date()
      return `${this.check(date.getHours())}:${this.check(date.getMinutes())}:${this.check(date.getSeconds())}`
    },
    check (i) {
      return (i < 10) ? ('0' + i) : i
    }
  }
}
</script>

<style scoped lang="stylus">

</style>
