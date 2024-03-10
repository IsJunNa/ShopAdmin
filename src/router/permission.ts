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
router.beforeEach((to, from, next) => {
  // 没有token
  if (!userStore.token) {
    if (to.path !== '/login') next({ path: '/login' })
    else next()
  }
  // 有token
  else {
    if (
      (to.path === '/login' || to.path === '/') &&
      userStore.username &&
      userStore.avatar
    )
      next({ path: '/home' })
    else next()
  }
  nprogress.start()
  document.title = setting.title + '-' + to.meta.title
})

// 全局后置守卫
router.afterEach((to, from) => {
  nprogress.done()
})
