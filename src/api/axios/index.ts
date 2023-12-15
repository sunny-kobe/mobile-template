import { createAxiosInstance } from './axiosInstance';
const baseURL = (import.meta.env.VITE_BASE_URL as string) || ''

console.log(baseURL);
const axiosInstance = createAxiosInstance({
  baseURL,
  timeout: 3000,
});

export default axiosInstance;
