<template lang="pug">
  v-card.lesson-course-managent
    section-knowledge-add(ref="add", :chapter="section", :course="course", @success="handleRefresh")
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
      v-tooltip(bottom)
        template(v-slot:activator="{ on }")
          v-btn(icon, v-on="on", @click="handleAdd")
            v-icon mdi-plus
        span {{$t('action.add')}}
    v-card-text
      v-row
        v-col(sm="12", md="4", xl="3")
          v-treeview(:items="section", activatable, :load-children="handleSection", hoverable,
            item-key="key", transition, return-object, @update:active="handleActive",
            :open.sync="open", :active.sync="active", v-if="section.length > 0")
            template(v-slot:prepend="{ item }")
              v-icon(size="20") {{treeIcon(item.key)}}
          .title.grey--text.text--lighten-1.font-weight-light.text-center(v-else)
            | {{$t("tip.noData")}}
        v-divider(vertical)
        v-col
          v-scroll-y-transition(hide-on-leave, mode="out-in")
            .title.grey--text.text--lighten-1.font-weight-light.text-center(v-if="active.length === 0")
              | {{$t("tip.course.management")}}
          v-scroll-y-transition(hide-on-leave, mode="out-in")
            .pt-6.mx-auto(v-if="active.length !== 0")
              component(:is="info", :item="selected", :parents="parents", @success="handleSuccess", @delete="handleDelete")
</template>

<script>
import CourseInfo from './CourseInfo'
import SectionInfo from './SectionInfo'
import KnowledgeInfo from './KnowledgeInfo'
import SectionKnowledgeAdd from './SectionKnowledgeAdd'
import { sectionByCourseAndPassage, sectionByParentId } from '@/api/section'
import { knowledgeBySectionId } from '@/api/knowledge'

export default {
  name: 'Course',
  components: { CourseInfo, SectionInfo, KnowledgeInfo, SectionKnowledgeAdd },
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
      sectionByCourseAndPassage(this.course.id, 0)
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
        const section = await sectionByParentId(item.id)
        section.data._embedded.sections.map(value => {
          value.children = []
          value.key = `2-${item.id}-${value.id}`
        })
        item.children = section.data._embedded.sections
      } else {
        const knowledge = await knowledgeBySectionId(item.id)
        knowledge.data._embedded.knowledges.map(value => { value.key = `3-${item.parentId}-${item.id}-${value.id}` })
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
      this.active = []
      this.selected = null
      this.init()
    },
    handleSuccess (item) {
      // 知识点
      if (item.hasOwnProperty('sectionId')) {
        const split = item.key.split('-')
        const two = this._.find(this.section, { id: parseInt(split[1]) }).children
        const three = this._.find(two, { id: parseInt(split[2]) }).children
        Object.assign(this._.find(three, { id: item.id }), item)
        return
      }
      // 章节
      if (item.parentId === 0) {
        Object.assign(this._.find(this.section, { id: item.id }), item)
      } else {
        let children = this._.find(this.section, { id: item.parentId }).children
        Object.assign(this._.find(children, { id: item.id }), item)
      }
    },
    handleDelete (item) {
      // 知识点
      if (item.hasOwnProperty('sectionId')) {
        const split = item.key.split('-')
        const two = this._.find(this.section, { id: parseInt(split[1]) }).children
        const three = this._.find(two, { id: parseInt(split[2]) }).children
        three.splice(this._.findIndex(three, { id: item.id }), 1)
        return
      }
      // 章节
      if (item.parentId === 0) {
        this.section.splice(this._.findIndex(this.section, { id: item.id }), 1)
      } else {
        let children = this._.find(this.section, { id: item.parentId }).children
        children.splice(this._.findIndex(children, { id: item.id }), 1)
      }
      this.active = []
      this.selected = null
    },
    handleAdd () {
      this.$refs.add.dialog = true
    }
  }
}
</script>

<style scoped lang="stylus">

</style>
