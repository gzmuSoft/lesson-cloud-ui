import { mapActions, mapState } from 'vuex'

export default {
  computed: {
    ...mapState('teacher', {
      course: 'course'
    })
  },
  methods: {
    ...mapActions('teacher', {
      setCourse: 'setCourse'
    })
  }
}
