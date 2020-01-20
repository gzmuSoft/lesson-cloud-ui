/**
 * vuetify 分页转换为后端支持的分页
 * page: 1
 * itemsPerPage: 10
 * sortBy: Array(2)
 * sortDesc: Array(2)
 * groupBy: Array(0)
 * groupDesc: Array(0)
 * @param options 参数
 */
export const toPage = ({ page, itemsPerPage, sortBy, sortDesc }) => {
  let sort = ''
  for (const index in sortBy) {
    let condition = `&sort=${sortBy[index]}`
    if (sortDesc[index]) condition += ',desc'
    else condition += ',asc'
    sort += condition
  }
  sort += '&sort=id,asc'
  return {
    page: page - 1,
    size: itemsPerPage,
    sort: sort.substring(1, sort.length)
  }
}

export const options = {
  sortBy: [ 'sort' ],
  sortDesc: [ false ]
}

export const footer = {
  itemsPerPageOptions: [5, 10, 15, 20],
  showCurrentPage: true,
  showFirstLastPage: true
}
