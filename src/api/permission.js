import request from '@/utils/request'
// 获取权限列表
export function getPermission() {
  return request({
    url: '/sys/permission',
    method: 'GET'
  })
}
// 添加权限点
export function addPermission(data) {
  return request({
    url: '/sys/permission',
    method: 'POST',
    data
  })
}
// 删除权限点
export function deletePermission(id) {
  return request({
    url: `/sys/permission/${id}`,
    method: 'DELETE'
  })
}
// 更新权限点
export function updatePermission(id, data) {
  return request({
    url: `/sys/permission/${id}`,
    method: 'PUT',
    data
  })
}
// 获取权限点
export function getOnePermission(id) {
  return request({
    url: `/sys/permission/${id}`,
    method: 'GET'
  })
}
