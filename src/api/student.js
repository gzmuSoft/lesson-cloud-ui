import axios from './index'

export const studentCourseBySemester = (id) => {
  return axios.request({
    url: `/student/search/semester/${id}/logicClass`,
    method: 'get'
  })
}
