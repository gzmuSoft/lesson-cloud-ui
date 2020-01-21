import axios from './index'

export const sectionByCourseId = (courseId) => {
  return axios.request({
    url: `/section/search/course`,
    method: 'get',
    params: { id: courseId }
  })
}

export const sectionByCourseAndPassage = (courseId, parentId) => {
  return axios.request({
    url: `/section/search/courseAndPassage`,
    method: 'get',
    params: { courseId, passageId: parentId }
  })
}

export const sectionByParentId = (parentId) => {
  return axios.request({
    url: `/section/search/passage`,
    method: 'get',
    params: { passageId: parentId }
  })
}
