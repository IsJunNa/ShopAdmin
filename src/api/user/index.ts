// 用户相关的接口
import request from '@/utils/request'
// 数据类型
import { loginDataType, loginResType, userInfoResType } from '@/api/user/type'

// 统一管理接口
enum API {
  LOGIN_URL = '/admin/acl/index/login',
  USERINFO_URL = '/admin/acl/index/info',
  LOGOUT_URL = '/admin/acl/index/logout',
}

// 用户登录
export const reqLogin = (data: loginDataType) =>
  request<loginResType>({ url: API.LOGIN_URL, data, method: 'POST' })
// 获取用户信息
export const reqUserInfo = () =>
  request<any, userInfoResType>({ url: API.USERINFO_URL, method: 'GET' })
//退出登录
export const reqLogout = () =>
  request<null>({ url: API.LOGOUT_URL, method: 'POST' })
