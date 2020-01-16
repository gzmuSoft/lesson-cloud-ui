<template lang="pug">
  #teacher-nav
    v-list
      v-list-item
        v-list-item-avatar(color="white", size="38px")
          v-img(src="https://demos.creative-tim.com/vuetify-material-dashboard/favicon.ico", height="34", contain)
        v-list-item-content
          v-list-item-title.title test
      v-divider.mb-5
      v-list-item(link)
        v-list-item-action
          v-icon mdi-settings
        v-list-item-content
          v-list-item-title Settings
</template>

<script>
export default {
  name: 'TeacherNavigation',
  data: () => ({
    //
  })
}
</script>

<style scoped lang="stylus">

</style>
