/* 路由相关组件库 */
import { defineStore } from 'pinia'
// 引入路由规则
import { constantRoute } from '@/router/route'
// 引入路由规则数据类型
import { RouterRluesType } from '../type/router'

const RouterRluesStore = defineStore('router', {
  state: (): RouterRluesType => {
    return {
      constantRoute,
    }
  },
  actions: {},
  getters: {},
})

export default RouterRluesStore
