<template lang="pug">
  #lesson-index
    v-btn(color="primary", @click="start") {{$t("start")}}
</template>

<script>
import { mapGetters } from 'vuex'
import { authServer } from '@/api/oauth'
export default {
  name: 'Index',
  data: () => ({
    //
  }),
  computed: {
    ...mapGetters('auth', [
      'isStudent', 'isTeacher', 'isAuth'
    ])
  },
  methods: {
    start () {
      if (!this.isAuth) {
        authServer()
      } else if (this.isStudent) {
        this.$router.push({ name: 'student' })
      } else if (this.isTeacher) {
        this.$router.push({ name: 'teacher' })
      }
    }
  }
}
</script>

<style scoped lang="stylus">

</style>
