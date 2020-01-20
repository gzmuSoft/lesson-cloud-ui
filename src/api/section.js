import axios from './index'

export const sectionByCourseId = (courseId) => {
  return axios.request({
    url: `/section/search/course`,
    method: 'get',
    params: { id: courseId }
  })
}

export const sectionByCourseAndType = (courseId, type) => {
  return axios.request({
    url: `/section/search/courseAndType`,
    method: 'get',
    params: { courseId, type }
  })
}

export const sectionByCourseAndParentAndType = (courseId, parentId, type) => {
  return axios.request({
    url: `/section/search/courseAndParentAndType`,
    method: 'get',
    params: { courseId, parentId, type }
  })
}

export const sectionByParentId = (parentId) => {
  return axios.request({
    url: `/section/search/passage`,
    method: 'get',
    params: { passageId: parentId }
  })
}
