<template lang="pug">
  .student-course
    v-data-iterator(:items="items.table", :headers="headers", :options.sync="options",
      :server-items-length="itemsLength", :footer-props="footer", :loading="loading.table")
      template(v-slot:header)
        v-toolbar.mb-3.blue.darken-3
          v-select(v-model="semester", flat, hide-details, :loading="loading.semester", item-text="name",
            semesters, prepend-inner-icon="mdi-magnify", :label="$t('tip.semester.select')", :items="items.semester",
            item-value="id", solo-inverted, dark, chips, @change="handleChange")
      template(v-slot:default="props")
        v-row
          v-col(v-for="item in props.items", :key="item.key", cols="12", sm="6", md="4", lg="3")
            v-card
              v-card-title
                .subheading.font-weight-bold(:class="item.standard?'blue--text':'red--text'") {{item.courseName}}
              v-divider
              v-list(dense)
                v-list-item(v-for="(key, index) in headers", :key="index")
                  v-list-item-content  {{key.text}}
                  v-list-item-content.align-end {{item[key.value]}}

</template>

<script>
import { semesterAll } from '@/api/semester'
import pageMixin from '@/mixin/pageMixin'
import { studentCourseBySemester } from '@/api/student'
import { mapGetters } from 'vuex'

export default {
  name: 'Course',
  mixins: [pageMixin],
  data: function () {
    return {
      headers: [
        { text: this.$i18n.t('semester.courseName'), align: 'left', value: 'courseName' },
        { text: this.$i18n.t('semester.className'), align: 'left', value: 'className' },
        { text: this.$i18n.t('course.type'), align: 'left', value: 'courseType' },
        { text: this.$i18n.t('course.period'), align: 'left', value: 'period' },
        { text: this.$i18n.t('course.credit'), align: 'left', value: 'credit' }
      ],
      items: { semester: [], table: [] },
      semester: [],
      loading: { table: false, semester: false }
    }
  },
  computed: {
    ...mapGetters('user', [
      'studentClass'
    ])
  },
  created () {
    this.loading.semester = true
    semesterAll()
      .then(res => { this.items.semester = res.data })
      .finally(() => { this.loading.semester = false })
  },
  watch: {
    options (val) {
    }
  },
  methods: {
    handleChange (val) {
      this.loading.table = true
      studentCourseBySemester(val)
        .then(res => {
          this.items.table = []
          res.data.content.forEach(r => {
            const name = r.name.split('_')
            r.className = name[0]
            r.courseName = name[1]
            r.key = r.id + r.name
            r.standard = r.classesId === this.studentClass
            this.items.table.push(r)
          })
          this.itemsLength = res.data.totalElements
        }).finally(() => { this.loading.table = false })
    }
  }
}
</script>

<style scoped lang="stylus">

</style>
