// 路由鉴权
import router from '@/router/index'
// 引入进度条插件及其样式
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
// 清除nprogress进度条右侧加载小圆圈
nprogress.configure({ showSpinner: false })
// 获取user小仓库的token数据,判断用户的登陆状态
import pinia from '@/store'
import useUserStore from '@/store/modules/user'
const userStore = useUserStore(pinia)
// 引入全局变量定义浏览器窗口标题
import setting from '@/setting'

// 全局前置守卫
router.beforeEach(async (to, _, next) => {
  // 没有token
  if (!userStore.token) {
    if (to.path !== '/login') next({ path: '/login' })
    else next()
  }
  // 有token
  else {
    // 登录成功禁止访问登录页
    if (to.path === '/login' || to.path === '/') next({ path: '/home' })
    else {
      try {
        if (to.path != '/' && to.path != '/error')
          localStorage.setItem('path', to.path)
        await userStore.getUserInfo()
        if (to.path === '/error') {
          next(localStorage.getItem('path'))
        } else {
          next()
        }
      } catch {
        await userStore.logout()
        next({ path: '/login', query: { redirect: to.path } })
      }
    }
  }
  nprogress.start()
  document.title = setting.title + '-' + to.meta.title
})

// 全局后置守卫
router.afterEach(() => {
  nprogress.done()
})
