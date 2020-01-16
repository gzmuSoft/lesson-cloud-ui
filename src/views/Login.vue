<template lang="pug">
  #lesson-login.fill-height.mx-auto.justify-center.align-center.d-flex.flex-column
    .loading-spinner
      .loading-io
        div
          div
          div
          div
        div
          div
          div
          div
    p.blue--text(style="width:80px") {{tip}}{{last}}
    v-progress-linear(indeterminate, rounded, height="6", striped)
    v-expand-transition
      v-btn.mt-6(color="primary", outlined, v-show="show", @click="handleBack") 时间太久？点我返回重试

</template>

<script>
import * as oauthAPI from '@/api/oauth'
import { getUrlParams } from '@/util'
import { mapActions } from 'vuex'
export default {
  name: 'Login',
  data: () => ({
    tip: '登录中',
    last: '.',
    show: false
  }),
  async created () {
    this.showLast()
    this.showBack()
    const code = getUrlParams('code')
    const response = await oauthAPI.authCode(code)
    this.oauthToken(response.data)
    this.tip = '登录成功！正在跳转'
    setTimeout(() => {
      this.handleBack()
    }, 1000)
  },
  methods: {
    ...mapActions('auth', {
      oauthToken: 'oauthToken'
    }),
    showLast () {
      setInterval(() => {
        this.last += '.'
        if (this.last.length > 3) this.last = ''
      }, 500)
    },
    showBack () {
      setTimeout(() => {
        this.show = true
      }, 6000)
    },
    handleBack () {
      this.$router.push({ name: 'index' })
    }
  }
}
</script>

<style scoped>
@keyframes eat-1 {
  0% { transform: rotate(0deg) }
  50% { transform: rotate(-45deg) }
  100% { transform: rotate(0deg) }
}
@keyframes eat-2 {
  0% { transform: rotate(180deg) }
  50% { transform: rotate(225deg) }
  100% { transform: rotate(180deg) }
}
.loading-io > div:nth-child(2) {
  transform: translate(-15px,0);
}
.loading-io > div:nth-child(2) div {
  position: absolute;
  top: 40px;
  left: 40px;
  width: 120px;
  height: 60px;
  border-radius: 120px 120px 0 0;
  background: #f8b26a;
  animation: eat-1 1s linear infinite;
  transform-origin: 60px 60px
}
.loading-io > div:nth-child(2) div:nth-child(2) {
  animation: eat-2 1s linear infinite
}
.loading-io > div:nth-child(2) div:nth-child(3) {
  transform: rotate(-90deg);
  animation: none;
}@keyframes loading-io-3 {
   0% { transform: translate(190px,0); opacity: 0 }
   20% { opacity: 1 }
   100% { transform: translate(70px,0); opacity: 1 }
 }
.loading-io > div:nth-child(1) {
  display: block;
}
.loading-io > div:nth-child(1) div {
  position: absolute;
  top: 92px;
  left: -8px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #e15b64;
  animation: loading-io-3 1s linear infinite
}
.loading-io > div:nth-child(1) div:nth-child(1) { animation-delay: -0.67s }
.loading-io > div:nth-child(1) div:nth-child(2) { animation-delay: -0.33s }
.loading-io > div:nth-child(1) div:nth-child(3) { animation-delay: 0s }
.loading-spinner {
  width: 200px;
  height: 200px;
  display: inline-block;
  overflow: hidden;
}
.loading-io {
  width: 100%;
  height: 100%;
  position: relative;
  transform: translateZ(0) scale(1);
  backface-visibility: hidden;
  transform-origin: 0 0; /* see note above */
}
.loading-io div { box-sizing: content-box; }
</style>
