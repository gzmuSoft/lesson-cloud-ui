import axios from './index'

export const searchByCourseId = (courseId) => {
  return axios.request({
    url: `/section/search/course?id=${courseId}`,
    method: 'get'
  })
}

export const sectionByCourseAndType = (courseId, type) => {
  return axios.request({
    url: `/section/search/courseAndType?courseId=${courseId}&type=${type}`,
    method: 'get'
  })
}

export const sectionByCourseAndParentAndType = (courseId, parentId, type) => {
  return axios.request({
    url: `/section/search/courseAndParentAndType`,
    method: 'get',
    params: { courseId, parentId, type }
  })
}
