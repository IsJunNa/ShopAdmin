import axios from 'axios'
// 引入element弹窗组件
import { ElMessage } from 'element-plus'
// 引入user小仓库获取token
import { getToken } from '@/utils/token'

//对axios二次封装
const request = axios.create({
  baseURL: import.meta.env.VITE_APP_URL,
  timeout: 5000, //超时时间
})

// 请求拦截器
request.interceptors.request.use((config) => {
  // 将token携带进请求头中
  if (getToken()) config.headers.token = getToken()
  return config
})

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    let message: string = ''
    const status: number = error.response.status
    switch (status) {
      case 401:
        message = 'token过期'
        break
      case 403:
        message = '无权访问'
        break
      case 404:
        message = '请求地址错误'
        break
      case 500:
        message = '服务器出现问题'
        break
      default:
        message = '网络出现问题'
        break
    }
    ElMessage({
      type: 'error',
      message,
    })
    return Promise.reject(error)
  },
)

export default request
