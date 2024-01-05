// api/types.ts

/** 公共的接口响应范型 */
export interface HttpSuccessResponse<T> {
  code: number
  message: string
  data: T
}

/** 行为验证码参数 */
export interface ILoginParams {
  phone: string
}

/** 行为验证码响应 */
export interface ILoginData {
  token: string
}
