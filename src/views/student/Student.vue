<template lang="pug">
  #lesson-home
    student-navigation(ref="drawer")
    student-top-bar
    v-app-bar.white--text(app, :collapse="true", clipped-left, fixed, color="primary", bottom, max-width="60px")
      v-app-bar-nav-icon(color="white", @click="handleDrawer")
    v-scroll-y-reverse-transition
      v-container
        router-view.mt-9

</template>

<script>
import StudentNavigation from './StudentNavigation'
import StudentTopBar from './StudentTopBar'
import { mapState } from 'vuex'
import { initUser } from '@/plugins/baseMixin'

export default {
  name: 'Student',
  mixins: [initUser],
  components: {
    StudentNavigation,
    StudentTopBar
  },
  data: () => ({
  }),
  created () {
  },
  computed: {
    ...mapState('user', {
      student: 'student'
    })
  },
  methods: {
    handleDrawer () {
      this.$refs.drawer.drawer = !this.$refs.drawer.drawer
    }
  }
}
</script>
