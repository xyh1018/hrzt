import request from '@/utils/request'
/**
 * 获取组织架构页面数据
 */

// 查询企业的部门列表
export function getDepartmentList() {
  return request({
    url: '/company/department',
    method: 'GET'
  })
}
// 新增部门
export function setNewDepartment(data) {
  return request({
    url: '/company/department',
    method: 'POST',
    data
  })
}
// 根据ID删除部门
export function deleteDepartmentById(id) {
  return request({
    url: `/company/department/${id}`,
    method: 'DELETE'
  })
}
// 根据ID修改部门详情
export function updateDepartmentDetailById(id) {
  return request({
    url: `/company/department/${id}`,
    method: 'PUT'
  })
}
// 根据ID查询部门详情
export function getDepartmentDetailById(id) {
  return request({
    url: `/company/department/${id}`,
    method: 'GET'
  })
}
