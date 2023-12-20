import axiosInstance from '~/api/axios'

// 行为验证码
export function getActionCode(data: any) {
  return axiosInstance.post('/hhwcard/bhcap/code', data)
}
