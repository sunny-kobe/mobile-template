// api/types.ts

/** 行为验证码参数 */
export interface ILoginParams {
  phone: string
}

/** 行为验证码响应 */
export interface ILoginData {
  token: string
}
