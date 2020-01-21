<template lang="pug">
  v-app
    v-fade-transition(hide-on-leave)
      router-view
</template>

<script>
import { initApplication } from '@/mixin/baseMixin'

export default {
  name: 'App',
  mixins: [ initApplication ],
  data: () => ({
    //
  })
}
</script>
