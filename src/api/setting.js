import request from '@/utils/request'
/**
 * 公司设置页面数据接口
 */

// 获取所有角色
export function getAllRole(params) {
  return request({
    url: '/sys/role',
    method: 'GET',
    params
  })
}
// 获取企业详情
export function getCompany(id) {
  return request({
    url: `/company/${id}`,
    method: 'GET'
  })
}
// 添加角色
export function addRole(data) {
  return request({
    url: '/sys/role',
    method: 'POST',
    data
  })
}
// 删除角色
export function deleteRole(id) {
  return request({
    url: `/sys/role/${id}`,
    method: 'DELETE'
  })
}
// 更新角色
export function updateRole(id, data) {
  return request({
    url: `/sys/role/${id}`,
    method: 'PUT',
    data
  })
}
// 获取角色详情
export function getRoleDetail(id) {
  return request({
    url: `/sys/role/${id}`,
    method: 'GET'
  })
}
