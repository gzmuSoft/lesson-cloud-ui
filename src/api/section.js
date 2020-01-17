import axios from './index'

export const searchByCourseId = (courseId) => {
  return axios.request({
    url: `/section/search/course?id=${courseId}`,
    method: 'get'
  })
}
