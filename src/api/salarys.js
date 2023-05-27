import request from '@/utils/request'
// 查询用户薪资列表
export function getSalarysList(data) {
  return request({
    url: '/salarys/list',
    method: 'POST',
    data
  })
}
// 查询用户薪资
export function getSalarys(userId) {
  return request({
    url: `/salarys/modify/${userId}`,
    method: 'GET'
  })
}
// 调薪
export function setSalarys(userId, data) {
  return request({
    url: `/salarys/modify/${userId}`,
    method: 'POST',
    data
  })
}
