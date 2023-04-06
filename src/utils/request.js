import axios from 'axios'
import { Message } from 'element-ui'
// 创建axios实例
const request = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000 // 请求超时 单位：ms
})

// 请求拦截器
request.interceptors.request.use()

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    const { success, message, data } = response.data
    if (success) {
      return data
    } else {
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
