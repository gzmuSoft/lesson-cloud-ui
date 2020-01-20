<template lang="pug">
  v-card.lesson-course-managent
    v-card-title
      v-tooltip(bottom)
        template(v-slot:activator="{ on }")
          v-btn(icon, v-on="on", @click="$emit('back')")
            v-icon mdi-keyboard-backspace
        span {{$t('action.back')}}
      v-spacer
      v-tooltip(bottom)
        template(v-slot:activator="{ on }")
          v-btn(icon, v-on="on", @click="handleRefresh")
            v-icon mdi-refresh
        span {{$t('action.refresh')}}
    v-card-text
      v-row
        v-col(sm="12", md="4", xl="3")
          v-treeview(:items="section", activatable, :load-children="handleSection", hoverable,
            item-key="key", transition, return-object, @update:active="handleActive",
            :open.sync="open", :active.sync="active")
            template(v-slot:prepend="{ item }")
              v-icon(size="20") {{treeIcon(item.key)}}
        v-divider(vertical)
        v-col
          v-scroll-y-transition(hide-on-leave, mode="out-in")
            .title.grey--text.text--lighten-1.font-weight-light.text-center(v-if="active.length === 0")
              | {{$t("tip.course.management")}}
          v-scroll-y-transition(hide-on-leave, mode="out-in")
            .pt-6.mx-auto(v-if="active.length !== 0")
              component(:is="info", :item="selected", :parents="parents")
</template>

<script>
import CourseInfo from './CourseInfo'
import SectionInfo from './SectionInfo'
import KnowledgeInfo from './KnowledgeInfo'
import { sectionTypes } from '@/util/options'
import { sectionByCourseAndType, sectionByCourseAndParentAndType } from '@/api/section'
import { knowledgeBySectionId } from '@/api/knowledge'

export default {
  name: 'Course',
  components: { CourseInfo, SectionInfo, KnowledgeInfo },
  props: { course: { type: Object, required: true } },
  data: () => ({
    section: [],
    open: [],
    active: [],
    selected: null,
    info: 'course-info',
    parents: []
  }),
  created () {
    if (typeof (this.course) === 'undefined') {
      this.$toast(this.$i18n.t('tip.course.warningView'), { type: 'warning' })
      return
    }
    this.init()
  },
  methods: {
    init () {
      sectionByCourseAndType(this.course.id, sectionTypes[0].value)
        .then(res => {
          res.data._embedded.sections.map(value => {
            value.key = `1-${value.id}`
            value.children = []
            this.section.push(value)
          })
        })
    },
    treeIcon (key) {
      if (key === null) return ''
      if (key.startsWith('1-')) return 'mdi-book-open-variant'
      if (key.startsWith('2-')) return 'mdi-book-multiple'
      if (key.startsWith('3-')) return 'mdi-book'
    },
    async handleSection (item) {
      if (item.key.startsWith('1-')) {
        const section = await sectionByCourseAndParentAndType(this.course.id, item.id, sectionTypes[1].value)
        section.data._embedded.sections.map(value => {
          value.children = []
          value.key = `2-${value.id}`
        })
        item.children = section.data._embedded.sections
      } else {
        const knowledge = await knowledgeBySectionId(item.id)
        knowledge.data._embedded.knowledges.map(value => { value.key = `3-${value.id}` })
        item.children = knowledge.data._embedded.knowledges
      }
    },
    handleActive (item) {
      if (item.length === 0) return
      this.selected = item[0]
      if (this.selected.key.startsWith('1-') || this.selected.key.startsWith('2-')) {
        this.info = 'section-info'
        this.parents = this._.cloneDeep(this.section)
        this.parents.unshift({ id: 0, name: '无' })
      } else if (this.selected.key.startsWith('3-')) {
        this.info = 'knowledge-info'
      }
    },
    handleRefresh () {
      this.section = []
      this.init()
    }
  }
}
</script>

<style scoped lang="stylus">

</style>
