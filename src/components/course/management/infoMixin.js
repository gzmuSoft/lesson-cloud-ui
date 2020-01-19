export const infoMixin = {
  props: { item: { type: Object, required: true } },
  data: () => ({
    input: null,
    change: false
  }),
  created () {
    this.input = this._.cloneDeep(this.item)
  },
  watch: {
    item (val) {
      this.input = this._.cloneDeep(val)
      this.change = false
    }
  },
  methods: {
    close () {
      this.change = !this._.isEqual(this.input, this.item)
    }
  }
}
