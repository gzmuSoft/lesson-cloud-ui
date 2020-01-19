<template lang="pug">
  table-card.lesson-course
    v-layout(wrap, style="width:100%")
      v-flex(sm12, md6, lg4)
        v-text-field(v-model="search.name", :label="$t('entity.name')", clearable)
      v-flex(sm12, md6, lg4)
        v-text-field(v-model="search.type", :label="$t('course.type')", clearable)
      v-flex(sm8, md8, lg3)
        v-switch(v-model="search.self", :label="selfTip")
      v-flex(sm4, md4, lg1)
        .text-right.mt-4
          v-btn(color="primary", outlined, @click="") {{$t('action.query')}}
    v-data-table(:headers="headers", :items="courses", :options.sync="options", multi-sort,
      :server-items-length="itemsLength", :footer-props="footer", :loading="loading")
      template(v-slot:item.action="{ item }")
        v-tooltip(top)
          template(v-slot:activator="{ on }")
            v-btn.mr-2(outlined, rounded, x-small, fab, color="success", v-on="on", @click="handleSee(item)")
              v-icon mdi-eye
          span {{$t('action.view')}}
</template>

<script>
import { resourceByNameLikePage } from '@/api/rest'
import TableCard from '@/components/table-card'
import { toPage } from '@/util/page'

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
      this.getCourse(toPage(val))
    }
  },
  methods: {
    getCourse (params) {
      this.loading = true
      resourceByNameLikePage('course', params)
        .then(res => {
          this.courses = res.data._embedded.courses
          this.itemsLength = res.data.page.totalElements
        })
        .finally(() => { this.loading = false })
    },
    handleSee (item) {
      this.$router.push({
        name: 'teacher-course-management',
        params: { course: item }
      })
    }
  }
}
</script>

<style scoped lang="stylus">

</style>
