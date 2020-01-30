<template lang="pug">
  table-card#exam-management
    template(v-slot:title)
      v-tooltip(bottom)
        template(v-slot:activator="{ on }")
          v-btn(icon, v-on="on", @click="setCourse(null)")
            v-icon mdi-keyboard-backspace
        span {{$t('action.back')}}
      v-spacer
      v-tooltip(bottom)
        template(v-slot:activator="{ on }")
          v-btn(icon, v-on="on", @click="init")
            v-icon mdi-refresh
        span {{$t('action.refresh')}}
    v-btn(outlined, @click="handleNew") {{$t('action.newExam')}}
</template>

<script>
import TableCard from '@/components/table-card'
import teacherMixin from '@/views/teacher/teacherMixin'
import pageMixin from '@/mixin/pageMixin'

export default {
  name: 'ExamManagement',
  components: { TableCard },
  mixins: [teacherMixin, pageMixin],
  data: () => ({
    //
  }),
  methods: {
    init () {},
    handleNew () {}
  }
}
</script>

<style scoped lang="stylus">

</style>
