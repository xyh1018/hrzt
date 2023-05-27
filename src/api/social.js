import request from '@/utils/request'
/**
 * 社保页面数据接口
 */

// 查询企业用户社保列表
export function getSocialList(data) {
  return request({
    url: '/social_securitys/list',
    method: 'POST',
    data
  })
}
// 查询社保历史归档列表
export function getHistorysList(year) {
  return request({
    url: `/social_securitys/historys/${year}/list`,
    method: 'GET'
  })
}
// 查询月份数据报表
export function getListByMonth(yearMonth, params) {
  return request({
    url: `/social_securitys/historys/${yearMonth}`,
    method: 'GET',
    params
  })
}
