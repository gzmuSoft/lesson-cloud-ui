import { mapActions, mapState } from 'vuex'

export default {
  computed: {
    ...mapState('teacher', {
      course: 'course'
    })
  },
  created () {
    this.init()
  },
  methods: {
    ...mapActions('teacher', {
      setCourse: 'setCourse'
    }),
    init () {}
  }
}
