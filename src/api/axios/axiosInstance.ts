import axios, { type AxiosInstance } from 'axios'
import { setupInterceptors } from './interceptor'

interface RequestOptions {
  baseURL: string
  timeout?: number
  headers?: Record<string, string>
}

export function createAxiosInstance({
  baseURL,
  timeout = 5000,
  headers = {},
}: RequestOptions): AxiosInstance {
  const instance = axios.create({
    baseURL,
    timeout,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      // 'Content-Type': 'text/html; charset=utf-8',
      ...headers,
    },
  })

  setupInterceptors(instance)

  return instance
}
