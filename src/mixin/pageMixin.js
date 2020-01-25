import * as page from '@/util/page'

export default {
  data: function () {
    return {
      search: {},
      loading: {},
      items: {},
      questions: [],
      options: page.options,
      footer: page.footer,
      itemsLength: -1,
      headers: []
    }
  }
}
