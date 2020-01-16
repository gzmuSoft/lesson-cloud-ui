<template lang="pug">
  #lesson-login.fill-height.mx-auto.justify-center.align-center.d-flex.flex-column
    .loadingio-spinner-cube-9lqlosg5wsh
      .ldio-sjav3iy4o3
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
@keyframes ldio-sjav3iy4o3 {
  0% { transform: scale(1.1500000000000001) }
  100% { transform: scale(1) }
}
.ldio-sjav3iy4o3 div {
  position: absolute;
  width: 80px;
  height: 80px;
  top: 13.333333333333336px;
  left: 13.333333333333336px;
  background: #e15b64;
  animation: ldio-sjav3iy4o3 1s cubic-bezier(0,0.5,0.5,1) infinite;
  animation-delay: -0.3s;
}
.ldio-sjav3iy4o3 div:nth-child(2) {
  top: 13.333333333333336px;
  left: 106.66666666666666px;
  background: #f47e60;
  animation-delay: -0.2s;
}
.ldio-sjav3iy4o3 div:nth-child(3) {
  top: 106.66666666666666px;
  left: 13.333333333333336px;
  background: #abbd81;
  animation-delay: 0s;
}
.ldio-sjav3iy4o3 div:nth-child(4) {
  top: 106.66666666666666px;
  left: 106.66666666666666px;
  background: #f8b26a;
  animation-delay: -0.1s;
}
.loadingio-spinner-cube-9lqlosg5wsh {
  width: 200px;
  height: 200px;
  display: inline-block;
  overflow: hidden;
}
.ldio-sjav3iy4o3 {
  width: 100%;
  height: 100%;
  position: relative;
  transform: translateZ(0) scale(1);
  backface-visibility: hidden;
  transform-origin: 0 0; /* see note above */
}
.ldio-sjav3iy4o3 div { box-sizing: content-box; }
</style>
