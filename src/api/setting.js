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
