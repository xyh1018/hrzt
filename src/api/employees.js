import request from '@/utils/request'
/**
 * 员工页面数据接口
 */

// 获取员工列表
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
// 保存员工基本信息
export function saveUserInfo(data) {
  return request({
    url: `/sys/user/${data.id}`,
    method: 'PUT',
    data
  })
}
// 获取员工个人信息
export function getEmPersonalInfo(id) {
  return request({
    url: `/employees/${id}/personalInfo`,
    method: 'GET'
  })
}
// 保存员工个人信息
export function saveEmPersonalInfo(id, data) {
  return request({
    url: `/employees/${id}/personalInfo`,
    method: 'PUT',
    data
  })
}
// 获取员工基本信息
export function getEmBaseInfo(id) {
  return request({
    url: `/sys/user/${id}`,
    method: 'GET'
  })
}
// 获取员工岗位信息
export function getJobInfo(id) {
  return request({
    url: `/employees/${id}/jobs`,
    method: 'GET'
  })
}
// 保存员工岗位信息
export function saveJobInfo(id, data) {
  return request({
    url: `/employees/${id}/jobs`,
    method: 'PUT',
    data
  })
}
