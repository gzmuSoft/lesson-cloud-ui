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
    v-expand-transition
      .text-right(v-show="change")
        v-btn(color="success", outlined, @click="save") {{$t("action.save")}}
</template>

<script>
import { infoMixin } from './infoMixin'

export default {
  name: 'KnowledgeInfo',
  mixins: [infoMixin],
  data: () => ({
    //
  }),
  methods: {
    save () {
      // TODO: 修改知识点逻辑
    }
  }
}
</script>

<style scoped lang="stylus">

</style>
