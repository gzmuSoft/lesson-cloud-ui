<template lang="pug">
  v-navigation-drawer#student-nav(v-model="drawer", fixed, height="640px", temporary)
    v-row.fill-height(no-gutters)
      v-navigation-drawer(v-model="drawer", mini-variant, mini-variant-width="56", dark)
        v-list-item
          v-list-item-avatar
            v-img(src="http://image.japoul.cn/me.jpg")
        v-divider
        v-list-item(link)
          v-icon mdi-settings
        v-list-item(link)
          v-icon mdi-shield
        template(v-slot:append)
          v-list-item(link)
            v-icon mdi-exit-to-app
      v-list.grow
        v-list-item(link)
          v-list-item-title home
        v-list-item(link)
          v-list-item-title home
        v-list-item(link)
          v-list-item-title home

</template>

<script>
export default {
  name: 'StudentNavigation',
  data: () => ({
    drawer: false
  })
}
</script>

<style scoped lang="stylus">
  #student-nav
    top auto !important
    bottom  0 !important
    margin-bottom 64px
    min-width 360px
</style>
