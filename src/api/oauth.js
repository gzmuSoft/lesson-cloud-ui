import axios from 'axios'
import { baseURL } from './config'

const AUTH_SERVER = baseURL + '/auth/serverUrl'
const AUTH_CODE = baseURL + '/auth/code'
const REFRESH_TOKEN = baseURL + '/auth/refresh'
const LOGOUT_URL = baseURL + '/auth/logout'

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
 * 刷新 token
 */
export const refreshToken = (token) => {
  let form = new FormData()
  form.append('token', token)
  return axios({
    url: REFRESH_TOKEN,
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
