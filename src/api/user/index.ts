// 用户相关的接口
import request from "@/utils/request";
// 数据类型
import { loginForm, loginResponseData, userInfoType } from './type'

// 统一管理接口
enum API {
    LOGIN_URL = '/user/login',
    USERINFO_URL = '/user/info'
}

export const reqLogin = (data: loginForm) => request<loginResponseData>({ url: API.LOGIN_URL, data, method: 'POST' })
export const reqUserInfo = () => request<userInfoType>({ url: API.USERINFO_URL, method: 'GET' })