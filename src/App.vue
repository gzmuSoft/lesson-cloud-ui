<template lang="pug">
  v-app
    v-app-bar(app, color="primary, dark")
      .d-flex.align-center
        v-img.shrink.mr-2(alt="Vuetify Logo", contain, src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png",
          transition="scale-transition", width="40")
        v-img.shrink.mt-1.hidden-sm-and-down(alt="Vuetify Name", contain, min-width="100",
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png", width="100")
      v-spacer
      v-btn(href="https://github.com/vuetifyjs/vuetify/releases/latest",
        target="_blank",
        text)
        span.mr-2 Latest Release
        v-icon mdi-open-in-new
    v-content
      hello-world
</template>

<script>
import HelloWorld from './components/HelloWorld'

export default {
  name: 'App',

  components: {
    HelloWorld
  },

  data: () => ({
    //
  })
}
</script>
