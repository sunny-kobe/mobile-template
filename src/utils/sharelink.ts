const baseURL = (import.meta.env.VITE_WEBSITE_URL as string) || ''
import { getStorage } from '~/utils/storage';

// console.log(baseURL);
// 原始的URL
let invitationCode = getStorage('myCode') || '';

// 创建一个URL对象
let url = new URL(baseURL);

// 添加查询参数
url.searchParams.set('invitationCode', invitationCode);

// 得到包含查询参数的完整URL
let shareUrl = url.toString();
// console.log(shareUrl);
export default shareUrl
