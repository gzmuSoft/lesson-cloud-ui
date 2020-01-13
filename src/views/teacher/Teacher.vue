<template lang="pug">
  #lesson-teacher
    teacher-navigation(:drawer="drawer")
    v-content
      v-container
        v-row.px-3
          span.title.grey--text Dash
          v-spacer
          v-icon mdi-close
        v-scroll-y-reverse-transition
          router-view
</template>

<script>
import TeacherNavigation from './TeacherNavigation'
export default {
  name: 'Teacher',
  components: {
    TeacherNavigation
  },
  data: () => ({
    drawer: true
  })
}
</script>

<style scoped lang="stylus">

</style>
