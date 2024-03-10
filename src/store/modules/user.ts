/* API接口 */
import { reqLogin, reqUserInfo, reqLogout } from '@/api/user'

/* 用户相关数据 */
import { defineStore } from 'pinia'

/* 仓库数据的数据类型 */
import { userType } from '@/store/type/user'

/* token工具类 */
import { setToken, getToken, deleteToken } from '@/utils/token'
import { ElMessage } from 'element-plus'

let useUserStore = defineStore('User', {

  /* 数据 */
  state: (): userType => {
    return {
      // 用户token
      token: getToken(),
      // 用户信息
      username: '',
      // 用户头像
      avatar: ''
    }
  },

  /* 方法 */
  actions: {
    // 用户登录
    async userLogin(loginInfo) {
      let res: any = await reqLogin(loginInfo)
      // 登陆成功保存返回的token
      if (res.code === 200) {
        this.token = res.data
        setToken(this.token)
        return 'ok'
      }
      // 登陆失败返回错误信息
      else {
        return Promise.reject('密码错误')
      }
    },
    // 获取用户信息
    async getUserInfo() {
      const res = await reqUserInfo()
      if (res.code === 200) {
        // 储存用户信息
        this.username = res.data.name;
        this.avatar = res.data.avatar;
     } 
    },
    // 退出登录
    async logout() {
      this.username = ''
      this.avatar = ''
      deleteToken()
      await reqLogout()
    }

  },
  getters: {},
})

export default useUserStore
