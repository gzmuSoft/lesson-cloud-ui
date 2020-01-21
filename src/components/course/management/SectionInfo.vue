<template lang="pug">
  .section-info {{$t(item.type === 'CHAPTER'? 'section.chapter': 'section.section')}}：{{item.name}}
    v-simple-table
      tbody
        tr
          td {{$t("entity.name")}}
          td
            v-edit-dialog(:return-value.sync="input.name", @close="close", large,
              :cancel-text="$t('action.cancel')", :save-text="$t('action.save')") {{input.name}}
              template(v-slot:input)
                v-text-field(v-model="input.name", :label="$t('entity.name')", counter, autofocus, single-line)
        tr
          td {{$t("section.intro")}}
          td
            v-edit-dialog(:return-value.sync="input.intro", @close="close", large,
              :cancel-text="$t('action.cancel')", :save-text="$t('action.save')") {{input.intro}}
              template(v-slot:input)
                v-textarea(v-model="input.intro", :label="$t('section.intro')", counter, autofocus, rows="2")
        tr
          td {{$t("section.parent")}}
          td
            v-edit-dialog(:return-value.sync="input.parent", @close="close", large,
              :cancel-text="$t('action.cancel')", :save-text="$t('action.save')") {{parent}}
              template(v-slot:input)
                v-select(v-model="input.parentId", :items="parents", item-value='id', item-text='name',
                  :label="$t('section.parent')")
        tr
          td {{$t("entity.createUser")}}
          td {{input.createUser}}
        tr
          td {{$t("entity.createTime")}}
          td {{input.createTime}}
        tr
          td {{$t("entity.modifyUser")}}
          td {{input.modifyUser}}
        tr
          td {{$t("entity.modifyTime")}}
          td {{input.modifyTime}}
        tr
          td {{$t("entity.remark")}}
          td
            v-edit-dialog(:return-value.sync="input.remark", @close="close", large,
              :cancel-text="$t('action.cancel')", :save-text="$t('action.save')") {{input.remark}}
              template(v-slot:input)
                v-textarea(v-model="input.remark", :label="$t('entity.remark')", counter, autofocus, rows="2")
    .text-right.mt-5
      v-btn(color="error", outlined, @click="handleDelete", :loading="loading.delete") {{$t("action.delete")}}
      v-btn.ml-4(color="success", outlined, @click="handleSave", v-show="change", :loading="loading.save") {{$t("action.save")}}
</template>

<script>
import { infoMixin } from './infoMixin'
import { sectionTypes } from '@/util/options'
import * as restApi from '@/api/rest'

export default {
  name: 'SectionInfo',
  mixins: [infoMixin],
  props: { parents: { type: Array, required: true } },
  data: () => ({
    types: sectionTypes,
    loading: {
      delete: false,
      save: false
    }
  }),
  computed: {
    parent () {
      if (this.input.parentId === 0) return '无'
      return this._.find(this.parents, { id: this.input.parentId }).name
    }
  },
  methods: {
    handleSave () {
      this.loading.save = true
      restApi.putOne('section', this.input)
        .then(res => {
          this.$toast(this.$i18n.t('tip.action.success'), { type: 'success' })
          this.$emit('success', res.data)
        }).finally(() => {
          this.loading.save = false
        })
    },
    handleDelete () {
      this.$confirm({}, () => {
        this.loading.delete = true
        restApi.deleteOne('section', this.input.id)
          .then(() => {
            this.$toast(this.$i18n.t('tip.action.success'), { type: 'success' })
            this.$emit('delete', this.input)
          }).finally(() => {
            this.loading.delete = false
          })
      })
    }
  }
}
</script>

<style scoped lang="stylus">

</style>
