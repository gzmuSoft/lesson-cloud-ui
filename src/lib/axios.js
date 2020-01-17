import Vue from 'vue'
import axios from 'axios'
import store from '@/store'
import { baseURL } from '@/api/config'
import { authServer } from '@/api/oauth'

// import router from '@/router'

class HttpRequest {
  constructor (baseUrl = baseURL) {
    this.baseUrl = baseUrl
  }

  /**
   * 请求的全局配置
   *
   * @returns {{headers: {}, baseURL: *}}
   */
  getGlobalConfig () {
    return {
      baseURL: this.baseUrl,
      headers: {}
    }
  }

  interceptors (instance, url) {
    instance.interceptors.request.use(config => {
      // 如果有token 在 header里加authorization
      if (store.getters['auth/isAuth']) {
        let token = store.getters['auth/token']
        config.headers.Authorization = 'Bearer ' + token
      }
      return config
    }, error => {
      return Promise.reject(error)
    })
    instance.interceptors.response.use(res => {
      return res
    }, error => {
      let message = '未知错误'
      if (typeof (error.response) === 'undefined') {
        message = '未经授权:访问由于凭据无效被拒绝'
      } else {
        switch (error.response.status) {
          case 400:
            message = '请求错误:访问由于请求体无效被拒绝'
            break
          case 401:
            message = '未经授权:访问由于凭据无效被拒绝'
            Vue.prototype.$toast.error(message)
            authServer()
            break
          case 403:
            message = '鉴权失败:您没有权限访问该资源'
            break
          case 404:
            message = '资源未找到:找不到您访问的资源信息'
            break
          case 500:
            message = '服务错误:服务器出现内部错误，请联系管理员'
            break
        }
        if (error.response.data !== undefined && (error.response.data.hasOwnProperty('error') || error.response.data.hasOwnProperty('error_description'))) {
          message = error.response.data.error + ': ' + error.response.data.error_description
        }
      }
      Vue.prototype.$toast.error(message)
      return Promise.reject(error.response)
    })
  }

  /**
   * 创建请求实例
   *
   * @param options 请求参数
   * @returns {*} 结果
   */
  request (options) {
    const instance = axios.create()
    options = Object.assign(this.getGlobalConfig(), options)
    this.interceptors(instance, options.url)
    return instance(options)
  }
}

export default HttpRequest
