import request from '@/utils/request'

// 用户登陆接口
export function login(data) {
  return request({
    url: '/sys/login',
    method: 'POST',
    data: data
  })
}
// 获取用户资料
export function getInfo(token) {
  return request({
    url: '/sys/profile',
    method: 'POST'
  })
}

export function logout() {

}
