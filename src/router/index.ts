import { createRouter, createWebHashHistory } from 'vue-router'
import { constantRoute } from '@/router/route'

const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoute,
  // 切换页面返回顶部
  scrollBehavior() {
    return {
      left: 0,
      top: 0,
    }
  },
})

export default router
