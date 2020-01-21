<template lang="pug">
  #teacher-course
    course-edit(:item="course", ref="edit", @save="handleSave")
    v-scroll-y-transition(hide-on-leave)
      course-list(v-if="course === null", ref="list")
        template(v-slot:action)
          v-btn(color="secondary", outlined, @click="handleAdd") {{$t('action.add')}}
        template(v-slot="{item}")
          v-tooltip(top)
            template(v-slot:activator="{ on }")
              v-btn.mr-2(icon, x-small, fab, color="success", v-on="on", @click="handleSee(item)")
                v-icon mdi-eye
            span {{$t('action.view')}}
          v-tooltip(top)
            template(v-slot:activator="{ on }")
              v-btn.mr-2(icon, x-small, fab, color="info", v-on="on", @click="handleEdit(item)")
                v-icon mdi-pencil
            span {{$t('action.edit')}}
          v-tooltip(top)
            template(v-slot:activator="{ on }")
              v-btn.mr-2(icon, x-small, fab, color="error", v-on="on", @click="handleDelete(item)")
                v-icon mdi-delete
            span {{$t('action.delete')}}
      course-management(v-else, :course="course", @back="course = null")

</template>

<script>
import Course from '@/components/course/Course'
import CourseManagement from '@/components/course/management'
import CourseEdit from '@/components/course/edit'
import * as restApi from '@/api/rest'

export default {
  name: 'Course',
  components: { CourseList: Course, CourseManagement, CourseEdit },
  data: () => ({
    course: null
  }),
  methods: {
    handleSee (item) {
      this.course = this._.cloneDeep(item)
    },
    handleEdit (item) {
      this.$refs.edit.dialog = true
      this.$refs.edit.item = item
    },
    handleAdd () {
      this.$refs.edit.dialog = true
      this.$refs.edit.item = null
    },
    handleSave (item) {
      this.$refs.edit.loading = true
      if (item.id !== 0) {
        restApi.patchOne('course', item.id, {
          name: item.name,
          type: item.type,
          period: item.period,
          credit: item.credit,
          sort: item.sort,
          remark: item.remark
        }).then(res => {
          this.$toast(this.$i18n.t('tip.action.success'), { type: 'success' })
          this.changeTable(res.data)
        }).finally(() => { this.$refs.edit.loading = false })
      } else {
        item.id = null
        restApi.addOne('course', item)
          .then(res => {
            this.$toast(this.$i18n.t('tip.action.success'), { type: 'success' })
            this.changeTable(res.data)
          }).finally(() => { this.$refs.edit.loading = false })
      }
    },
    handleDelete (item) {
      this.$confirm({}, () => {
        this.$refs.edit.loading = true
        restApi.deleteOne('course', item.id)
          .then(() => {
            this.$toast(this.$i18n.t('tip.action.success'), { type: 'success' })
            this.$refs.list.handleQuery()
          }).finally(() => { this.$refs.edit.loading = false })
      })
    },
    changeTable (data) {
      const find = this._.find(this.$refs.list.courses, { id: data.id })
      if (find !== null) this._.merge(find, data)
      else this.$refs.list.courses.unshift(data)
      this.$refs.edit.dialog = false
    }
  }
}
</script>

<style scoped lang="stylus">

</style>
