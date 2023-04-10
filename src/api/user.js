import request from '@/utils/request'

// 用户登陆接口
export function login(data) {
  return request({
    url: '/sys/login',
    method: 'POST',
    data: data
  })
}
//
export function logout() {

}
// 获取用户资料
export function getInfo(token) {
  return request({
    url: '/sys/profile',
    method: 'POST'
  })
}
// 根据 user Id 获取用户详情
export function getUserDetailById(id) {
  return request({
    url: `/sys/user/${id}`
  })
}
