import axios from './index'

export const semesterAll = () => {
  return axios.request({
    url: '/semester/search/all',
    method: 'get'
  })
}
