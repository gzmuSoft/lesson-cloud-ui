import axios from './index'

/**
 * 获取所有资源（分页）
 *
 * @returns 响应
 */
export const getAllByPage = (resource, params) => {
  return axios.request({
    url: `/${resource}`,
    method: 'get',
    params: params
  })
}

/**
 * 删除指定链接
 *
 * @param resource self 链接
 * @returns 响应
 */
export const deleteByLink = (resource) => {
  return axios.request({
    url: `/${resource}`,
    method: 'delete'
  })
}

/**
 * 添加一个资源
 *
 * @param resource 资源名称
 * @param data 添加的数据
 * @returns {*} 结果
 */
export const addOne = (resource, data) => {
  return axios.request({
    url: `/${resource}`,
    method: 'post',
    data: data
  })
}

/**
 * 更新一个资源
 *
 * @param resource 资源名称
 * @param data 资源
 * @param data 更新数据
 * @returns {*} 请求结果
 */
export const putOne = (resource, data) => {
  return axios.request({
    url: `/${resource}/${data.id}`,
    method: 'put',
    data: data
  })
}

/**
 * 更新一个资源
 *
 * @param resource 资源名称
 * @param id 资源 ID
 * @param data 更新数据
 * @returns {*} 请求结果
 */
export const patchOne = (resource, id, data) => {
  return axios.request({
    url: `/${resource}/${id}`,
    method: 'patch',
    data: data
  })
}

/**
 * 获取一个资源
 *
 * @param resource 资源名称
 * @param id 资源 ID
 * @returns {*} 请求结果
 */
export const getOne = (resource, id) => {
  return axios.request({
    url: `/${resource}/${id}`,
    method: 'get'
  })
}

/**
 * 模糊查询获取资源
 *
 * @returns 响应
 */
export const resourceByNameLike = (resource, name) => {
  return axios.request({
    url: `/${resource}/search/name?containing=${name}`,
    method: 'get'
  })
}
