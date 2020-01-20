import axios from './index'

export const knowledgeBySectionId = (sectionId) => {
  return axios.request({
    url: `/knowledge/search/section?id=${sectionId}`,
    method: 'get'
  })
}
