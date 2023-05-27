import request from '@/utils/request'
/**
 * 考勤页面数据接口
 */

export function getAttendList(params) {
  return request({
    url: '/attendances',
    method: 'GET',
    params
  })
}
