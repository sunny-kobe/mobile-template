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
