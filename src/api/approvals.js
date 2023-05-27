import request from '@/utils/request'
/**
 * 审批页面数据接口
 */

export function getApprovalList(page, size, data) {
  return request({
    url: `/user/process/instance/${page}/${size}`,
    method: 'PUT',
    data
  })
}
