import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
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
    Message.error(error.message) // 错误警告
    return Promise.reject(error)
  }
)

// 导出
export default request
