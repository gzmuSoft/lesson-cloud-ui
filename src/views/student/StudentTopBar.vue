<template lang="pug">
  v-system-bar#student-topbar(lights-out, fixed, app, window, dark)
    v-spacer
    v-icon mdi-wifi-strength-4
    v-icon mdi-signal-cellular-outline
    v-icon mdi-battery
    span 12:30
</template>

<script>
export default {
  name: 'StudentTopBar',
  data: () => ({
    //
  })
}
</script>

<style scoped lang="stylus">

</style>
