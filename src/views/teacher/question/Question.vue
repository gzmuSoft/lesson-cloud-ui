<template lang="pug">
  .question
    v-scroll-y-transition(hide-on-leave)
      course(v-if="course === null", ref="list")
        template(v-slot="{item}")
          v-tooltip(top)
            template(v-slot:activator="{ on }")
              v-btn.mr-2(icon, x-small, fab, color="success", v-on="on", @click="handleSee(item)")
                v-icon mdi-eye
            span {{$t('action.view')}}
      question-management(v-else)
</template>

<script>
import Course from '@/components/course'
import QuestionManagement from './QuestionManagement'
import teacherMixin from '@/views/teacher/teacherMixin'
export default {
  name: 'Question',
  components: { Course, QuestionManagement },
  mixins: [teacherMixin],
  data: () => ({
  }),
  methods: {
    handleSee (item) {
      this.setCourse(item)
    }
  }
}
</script>

<style scoped lang="stylus">

</style>
