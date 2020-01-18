<template lang="pug">
  #teacher-course
    course-management
</template>

<script>
import Course from '@/components/course/Course'
export default {
  name: 'Course',
  components: { CourseManagement: Course },
  data: () => ({
    //
  })
}
</script>

<style scoped lang="stylus">

</style>
