import axios from './index'

export const courseByNameAndTypeAndSelf = ({ name = '', type = '', self = false,
  page = 0, size = 10, sort = 'sort=sort,asc&sort=id,asc' }) => {
  return axios.request({
    url: `/course/search/byNameAndTypeAndSelf?${sort}`,
    method: 'get',
    params: { name, type, self, page, size }
  })
}
