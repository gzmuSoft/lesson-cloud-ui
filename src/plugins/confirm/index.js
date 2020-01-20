import Vue from 'vue'
import Confirm from './Confirm'
import i18n from '@/locales/i18n'
const ConfirmConstructor = Vue.extend(Confirm)

const index = (option, ok = () => { console.log('ok') }) => {
  const defaultOption = {
    width: 290,
    titleClass: '',
    title: i18n.t('tip.question.delete'),
    content: '',
    contentClass: '',
    cancelClass: 'error',
    cancelText: i18n.t('action.cancel'),
    okClass: 'success',
    okText: i18n.t('action.ok')
  }
  option = Object.assign(defaultOption, option)
  option.show = true
  option.dialog = true
  const confirmDom = new ConfirmConstructor({
    el: document.createElement('v-row'),
    data: option,
    methods: {
      ok
    }
  })
  document.body.appendChild(confirmDom.$el)
}

const registryConfirm = () => {
  Vue.prototype.$confirm = index
}

export default registryConfirm
