<template lang="pug">
  #lesson-login.fill-height.mx-auto.justify-center.align-center.d-flex.flex-column
    .loading-cover
      .cover
        div
        div
        div
        div
    p.blue--text {{tip}}
    p.blue--text(v-show="timeShow") ({{time}}s)
    v-expand-transition
      v-btn.mt-6(color="primary", outlined, v-show="show", @click="handleBack") 时间太久？点我返回重试

</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'Logout',
  data: () => ({
    tip: '正在退出......',
    time: 3,
    timeShow: false,
    show: false
  }),
  async created () {
    this.showBack()
    this.logout()
    this.tip = '退出成功！正在跳转......'
    this.timeShow = true
    setInterval(() => {
      this.time -= 1
    }, 1000)
    setTimeout(() => {
      this.handleBack()
    }, 3000)
  },
  methods: {
    ...mapActions('auth', {
      logout: 'logout'
    }),
    showBack () {
      setTimeout(() => {
        this.show = true
      }, 5000)
    },
    handleBack () {
      this.$router.push({ name: 'index' })
    }
  }
}
</script>

<style scoped>
@keyframes cover {
  0% { transform: scale(1.15) }
  100% { transform: scale(1) }
}
.cover div {
  position: absolute;
  width: 80px;
  height: 80px;
  top: 13px;
  left: 13px;
  background: #e15b64;
  animation: cover 1s cubic-bezier(0,0.5,0.5,1) infinite;
  animation-delay: -0.3s;
}
.cover div:nth-child(2) {
  top: 13px;
  left: 106px;
  background: #f47e60;
  animation-delay: -0.2s;
}
.cover div:nth-child(3) {
  top: 106px;
  left: 13px;
  background: #abbd81;
  animation-delay: 0s;
}
.cover div:nth-child(4) {
  top: 106px;
  left: 106px;
  background: #f8b26a;
  animation-delay: -0.1s;
}
.loading-cover {
  width: 200px;
  height: 200px;
  display: inline-block;
  overflow: hidden;
}
.cover {
  width: 100%;
  height: 100%;
  position: relative;
  transform: translateZ(0) scale(1);
  backface-visibility: hidden;
  transform-origin: 0 0; /* see note above */
}
.cover div { box-sizing: content-box; }
</style>
