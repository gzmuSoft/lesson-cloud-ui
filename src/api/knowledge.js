import axios from './index'

export const searchBySectionId = (sectionId) => {
  return axios.request({
    url: `/knowledge/search/section?id=${sectionId}`,
    method: 'get'
  })
}
