export default {
  data: () => ({
    dialog: false,
    loading: false,
    input: null,
    item: {}
  }),
  created () {
    this.initItem()
    this.init()
  },
  watch: {
    item (val) {
      if (val === null) this.initItem()
      this.init()
    }
  },
  methods: {
    init () {
      this.input = this._.cloneDeep(this.item)
    },
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
