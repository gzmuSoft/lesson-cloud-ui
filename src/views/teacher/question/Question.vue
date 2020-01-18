<template lang="pug">
  table-card#teacher-question
    v-form
      v-layout(wrap, style="width:100%")
        v-flex(sm12, md6, lg8)
          v-text-field(v-model="search.name", label="题目名称", clearable)
        v-flex(sm12, md6, lg4)
          v-select(v-model="search.type", :items="items.type", item-value='value', item-text='name',
            label="题目类型", multiple, clearable)
        v-flex(sm12, md6, lg4)
          v-autocomplete(v-model="search.course", label="课程", placeholder="查询课程", @blur="querySection",
            :search-input.sync="input.course", :loading="loading.course", :items="items.course",
            item-text="name", item-value="id", cache-items, clearable)
        v-flex(sm12, md6, lg4)
          v-select(v-model="search.section", :items="items.section", :loading="loading.section", @change="queryKnowledge",
            item-value='id', item-text='name', label="章节", clearable)
        v-flex(sm12, md6, lg4)
          v-select(v-model="search.knowledge", :items="items.knowledge", :loading="loading.knowledge",
            item-value='id', item-text='name', label="知识点", clearable)
        v-flex(sm12, md6, lg4)
          v-switch(v-model="search.isPublic", :label="`是否公开:${search.isPublic?'是':'否'}`")
        v-flex.text-right(sm12, md12, lg8)
          v-spacer.mt-4
          v-btn.mr-4(color="info", outlined, @click="init") 重置条件
          v-btn(color="primary", outlined, @click="handleSearch") 查询
</template>

<script>
import TableCard from '@/components/table-card'
import { types } from '@/util/options'
import { resourceByNameLike } from '@/api/rest'
import { searchByCourseId } from '@/api/section'
import { searchBySectionId } from '@/api/knowledge'

export default {
  name: 'Question',
  components: {
    TableCard
  },
  data: () => ({
    search: { course: '', section: '', knowledge: '', name: '', type: '', isPublic: false },
    input: { course: '', section: '', knowledge: '' },
    loading: { course: false, section: false, knowledge: false },
    items: { course: [], section: [], knowledge: [], type: types }
  }),
  created () {
    this.init()
  },
  watch: {
    'input.course' (val) { val && val !== this.search.course && this.queryCourse(val) }
  },
  methods: {
    init () {
      this.search = { course: '', section: '', knowledge: '', name: '', type: '', isPublic: false }
      this.input = { course: '', section: '', knowledge: '' }
      this.loading = { course: false, section: false, knowledge: false }
      this.items = { course: [], section: [], knowledge: [], type: types }
    },
    queryCourse (val) {
      this.loading.course = true
      resourceByNameLike('course', val)
        .then(res => { this.items.course = res.data._embedded.courses })
        .finally(() => { this.loading.course = false })
    },
    querySection () {
      if (typeof (this.search.course) !== 'number') {
        this.items.section = []
        this.items.knowledge = []
        return
      }
      this.loading.section = true
      searchByCourseId(this.search.course)
        .then(res => { this.items.section = res.data._embedded.sections })
        .finally(() => { this.loading.section = false })
    },
    queryKnowledge () {
      if (typeof (this.search.section) !== 'number') {
        this.items.knowledge = []
        return
      }
      this.loading.knowledge = true
      searchBySectionId(this.search.section)
        .then(res => { this.items.knowledge = res.data._embedded.knowledges })
        .finally(() => { this.loading.knowledge = false })
    },
    handleSearch () {
      console.log(this.search)
    }
  }
}
</script>

<style scoped lang="stylus">

</style>
