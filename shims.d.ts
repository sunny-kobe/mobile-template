declare module '*.vue' {
  import type { DefineComponent } from 'vue'

  const component: DefineComponent<object, object, any>
  export default component
}

declare module 'postcss-px-to-viewport';

// 行为验证码
declare class Captcha {
  private static instance
  private config
  private initialized
  private prefixName
  private el
  private dots
  private key
  private refreshNumber
  private refreshFlag
  private initCallback
  private verifyCallback
  private closeCallback?
  static init(config: ICaptchaConfig): Captcha
  private renderImage
  private registerEvent
  private removeEvent
  private captchaClickPos
  private updateDots
  constructor(config: ICaptchaConfig)
  open({ el, initCallback, verifyCallback, closeCallback }: openOptions): Promise<this>
  close(): void
  refresh(): Promise<void>
  verify(): Promise<void>
}
