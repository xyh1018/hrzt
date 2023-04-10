import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getTimeStampU } from '@/utils/auth'
import router from '@/router'
// 创建axios实例
const request = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  // 基础地址从开发环境或者生产环境中获取
  // 开发环境：‘/api’
  // 生产环境：‘/prod-api’
  timeout: 5000 // 请求超时 单位：ms
})

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    console.log('请求拦截器', config)
    if (store.getters.token) {
      // token失效主动处理
      if (IsCheckTimeout()) {
        // 如果token超时，删除用户资料和token
        store.dispatch('user/logout')
        // 然后跳转到登陆页
        router.push('/login')
        return Promise.reject(new Error('token失效'))
      }
      config.headers['Authorization'] = `Bearer ${store.getters.token}`
    }
    return config
  }, (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    console.log('响应拦截器', response)
    const { success, message, data } = response.data
    // success: boolean; message: string; data: string;
    if (success) {
      // 如果success为true，直接返回data
      return data
    } else {
      // 如果success为false，弹出错误警告
      // 并返回一个Promise错误对象
      Message.error(message) // 错误警告
      return Promise.reject(new Error(message))
    }
  },
  (error) => {
    // token失效被动处理
    if (error.response && error.response.data && error.response.data.code === 10002) {
      store.dispatch('user/logout')
      router.push('/login')
    } else {
      Message.error(error.message) // 错误警告
    }
    return Promise.reject(error)
  }
)
// token超时时间
const Timeout = 3600
// 检查token是否超时
function IsCheckTimeout() {
  const now = Date.now() // 当前时间戳
  const timeStamp = getTimeStampU() // 缓存时间戳
  return (now - timeStamp) / 1000 > Timeout
}
// 导出
export default request
