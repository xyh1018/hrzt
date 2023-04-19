import request from '@/utils/request'
/**
 * 组织架构页面数据接口
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
export function updateDepartmentDetailById(id, data) {
  return request({
    url: `/company/department/${id}`,
    method: 'PUT',
    data
  })
}
// 根据ID查询部门详情
export function getDepartmentDetailById(id) {
  return request({
    url: `/company/department/${id}`,
    method: 'GET'
  })
}
