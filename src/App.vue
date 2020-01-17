<template lang="pug">
  v-app
    v-fade-transition(hide-on-leave)
      router-view
</template>

<script>
import { initApplication } from '@/plugins/baseMixin'

export default {
  name: 'App',
  mixins: [ initApplication ],
  data: () => ({
    //
  })
}
</script>
