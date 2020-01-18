<template lang="pug">
  v-card.lesson-course
    v-card-text
      v-row
        v-col(sm="12", md="4", xl="3")
          v-treeview(:items="course", activatable, :load-children="handleSection", hoverable,
            item-key="key", transition, return-object, @update:active="handleActive",
            :open.sync="open", :active.sync="active")
            template(v-slot:prepend="{ item }")
              v-icon(size="20") {{treeIcon(item.key)}}
        v-divider(vertical)
        v-col
          v-scroll-y-transition(hide-on-leave, mode="out-in")
            .title.grey--text.text--lighten-1.font-weight-light.text-center(v-if="active.length === 0")
              | {{$t("tip.course")}}
          v-scroll-y-transition(hide-on-leave, mode="out-in")
            .pt-6.mx-auto(v-if="active.length !== 0")
              component(:is="info", :item="selected", :parents="parents")
</template>

<script>
import { getAll } from '@/api/rest'
import { searchByCourseId } from '@/api/section'
import { searchBySectionId } from '@/api/knowledge'
import CourseInfo from './CourseInfo'
import SectionInfo from './SectionInfo'
import KnowledgeInfo from './KnowledgeInfo'

export default {
  name: 'Course',
  components: { CourseInfo, SectionInfo, KnowledgeInfo },
  data: () => ({
    course: [],
    open: [],
    active: [],
    selected: null,
    info: 'course-info',
    parents: []
  }),
  created () {
    getAll('course').then(res => {
      res.data._embedded.courses.forEach(value => {
        value.children = []
        value.key = `1-${value.id}`
        this.course.push(value)
      })
    })
  },
  methods: {
    treeIcon (key) {
      if (key === null) return ''
      if (key.startsWith('1-')) return 'mdi-book-open-variant'
      if (key.startsWith('2-')) return 'mdi-book-multiple'
      if (key.startsWith('3-')) return 'mdi-book'
    },
    async handleSection (item) {
      if (item.key.startsWith('1-')) {
        const section = await searchByCourseId(item.id)
        section.data._embedded.sections.map(value => {
          value.children = []
          value.key = `2-${value.id}`
        })
        item.children = section.data._embedded.sections
      } else {
        const knowledge = await searchBySectionId(item.id)
        knowledge.data._embedded.knowledges.map(value => { value.key = `3-${value.id}` })
        item.children = knowledge.data._embedded.knowledges
      }
    },
    handleActive (item) {
      if (item.length === 0) return
      this.selected = item[0]
      if (this.selected.key.startsWith('1-')) this.info = 'course-info'
      else if (this.selected.key.startsWith('2-')) {
        this.info = 'section-info'
        this.parents = this._.cloneDeep(this._.find(this.course, { id: this.selected.courseId }).children)
        this.parents.unshift({ id: 0, name: '无' })
      } else if (this.selected.key.startsWith('3-')) {
        this.info = 'knowledge-info'
        const sections = this._.find(this.course, { id: this.selected.courseId }).children
        this.parents = this._.cloneDeep(this._.find(sections, { id: this.selected.sectionId })).children
        this.parents.unshift({ id: 0, name: '无' })
      }
    }
  }
}
</script>

<style scoped lang="stylus">

</style>
