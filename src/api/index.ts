import axiosInstance from '~/api/axios'

// 示例
export function getActionCode(data: any) {
  return axiosInstance.post('/hhwcard/bhcap/code', data)
}
