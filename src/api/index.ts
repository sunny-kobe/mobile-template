import axiosInstance from '~/api/axios'
import { setStorage, getStorage } from '~/utils/storage';

let token = getStorage(' token ') || '';

// 行为验证码
export function getActionCode(data: any) {
  return axiosInstance.post('/hhwcard/bhcap/code', data)
}
// 行为验证码验证
export function checkActionCode<T>(data: T) {
  return axiosInstance.post('/hhwcard/bhcap/verify', data)
}
// 获取验证码
export function getLoginCode<T = any>(data: T) {
  return axiosInstance.post('/hhwcard/appointment/phoneCode', data)
}
// 手机号预约
export function phoneAppointment<T = any>(data: T) {
  return axiosInstance.post('/hhwcard/appointment/phone', data)
}
// 用户活动信息
export function getUserInfo<T = any>(data: T) {
  return axiosInstance.post('/hhwcard/user', data)
}
// 分享记录
export function shareRecord<T = any>(data: T) {
  return axiosInstance.post('/hhwcard/fission/shareRecord', data)
}
// 邀请记录
export function inviteRecord<T = any>(data: T) {
  return axiosInstance.post('/hhwcard/fission/invitationRecord', data)
}
// 单次任务
export function onceTask() {
  return axiosInstance.post('/hhwcard/activitytask/once', { token })
}
// 每日任务
export function dailyTask() {
  return axiosInstance.post('/hhwcard/activitytask/daily', { token })
}
// 关注抖音
export function followDouyin() {
  return axiosInstance.post('/hhwcard/follow/douyin', { token })
}
// 关注公众号
export function followWeiXi() {
  return axiosInstance.post('/hhwcard/follow/weixin', { token })
}
// 关注微博
export function followWeiBo() {
  return axiosInstance.post('/hhwcard/follow/weibo', { token })
}
// 确认分享
export function confirmShare<T = any>(data: T) {
  return axiosInstance.post('/hhwcard/fission/share', data)
}
// 五星角色列表
export function getFiveStarList() {
  return axiosInstance.post('/hhwcard/character/levelFive', { token })
}
// 奖品列表
export function getPrizeList<T = any>(data: T) {
  return axiosInstance.post('/hhwcard/lottery', data)
}
// 十连抽
export function tenDraw() {
  return axiosInstance.post('/hhwcard/lottery/tenxDraw', { token })
}
// 确认奖品
export function confirmPrize<T = any>(data: T) {
  return axiosInstance.post('/hhwcard/lottery/confirm', data)
}
