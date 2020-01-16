import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import i18n from './locales/i18n'
import _ from 'lodash'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'

Vue.config.productionTip = false
Vue.prototype._ = _
Vue.use(Toast, {
  maxToasts: 20,
  newestOnTop: true
})

new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: h => h(App)
}).$mount('#app')
