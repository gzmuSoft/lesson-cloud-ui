<template lang="pug">
  v-card.table-card.mt-5
    v-slide-y-transition(mode="out-in")
      v-container.skeleton-loader(grid-list-md, v-if="loading")
        v-row
          v-col(cols="12")
            v-skeleton-loader(type="heading")
          v-col(cols="12", :md="md", :lg="lg", v-for="i in num", :key="i")
            v-skeleton-loader(type="card-heading")
          v-col(cols="12")
            v-skeleton-loader(type="heading")
          v-col(cols="12")
            v-skeleton-loader(type="table")
      .skeleton-loader-content(v-else)
        v-card-title.mb-0.pb-0
          slot(name="title")
        v-card-text
          v-container(grid-list-md)
            slot
        v-card-actions
          slot(name="footer")
</template>

<script>
export default {
  name: 'TableCard',
  props: {
    loading: { type: Boolean, default: false },
    md: { type: Number, default: 6 },
    lg: { type: Number, default: 4 },
    num: { type: Number, default: 6 }
  },
  data: () => ({
    //
  })
}
</script>

<style scoped lang="stylus">

</style>
