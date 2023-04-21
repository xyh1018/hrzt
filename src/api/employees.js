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
