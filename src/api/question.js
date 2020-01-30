import axios from './index'

export const questionCorrelation = (id) => {
  return axios.request({
    url: `/question/search/knowledgeCorrelation/${id}`,
    method: 'get'
  })
}

export const questionDelete = (id) => {
  return axios.request({
    url: `/question/search/question/${id}`,
    method: 'patch'
  })
}

export const questionSaveOrUpdate = (ids, question, questionDetail) => {
  question.questionDetail = null
  return axios.request({
    url: '/question/search/question',
    method: 'post',
    data: { ids, question, questionDetail }
  })
}
