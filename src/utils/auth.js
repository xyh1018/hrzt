import Cookies from 'js-cookie'

const TokenKey = 'hrsaas-ihrm-token'
const TimeKey = 'hrsaas-ihrm-key'

// 获取token
export function getTokenU() {
  return Cookies.get(TokenKey)
}
// 设置token
export function setTokenU(token) {
  return Cookies.set(TokenKey, token)
}
// 删除token
export function removeTokenU() {
  return Cookies.remove(TokenKey)
}
// 设置时间戳
export function setTimeStampU() {
  return Cookies.set(TimeKey, Date.now())
}
// 获取时间戳
export function getTimeStampU() {
  return Cookies.get(TimeKey)
}
