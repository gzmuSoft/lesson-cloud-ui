/**
 * 获取 url 参数
 *
 * @param name 参数名称
 * @returns {string|null}
 */
export const getUrlParams = (name) => {
  const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
  const r = window.location.search.substr(1).match(reg)
  if (r != null) return unescape(r[2])
  return null
}

/**
 * 避免使用过多的try catch
 * @param promise
 * @returns {Promise<T | [any]>}
 */
export const to = (promise) => {
  return promise.then(data => {
    return [null, data]
  })
    .catch(err => [err])
}
