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
          v-btn(icon, dark, @click="dialog = false")
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
</template>

<script>
import { types } from '@/util/options'

export default {
  name: 'QuestionSee',
  data: () => ({
    dialog: false,
    question: null,
    default: null,
    items: {}
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
    }
  }
}
</script>

<style scoped lang="stylus">
.v-input__append-inner
  margin 0 !important
</style>
