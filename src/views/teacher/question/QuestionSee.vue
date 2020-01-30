<template lang="pug">
  v-dialog.question-see(v-model="dialog", fullscreen, hide-overlay, scrollable,
    transition="dialog-bottom-transition")
    v-card(tile, v-if="question")
      v-toolbar(flat, color="primary")
        v-toolbar-title.white--text
          v-icon.mr-2(color="white") mdi-comment-question-outline
          | {{$t('tip.question.info')}}
        v-spacer
        v-toolbar-items
          v-btn(icon, dark, x-small, fab, @click="dialog = false")
            v-icon mdi-close
      v-card-text
        v-form
          v-row
            v-col(cols="12", md="6")
              v-textarea(v-model="question.name", :label="$t('entity.name')", rows="1")
            v-col(cols="12", md="6")
              v-select(v-model="question.type", :items="items.type", item-value='value', item-text='name',
                :label="$t('question.type')", @change="handleTypeChange")
            v-col(cols="12", md="6")
              v-text-field(type="number", v-model="question.sort", :label="$t('entity.sort')", clearable)
            v-col(cols="12", md="6")
              v-switch(v-model="question.isPublic", :label="$t('question.isPublic', [public])")
          v-row
            v-col(cols="12", md="6")
              v-select(v-model="question.chapter", :items="items.chapter", :loading="loading.chapter", @change="querySection",
                item-value='id', item-text='name', :label="$t('section.chapter')", clearable)
            v-col(cols="12", md="6")
              v-select(v-model="question.section", :items="items.section", :loading="loading.section", @change="queryKnowledge",
                item-value='id', item-text='name', :label="$t('section.section')", clearable)
          v-row
            v-col(cols="12", md="6")
              v-select(v-model="question.knowledge", :items="items.knowledge", :loading="loading.knowledge", @change="handleKnowledge",
                item-value='id', item-text='name', :label="$t('knowledge.name')", clearable, return-object)
            v-col(cols="12", md="6")
              span {{$t("knowledge.name")}}：
              v-chip.mr-2.mb-2(v-for="(k,index) in knowledge", :key="index", close, @click:close="knowledge.splice(index, 1)")
                | {{k.name}}
          v-row
            v-col(cols="12")
              v-slider(v-model="question.difficultRate", thumb-label, :label="$t('question.difficultRate')",
                min="1", max="100", track-color="grey", :color="color", :hint="$t('tip.question.difficultRate')",
                persistent-hint)
          v-row(v-if="question.type==='SINGLE_SEL' || question.type==='MULTI_SEL'")
            v-col.mb-0.pb-0.d-flex.justify-space-between(cols="12")
              span.py-2.mb-0 {{$t('tip.question.option', [''])}}
              v-btn(icon, @click="handleAddOption")
                v-icon mdi-plus
            v-col(cols="12")
              v-text-field( v-for="(option, index) in question.questionDetail.option", :key="index",
                v-model="question.questionDetail.option[index]", :label="$t('tip.question.option', [index + 1])",
                dense, outlined, append-outer-icon="mdi-minus", @click:append-outer="handleRemoveOption(index)")
                template(v-slot:append)
                  v-btn(icon, @click="handleAddAnswer(index)", :color="isAnswer(index) ? 'success' : ''")
                    v-icon mdi-check-circle
          v-row(v-else-if="question.type==='JUDGEMENT'")
            v-col(cols="12")
              v-radio-group(v-model="question.questionDetail.judgementAnswer", :label="$t('question.judgementAnswer')", mandatory, row, @change="handleJudgementChange")
                v-radio(:value="0", :label="$t('tip.question.error')", color="error")
                v-radio(:value="1", :label="$t('tip.question.right')", color="success")
          v-row
            v-col(cols="12")
              v-textarea(v-model="question.explanation", :label="$t('question.explanation')", rows="4")
          v-row
            v-col(cols="12")
              v-textarea(v-model="question.remark", :label="$t('entity.remark')", rows="4")
          v-row(v-if="question.id !== null")
            v-col(md="6", sm="12")
              v-text-field(v-model="question.createUser", disabled, :label="$t('entity.createUser')")
            v-col(md="6", sm="12")
              v-text-field(v-model="question.createTime", disabled, :label="$t('entity.createTime')")
          v-row(v-if="question.id !== null")
            v-col(md="6", sm="12")
              v-text-field(v-model="question.modifyUser", disabled, :label="$t('entity.modifyUser')")
            v-col(md="6", sm="12")
              v-text-field(v-model="question.modifyTime", disabled, :label="$t('entity.modifyTime')")
      v-card-actions.mr-2
        v-spacer
        v-btn(color="warning", outlined, @click="handleReset") {{$t("action.reset")}}
        v-btn(color="success", outlined, @click="handleSave", :loading="loading.save") {{$t("action.save")}}
</template>

<script>
import { types } from '@/util/options'
import { sectionByParentId } from '@/api/section'
import { knowledgeBySectionId } from '@/api/knowledge'
import { questionSaveOrUpdate } from '@/api/question'

export default {
  name: 'QuestionSee',
  data: () => ({
    dialog: false,
    question: null,
    default: null,
    loading: {
      save: false,
      chapter: false,
      section: false,
      knowledge: false
    },
    items: {},
    knowledge: []
  }),
  created () {
    this.init()
  },
  computed: {
    color () {
      if (this.question.difficultRate < 25) return 'indigo'
      else if (this.question.difficultRate < 50) return 'green'
      else if (this.question.difficultRate < 75) return 'orange'
      else return 'red'
    },
    public () { return this.$i18n.t(this.question.isPublic ? 'action.yes' : 'action.no') }
  },
  methods: {
    init () {
      this.items = { type: types }
    },
    isAnswer (index) {
      return this.question.questionDetail.answer.includes(index)
    },
    querySection () {
      this.loading.section = true
      sectionByParentId(this.question.chapter)
        .then(res => { this.items.section = res.data._embedded.sections })
        .finally(() => { this.loading.section = false })
    },
    queryKnowledge () {
      if (typeof (this.question.section) !== 'number') {
        this.items.knowledge = []
        return
      }
      this.loading.knowledge = true
      knowledgeBySectionId(this.question.section)
        .then(res => { this.items.knowledge = res.data._embedded.knowledges })
        .finally(() => { this.loading.knowledge = false })
    },
    handleAddOption () {
      this.question.questionDetail.option.push('')
    },
    handleRemoveOption (index) {
      this.question.questionDetail.option.splice(index, 1)
      this.question.questionDetail.answer.splice(this.question.questionDetail.answer.indexOf(index), 1)
    },
    handleAddAnswer (index) {
      if (this.question.type === 'SINGLE_SEL') this.question.questionDetail.answer = []
      if (this.isAnswer(index)) this.question.questionDetail.answer.splice(this.question.questionDetail.answer.indexOf(index), 1)
      else this.question.questionDetail.answer.push(index)
    },
    handleJudgementChange () {
      this.question.questionDetail.answer = []
      this.question.questionDetail.answer.push(this.question.questionDetail.judgementAnswer)
    },
    handleTypeChange () {
      this.question.questionDetail.answer = []
      this.question.questionDetail.option = []
    },
    handleKnowledge (item) {
      if (typeof (item) === 'undefined' || this._.findIndex(this.knowledge, { id: item.id }) > -1) return
      this.knowledge.push(item)
    },
    handleReset () { this.question = this._.cloneDeep(this.default) },
    handleSave () {
      this.loading.save = true
      questionSaveOrUpdate(this.knowledge.map(k => k.id), this._.cloneDeep(this.question), this.question.questionDetail)
        .then(res => {
          if (this.question.id === null) this.$emit('saveSuccess', res.data)
          else this.$emit('updateSuccess', res.data)
          this.$toast(this.$i18n.t('tip.action.success'), { type: 'success' })
          this.dialog = false
        }).finally(() => { this.loading.save = false })
    }
  }
}
</script>

<style scoped lang="stylus">
.v-input__append-inner
  margin 0 !important
</style>
