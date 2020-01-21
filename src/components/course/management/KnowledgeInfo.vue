<template lang="pug">
  .knowledge-info {{$t("knowledge.name")}}：{{item.name}}
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
          td {{$t("knowledge.intro")}}
          td
            v-edit-dialog(:return-value.sync="input.intro", @close="close", large,
              :cancel-text="$t('action.cancel')", :save-text="$t('action.save')") {{input.intro}}
              template(v-slot:input)
                v-textarea(v-model="input.intro", :label="$t('knowledge.intro')", counter, autofocus, rows="2")
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
    .text-right
      v-btn(color="error", outlined, @click="handleDelete", :loading="loading.delete") {{$t("action.delete")}}
      v-btn.ml-4(color="success", outlined, @click="handleSave", :loading="loading.save", v-show="change") {{$t("action.save")}}
</template>

<script>
import { infoMixin } from './infoMixin'
import * as restApi from '@/api/rest'

export default {
  name: 'KnowledgeInfo',
  mixins: [infoMixin],
  data: () => ({
    loading: {
      delete: false,
      save: false
    }
  }),
  methods: {
    handleSave () {
      this.loading.save = true
      restApi.putOne('knowledge', this.input)
        .then(res => {
          this.$toast(this.$i18n.t('tip.action.success'), { type: 'success' })
          Object.assign(this.input, res.data)
          this.change = false
          this.$emit('success', this.input)
        }).finally(() => {
          this.loading.save = false
        })
    },
    handleDelete () {
      this.$confirm({}, () => {
        this.loading.delete = true
        restApi.deleteOne('knowledge', this.input.id)
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
