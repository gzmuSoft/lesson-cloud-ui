import authAxios from './index'

export const authMe = () => {
  return authAxios.request({
    url: '/auth/me',
    method: 'get'
  })
}

export const authMenu = () => {
  return authAxios.request({
    url: '/auth/menu',
    method: 'get'
  })
}
