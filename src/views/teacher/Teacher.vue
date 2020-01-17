<template lang="pug">
  #lesson-teacher
    v-navigation-drawer(v-model="drawer", app, clipped, dark, mobile-break-point="991")
      teacher-navigation
    v-content
      v-container
        teacher-top-bar(@changeDrawer="drawer = !drawer")
        v-divider
        v-scroll-y-reverse-transition(hide-on-leave)
          router-view
</template>

<script>
import TeacherNavigation from './TeacherNavigation'
import TeacherTopBar from './TeacherTopBar'
import { initUser } from '@/plugins/baseMixin'

export default {
  name: 'Teacher',
  mixins: [initUser],
  components: { TeacherNavigation, TeacherTopBar },
  data: () => ({
    drawer: true
  }),
  watch: {
  },
  created () {
  },
  methods: {
    handleTheme () {
      this.$store.dispatch('base/changeTheme')
    }
  }
}
</script>

<style scoped lang="stylus">

</style>
