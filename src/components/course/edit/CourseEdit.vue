<template lang="pug">
  v-dialog(v-model="dialog", max-width="800px")
    v-card(:loading="loading")
      v-container
        v-card-text
          v-form
            v-row
              v-col(cols="12")
                v-text-field(v-model="input.name", :label="$t('entity.name')", clearable)
            v-row
              v-col(md="6", sm="12")
                v-text-field(v-model="input.type", :label="$t('course.type')", clearable)
              v-col(md="6", sm="12")
                v-text-field(type="number", v-model="input.period", :label="$t('course.period')", clearable)
            v-row
              v-col(md="6", sm="12")
                v-text-field(type="number", v-model="input.credit", min="0.00", max="100.00", step="0.05", :label="$t('course.credit')", clearable)
              v-col(md="6", sm="12")
                v-text-field(type="number", v-model="input.sort", :label="$t('entity.sort')", clearable)
            v-row(v-if="item.id !== 0")
              v-col(md="6", sm="12")
                v-text-field(v-model="input.createUser", disabled, :label="$t('entity.createUser')")
              v-col(md="6", sm="12")
                v-text-field(v-model="input.createTime", disabled, :label="$t('entity.createTime')")
            v-row(v-if="item.id !== 0")
              v-col(md="6", sm="12")
                v-text-field(v-model="input.modifyUser", disabled, :label="$t('entity.modifyUser')")
              v-col(md="6", sm="12")
                v-text-field(v-model="input.modifyTime", disabled, :label="$t('entity.modifyTime')")
            v-row
              v-col(cols="12")
                v-textarea(v-model="input.remark", :label="$t('entity.remark')", rows="4")
        v-card-actions
          v-spacer
          v-btn(outlined, color="warning", @click="init") {{$t('action.reset')}}
          v-btn(outlined, color="success", @click="$emit('save', input)") {{$t('action.save')}}
</template>

<script>
import formMixin from '@/mixin/formMixin'
export default {
  name: 'CourseEdit',
  mixins: [formMixin],
  data: () => ({
    item: {}
  }),
  methods: {
    initItem () {
      this.item = {
        id: 0,
        name: '',
        type: '',
        period: 1,
        credit: 1.0,
        sort: 1,
        createUser: '',
        createTime: '',
        modifyUser: '',
        modifyTime: '',
        remark: ''
      }
    }
  }
}
</script>

<style scoped lang="stylus">

</style>
