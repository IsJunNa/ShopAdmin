/* 用户相关数据 */
import { defineStore } from 'pinia'
/* API接口 */
import { reqLogin } from '@/api/user'
/* 数据类型 */
import { loginForm, loginResponseData } from '@/api/user/type'
import { userType } from '@/store/type/type'
/* token工具类 */
import { setToken, getToken } from '@/utils/token'

let useUserStore = defineStore('User', {
  state: (): userType => {
    return {
      token: getToken(),
    }
  },
  actions: {
    // 用户登录
    async userLogin(loginInfo: loginForm) {
      let res: loginResponseData | any = await await reqLogin(loginInfo)
      if (res.code === 200) {
        this.token = res.data.token
        setToken(this.token)
        return 'ok'
      } else {
        return Promise.reject(new Error(res.data.message))
      }
    },
  },
  getters: {},
})

export default useUserStore
