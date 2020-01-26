<template lang="pug">
  table-card#teacher-question
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
    v-form
      v-layout(wrap, style="width:100%")
        v-flex(sm12, md6, lg8)
          v-text-field(v-model="search.name", :label="$t('entity.name')", clearable)
        v-flex(sm12, md6, lg4)
          v-select(v-model="search.type", :items="items.type", item-value='value', item-text='name',
            :label="$t('question.type')", multiple, clearable)
        v-flex(sm12, md6, lg4)
          v-select(v-model="search.chapter", :items="items.chapter", :loading="loading.section", @change="querySection",
            item-value='id', item-text='name', :label="$t('section.chapter')", clearable)
        v-flex(sm12, md6, lg4)
          v-select(v-model="search.section", :items="items.section", :loading="loading.section", @change="queryKnowledge",
            item-value='id', item-text='name', :label="$t('section.section')", clearable)
        v-flex(sm12, md6, lg4)
          v-select(v-model="search.knowledge", :items="items.knowledge", :loading="loading.knowledge",
            item-value='id', item-text='name', :label="$t('knowledge.name')", clearable)
        v-flex(sm12, md6, lg4)
          v-switch(v-model="search.isPublic", :label="$t('question.isPublic', [public])")
        v-flex.text-right(sm12, md12, lg8)
          v-spacer.mt-4
          v-btn.mr-4(color="info", outlined, @click="init") 重置条件
          v-btn(color="primary", outlined, @click="handleSearch") 查询
    v-data-table(:headers="headers", :items="questions", :options.sync="options", multi-sort,
      :server-items-length="itemsLength", :footer-props="footer", :loading="loading.table")
      template(v-slot:item.action="{ item }")
        v-tooltip(top)
          template(v-slot:activator="{ on }")
            v-btn.mr-2(icon, x-small, fab, color="success", v-on="on", @click="handleSee(item)")
              v-icon mdi-eye
          span {{$t('action.view')}}
      template(v-slot:item.type="{ item }")
        span {{showType(item.type)}}
      template(v-slot:item.isPublic="{ item }")
        v-chip(:color="item.isPublic?'success':'error'") {{item.isPublic? '是' : '否'}}
    question-see(ref="see")
</template>

<script>
import TableCard from '@/components/table-card'
import { types } from '@/util/options'
import { sectionByCourseId, sectionByParentId } from '@/api/section'
import { knowledgeBySectionId } from '@/api/knowledge'
import { teacherQuestion } from '@/api/teacher'
import teacherMixin from '@/views/teacher/teacherMixin'
import pageMixin from '@/mixin/pageMixin'
import QuestionSee from './QuestionSee'
import * as page from '@/util/page'

export default {
  name: 'Question',
  components: { TableCard, QuestionSee },
  mixins: [teacherMixin, pageMixin],
  data: function () {
    return {
      questions: [],
      headers: [
        { text: this.$i18n.t('entity.name'), align: 'left', value: 'name', width: '50%' },
        { text: this.$i18n.t('question.difficultRate'), align: 'left', value: 'difficultRate' },
        { text: this.$i18n.t('question.type'), align: 'left', value: 'type' },
        { text: this.$i18n.t('question.public'), align: 'left', value: 'isPublic' },
        { text: this.$i18n.t('entity.sort'), align: 'left', value: 'sort' },
        { text: this.$i18n.t('action.key'), align: 'center', value: 'action', sortable: false }
      ]
    }
  },
  created () {
    this.init()
  },
  computed: {
    public () { return this.$i18n.t(this.search.isPublic ? 'action.yes' : 'action.no') }
  },
  watch: {
    options () {
      this.handleSearch()
    }
  },
  methods: {
    init () {
      this.search = { chapter: 0, section: 0, knowledge: 0, name: '', type: '', isPublic: false }
      this.loading = { chapter: false, section: false, knowledge: false, table: false }
      this.items = { chapter: [], section: [], knowledge: [], type: types }
      this.loading.chapter = true
      sectionByCourseId(this.course.id)
        .then(res => {
          this.items.chapter = res.data._embedded.sections
          this.itemsLength = res.data.totalElements
        })
        .finally(() => { this.loading.chapter = false })
      teacherQuestion({ courseId: this.course.id })
        .then(res => {
          this.questions = res.data.content
        })
    },
    querySection () {
      this.loading.section = true
      sectionByParentId(this.search.chapter)
        .then(res => { this.items.section = res.data._embedded.sections })
        .finally(() => { this.loading.section = false })
    },
    queryKnowledge () {
      if (typeof (this.search.section) !== 'number') {
        this.items.knowledge = []
        return
      }
      this.loading.knowledge = true
      knowledgeBySectionId(this.search.section)
        .then(res => { this.items.knowledge = res.data._embedded.knowledges })
        .finally(() => { this.loading.knowledge = false })
    },
    handleSearch () {
      this.loading.table = true
      let params = Object.assign(page.toPage(this.options), this.search)
      params.courseId = this.course.id
      params.passageId = this.search.chapter
      params.sectionId = this.search.section
      params.knowledgeId = this.search.knowledge
      teacherQuestion(params)
        .then(res => {
          this.questions = []
          this.questions = res.data.content
          this.itemsLength = res.data.totalElements
        })
        .finally(() => { this.loading.table = false })
    },
    showType (value) {
      return this._.find(types, { value: value }).name
    },
    handleSee (item) {
      item.questionDetail = {
        option: [],
        answer: []
      }
      this.$refs.see.question = this._.cloneDeep(item)
      this.$refs.see.default = this._.cloneDeep(item)
      this.$refs.see.dialog = true
    }
  }
}
</script>

<style scoped lang="stylus">

</style>
