<template lang="pug">
  .course-info {{$t("course.name")}}：{{item.name}}
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
          td {{$t("course.period")}}
          td
            v-edit-dialog(:return-value.sync="input.period", @close="close", large,
              :cancel-text="$t('action.cancel')", :save-text="$t('action.save')") {{input.period}}
              template(v-slot:input)
                v-text-field(v-model="input.period", :label="$t('course.period')", counter, autofocus, single-line)
        tr
          td {{$t("course.credit")}}
          td
            v-edit-dialog(:return-value.sync="input.credit", @close="close", large,
              :cancel-text="$t('action.cancel')", :save-text="$t('action.save')") {{input.credit}}
              template(v-slot:input)
                v-text-field(v-model="input.credit", :label="$t('course.credit')", counter, autofocus, single-line)
        tr
          td {{$t("course.type")}}
          td
            v-edit-dialog(:return-value.sync="input.type", @close="close", large,
              :cancel-text="$t('action.cancel')", :save-text="$t('action.save')") {{input.type}}
              template(v-slot:input)
                v-text-field(v-model="input.type", :label="$t('course.type')", counter, autofocus, single-line)
        tr
          td {{$t("entity.sort")}}
          td
            v-edit-dialog(:return-value.sync="input.sort", @close="close", large,
              :cancel-text="$t('action.cancel')", :save-text="$t('action.save')") {{input.sort}}
              template(v-slot:input)
                .pl-0 {{$t('entity.sort')}}
                v-slider(v-model="input.sort", :thumb-size="24", thumb-label)
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
  name: 'CourseInfo',
  mixins: [infoMixin],
  data: () => ({
  }),
  methods: {
    save () {
      // TODO: 修改课程逻辑
    }
  }
}
</script>

<style scoped lang="stylus">

</style>
