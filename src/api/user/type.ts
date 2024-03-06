// 用户登录传参数据类型
export interface loginForm {
  username: string
  password: string
}

// 用户登录返回数据类型
interface dataType {
  token?: string,
  message?: string
}

export interface loginResponseData {
  code: number
  data: dataType
}

// 用户信息返回数据类型
interface checkUserType {
  userId: number
  avatar: string
  username: string
  password: string
  desc: string
  roles: string[]
  buttons: string[]
  routes: string[]
  token: string
}

interface userType {
  checkUser: checkUserType
}

export interface userInfoType {
  code: number
  data: userType
}
