import request from '@/utils/request'
/**
 * 员工页面数据接口
 */

// 获员工列表
export function getEmployee(params) {
  return request({
    url: '/sys/user',
    method: 'GET',
    params
  })
}
// 删除员工
export function deleteEmployee(id) {
  return request({
    url: `/sys/user/${id}`,
    method: 'DELETE'
  })
}
// 添加员工
export function addEmployee(data) {
  return request({
    url: '/sys/user',
    method: 'POST',
    data
  })
}
// 批量导入员工数据
export function importEmployee(data) {
  return request({
    url: '/sys/user/batch',
    method: 'POST',
    data
  })
}
