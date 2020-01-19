<template lang="pug">
  #teacher-course
    v-fade-transition(hide-on-leave)
      router-view
</template>

<script>
export default {
  name: 'Course',
  data: () => ({
    //
  })
}
</script>

<style scoped lang="stylus">

</style>
