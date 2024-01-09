import { type AxiosInstance } from 'axios'

import { generateSignature, objKeySort } from './signature' // 导入签名生成函数
import { getStorage } from '@/utils/storage'

const keys = import.meta.env.VITE_NUXT_KEY as string || ''

export function setupInterceptors(instance: AxiosInstance) {
  instance.interceptors.request.use(
    (config) => {
      // 在请求发送前做一些处理
      if (config.method === 'post') {
        const requestData: Record<string, string> = objKeySort(config.data)

        const token = getStorage('token') // 获取token
        const timestamp = Math.floor(new Date().getTime() / 1000) // 生成timestamp
        const md5Data = config.md5Data || {} // 确保 md5Data 是一个对象
        const signature = generateSignature(requestData, timestamp, keys, md5Data) // 生成sign

        // 活动编码
        const activityCode = 'CardActivity2312'

        const body = new URLSearchParams()
        for (const key in requestData)
          body.append(key, requestData[key]) // 将原始请求数据添加到 body 中

        body.append('timestamp', `${timestamp}`)
        body.append('signature', signature)
        body.append('activityCode', activityCode)

        if (token !== null)
          body.append('token', token)

        config.data = body
      }
      return config
    },
    (error) => {
      // 处理请求错误
      return Promise.reject(error)
    },
  )
  // 响应拦截
  instance.interceptors.response.use(
    (response) => {
      if (response.data.code === 0) {
        // 如果 code 为 0，返回 data
        return response.data
      }
      else {
        // 如果 code 不为 0，抛出一个错误
        throw new Error(response.data.msg)
      }
    },
    (error) => {
      // 处理响应错误
      return Promise.reject(error)
    },
  )
}
