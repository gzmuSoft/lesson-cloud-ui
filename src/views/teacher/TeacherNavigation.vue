<template lang="pug">
  #teacher-nav
    v-list
      v-list-item
        v-list-item-avatar(color="white", size="38px")
          v-img(:src="user.avatar", height="34", contain)
        v-list-item-content
          v-list-item-title.title {{user.name}}
      v-divider.mb-5
      v-list-item(v-for="menu in menus", link, :to="{name: menu.routeName}", :key="menu.id")
        v-list-item-action
          v-icon {{menu.icon}}
        v-list-item-content
          v-list-item-title {{$t(menu.name)}}
</template>

<script>
import { mapState } from 'vuex'
import { initMenu } from '@/plugins/baseMixin'

export default {
  name: 'TeacherNavigation',
  mixins: [initMenu],
  data: () => ({
    //
  }),
  computed: {
    ...mapState('user', { user: 'user' })
  }
}
</script>

<style scoped lang="stylus">

</style>
