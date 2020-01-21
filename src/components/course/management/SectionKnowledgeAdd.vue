<template lang="pug">
  v-dialog(v-model="dialog", max-width="800px")
    v-card(:loading="loading.card")
      v-container
        v-card-text
          v-form
            v-row
              v-col(cols="12")
                v-text-field(v-model="input.name", :label="$t('entity.name')", clearable)
              v-col(cols="12")
                v-textarea(v-model="input.intro", :label="$t('section.intro')", rows="2")
              v-col(md="6", sm="12")
                v-select(v-model="input.type", :items="types", :label="$t('entity.type')")
              v-col(md="6", sm="12", v-if="input.type !== '章'")
                v-select(v-model="input.parentId", :items="chapter", @change="querySection",
                  item-value='id', item-text='name', :label="$t('section.chapter')")
              v-col(md="6", sm="12", v-if="input.type === '知识点'")
                v-select(v-model="input.sectionId", :items="section", :loading="loading.section",
                  item-value='id', item-text='name', :label="$t('section.section')")
              v-col(md="6", sm="12")
                v-text-field(type="number", v-model="input.sort", :label="$t('entity.sort')", clearable)
              v-col(cols="12")
                v-textarea(v-model="input.remark", :label="$t('entity.remark')", rows="2")
        v-card-actions
          v-spacer
          v-btn(outlined, color="warning", @click="init") {{$t('action.reset')}}
          v-btn(outlined, color="success", @click="handleAdd") {{$t('action.save')}}

</template>

<script>
import formMixin from '@/mixin/formMixin'
import { sectionByParentId } from '@/api/section'
import * as restApi from '@/api/rest'

export default {
  name: 'CourseAdd',
  props: { chapter: { type: Array, required: true }, course: { type: Object, required: true } },
  mixins: [formMixin],
  data: () => ({
    types: ['章', '节', '知识点'],
    section: [],
    loading: {
      section: false,
      card: false
    }
  }),
  methods: {
    querySection () {
      this.loading.section = true
      sectionByParentId(this.input.parentId)
        .then(res => { this.section = res.data._embedded.sections })
        .finally(() => { this.loading.section = false })
    },
    initItem () {
      this.item = {
        name: '',
        intro: '',
        sectionId: -1,
        parentId: 0,
        sort: 1,
        remark: '',
        courseId: this.course.id,
        type: '章'
      }
    },
    handleAdd () {
      this.loading.card = true
      if (this.input.type === '知识点') {
        restApi.addOne('knowledge', this.input)
          .then(() => { this.lastAction() })
          .finally(() => { this.loading.card = false })
      } else {
        restApi.addOne('section', this.input)
          .then(() => { this.lastAction() })
          .finally(() => { this.loading.card = false })
      }
    },
    lastAction () {
      this.$toast(this.$i18n.t('tip.action.success'), { type: 'success' })
      this.$emit('success')
      this.dialog = false
      this.init()
    }
  }
}
</script>

<style scoped lang="stylus">

</style>
