import axios from 'axios'
import { baseURL } from './config'

// const OAUTH_TOKEN = baseURL + '/oauth/token'
// const CHECK_TOKEN = baseURL + '/oauth/check_token'
const AUTH_SERVER = baseURL + '/auth/serverUrl'
const AUTH_CODE = baseURL + '/auth/code'
const LOGOUT_URL = baseURL + '/auth/logout'
// const AUTH_ME = baseURL + '/auth/me'

/**
 * 请求授权服务器地址
 */
export const authServer = () => {
  axios({
    url: AUTH_SERVER,
    method: 'get'
  }).then(res => {
    window.location = res.data.authorization_url
  }).catch(error => {
    console.error(error)
  })
}

/**
 * 授权码模式获取token
 */
export const authCode = (code) => {
  let form = new FormData()
  form.append('code', code)
  return axios({
    url: AUTH_CODE,
    method: 'post',
    data: form
  })
}

/**
 * 获取退出登录地址.
 */
export const logoutUrl = (security) => {
  const param = security ? '?security=true' : ''
  axios({
    url: LOGOUT_URL + param,
    method: 'get'
  }).then(res => {
    window.location = res.data.logout_url
  }).catch(error => {
    console.error(error)
  })
}
