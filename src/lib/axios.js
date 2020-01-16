// import Vue from 'vue'
// import axios from 'axios'
// import store from '@/store'
import { baseURL } from '_api/config'

class HttpRequest {
  constructor (baseUrl = baseURL) {
    this.baseUrl = baseUrl
    // 请求队列
    this.queue = {}
  }

  /**
   * 请求的全局配置
   *
   * @returns {{headers: {}, baseURL: *}}
   */
  getGlobalConfig () {
    return {
      baseURL: this.baseUrl,
      headers: {
        //
      }
    }
  }

  interceptors (instance, url) {
    instance.interceptors.request.use(config => {
    })
  }
}

export default HttpRequest
