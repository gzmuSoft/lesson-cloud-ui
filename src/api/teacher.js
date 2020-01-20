import axios from './index'

export const teacherQuestion = (
  { passageId = 0, sectionId = 0, knowledgeId = 0, name = '', isPublic = true,
    page = 0, size = 10, sort = 'sort=sort,asc&sort=id,asc' }) => {
  return axios.request({
    url: `/teacher/search/question?${sort}`,
    method: 'get',
    params: { passageId, sectionId, knowledgeId, name, isPublic, page, size }
  })
}
