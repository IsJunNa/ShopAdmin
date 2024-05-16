/* API接口 */
import { reqLogin, reqUserInfo, reqLogout } from '@/api/user'

/* 用户相关数据 */
import { defineStore } from 'pinia'

/* 仓库数据的数据类型 */
import { userType } from '@/store/type/user'

import { useRouter } from 'vue-router'
const $router = useRouter()

/* token工具类 */
import { setToken, getToken, deleteToken } from '@/utils/token'
import { ElMessage } from 'element-plus'
//引入深拷贝方法
import { constantRoute, asnycRoute } from '@/router/route'
import cloneDeep from 'lodash/cloneDeep'
import router from '@/router'
//用于过滤当前用户需要展示的异步路由
function filterAsyncRoute(asnycRoute: any, routes: any) {
  return asnycRoute.filter((item: any) => {
    if (routes.includes(item.name)) {
      if (item.children && item.children.length > 0) {
        item.children = filterAsyncRoute(item.children, routes)
      }
      return true
    }
  })
}

const useUserStore = defineStore('User', {
  /* 数据 */
  state: (): userType => {
    return {
      // 用户token
      token: getToken(),
      // 用户信息
      username: '',
      // 用户头像
      avatar: '',
      // 异步路由
      menuRoutes: constantRoute,
      // 按钮权限
      buttons: [],
    }
  },

  /* 方法 */
  actions: {
    // 用户登录
    async userLogin(loginInfo) {
      const res: any = await reqLogin(loginInfo)
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
        this.username = res.data.name
        this.avatar = res.data.avatar
        this.buttons = res.data.buttons

        //计算当前用户需要展示的异步路由
        const userAsyncRoute = filterAsyncRoute(
          cloneDeep(asnycRoute),
          res.data.routes,
        )
        //菜单需要的数据整理完毕
        this.menuRoutes = [...constantRoute, ...userAsyncRoute]
        //目前路由器管理的只有常量路由:用户计算完毕异步路由、任意路由动态追加
        userAsyncRoute.forEach((route: any) => {
          router.addRoute(route)
        })
      } else {
        ElMessage({ type: 'error', message: '获取用户信息失败,请重新登录' })
        await this.logout()
        // $router.push({ path: '/login', query: { path: $route.path } })
        // 退出登录可以保持登录前的路由
        $router.push({ path: '/login' })
      }
    },
    // 退出登录
    async logout() {
      this.username = ''
      this.avatar = ''
      this.token = ''
      deleteToken()
      await reqLogout()
    },
  },
  getters: {},
})

export default useUserStore
