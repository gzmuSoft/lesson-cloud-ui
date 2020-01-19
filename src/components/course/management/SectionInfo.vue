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
          td {{$t("section.type")}}
          td
            v-edit-dialog(:return-value.sync="input.type", @close="close", large,
              :cancel-text="$t('action.cancel')", :save-text="$t('action.save')") {{type}}
              template(v-slot:input)
                v-select(v-model="input.type", :items="types", item-value='value', item-text='name',
                  :label="$t('section.type')")
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
import { sectionTypes } from '@/util/options'

export default {
  name: 'SectionInfo',
  mixins: [infoMixin],
  props: { parents: { type: Array, required: true } },
  data: () => ({
    types: sectionTypes
  }),
  computed: {
    parent () {
      if (this.input.parentId === 0) return '无'
      return this._.find(this.parents, { id: this.input.parentId }).name
    },
    type () {
      return this._.find(this.types, { value: this.input.type }).name
    }
  },
  methods: {
    save () {
      // TODO: 修改章节逻辑
    }
  }
}
</script>

<style scoped lang="stylus">

</style>
