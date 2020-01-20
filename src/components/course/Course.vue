<template lang="pug">
  table-card.lesson-course
    v-layout(wrap, style="width:100%")
      v-flex(sm12, md6)
        v-text-field(v-model="search.name", :label="$t('entity.name')", clearable)
      v-flex(sm12, md6)
        v-text-field(v-model="search.type", :label="$t('course.type')", clearable)
      v-flex(sm12, md6)
        v-switch(v-model="search.self", :label="selfTip")
      v-flex(sm12, md6)
        .text-right.mt-4
          slot(name="action")
          v-btn.ml-4(color="primary", outlined, @click="handleQuery") {{$t('action.query')}}
    v-data-table(:headers="headers", :items="courses", :options.sync="options", multi-sort,
      :server-items-length="itemsLength", :footer-props="footer", :loading="loading")
      template(v-slot:item.action="{ item }")
        slot(:item="item")

</template>

<script>
import TableCard from '@/components/table-card'
import { toPage } from '@/util/page'
import { courseByNameAndTypeAndSelf } from '@/api/course'

export default {
  name: 'Course',
  components: { TableCard },
  data: function () {
    return {
      search: { name: '', type: '', self: false },
      courses: [],
      options: {
        sortBy: [ 'sort' ],
        sortDesc: [ false ]
      },
      footer: {
        itemsPerPageOptions: [5, 10, 15, 20],
        showCurrentPage: true,
        showFirstLastPage: true
      },
      loading: false,
      itemsLength: -1,
      headers: [
        { text: this.$i18n.t('entity.name'), align: 'left', value: 'name' },
        { text: this.$i18n.t('course.type'), align: 'left', value: 'type' },
        { text: this.$i18n.t('course.period'), align: 'left', value: 'period' },
        { text: this.$i18n.t('course.credit'), align: 'left', value: 'credit' },
        { text: this.$i18n.t('entity.sort'), align: 'left', value: 'sort' },
        { text: this.$i18n.t('action.key'), align: 'center', value: 'action', sortable: false }
      ]
    }
  },
  created () {
    this.getCourse({})
  },
  computed: {
    selfTip () {
      let tip = ''
      if (this.search.self) tip = 'action.yes'
      else tip = 'action.no'
      tip = this.$i18n.t(tip)
      return this.$i18n.t('tip.course.self', [tip])
    }
  },
  watch: {
    options (val) {
      this.getCourse(Object.assign(toPage(val), this.search))
    }
  },
  methods: {
    getCourse (params) {
      this.loading = true
      courseByNameAndTypeAndSelf(params)
        .then(res => {
          this.courses = res.data.content
          this.itemsLength = res.data.totalElements
        })
        .finally(() => { this.loading = false })
    },
    handleQuery () {
      this.getCourse(Object.assign(toPage(this.options), this.search))
    }
  }
}
</script>

<style scoped lang="stylus">

</style>
