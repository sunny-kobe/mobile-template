interface globalConfig {
  type: 'localStorage' | 'sessionStorage';
  prefix: string;
  expires: number;
  isEncrypt: boolean;
}

export type { globalConfig }