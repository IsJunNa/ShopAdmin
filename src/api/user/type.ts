/* 定义user接口数据 */

// 所有接口返回数据的数据类型(用于继承)
export interface RESTYPE {
  code: number
  message: string
  ok: boolean
}

// 用户登录(携带的参数)
export interface loginDataType {
  username: string
  password: string
}
// 用户登录(返回数据)
export interface loginResType extends RESTYPE {
  data: string
}

// 用户信息(返回数据)
export interface userInfoResType extends RESTYPE {
  data: {
    avatar: string
    buttons: string[]
    name: string
    roles: string[]
    routes: string[]
  }
}
