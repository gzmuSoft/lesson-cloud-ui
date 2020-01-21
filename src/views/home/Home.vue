<template lang="pug">
  v-card#lesson-index
    v-app-bar(absolute, color="rgba(250, 250, 250, 0.87)", elevate-on-scroll, scroll-target="#scrolling-techniques")
      v-toolbar-title {{$t("app.name")}}
      v-spacer
      v-btn(text) {{$t("app.language")}}
      v-btn(text) {{$t("app.home")}}
      v-btn(text) {{$t("app.about")}}
      v-btn(text, @click="start") {{$t("start")}}
    v-img
</template>

<script>
import { mapGetters } from 'vuex'
import { authServer } from '@/api/oauth'
export default {
  name: 'Index',
  data: () => ({
    //
  }),
  computed: {
    ...mapGetters('auth', [
      'isStudent', 'isTeacher', 'isAuth'
    ])
  },
  methods: {
    start () {
      if (!this.isAuth) {
        authServer()
      } else if (this.isStudent) {
        this.$router.push({ name: 'student' })
      } else if (this.isTeacher) {
        this.$router.push({ name: 'teacher' })
      }
    }
  }
}
</script>

<style scoped lang="stylus">

</style>
