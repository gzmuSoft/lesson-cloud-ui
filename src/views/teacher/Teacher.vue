<template lang="pug">
  #lesson-teacher
    v-navigation-drawer(v-model="drawer", app, clipped, dark, mobile-break-point="991")
      teacher-navigation
    v-content
      v-container
        teacher-top-bar(@changeDrawer="drawer = !drawer")
        v-scroll-y-reverse-transition
          router-view
</template>

<script>
import TeacherNavigation from './TeacherNavigation'
import TeacherTopBar from './TeacherTopBar'
export default {
  name: 'Teacher',
  components: { TeacherNavigation, TeacherTopBar },
  data: () => ({
    drawer: true,
    theme: true
  }),
  watch: {
  },
  created () {
    this.changeTheme()
    this.$store.dispatch('user/userInfo')
  },
  methods: {
    handleTheme () {
      this.$store.dispatch('base/changeTheme')
      this.changeTheme()
    },
    changeTheme () {
      this.$vuetify.theme.dark = this.$store.getters['base/theme']
      this.theme = this.$store.getters['base/theme']
    }
  }
}
</script>

<style scoped lang="stylus">

</style>
