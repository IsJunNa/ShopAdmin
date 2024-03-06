//引入vue
import { createApp } from 'vue'
import App from '@/App.vue'
// 获取组件实例
const app = createApp(App)
// 引入element-ui
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// 设置element默认为中文
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
app.use(ElementPlus, {
  locale: zhCn,
})
// 导入svg图标配置代码
import 'virtual:svg-icons-register'
// 引入自定义插件
import GlobalComponents from '@/components'
app.use(GlobalComponents)
// 引入全局默认样式
import '@/styles/index.scss'
// 引入路由
import router from '@/router/index'
app.use(router)
// 引入pinia
import pinia from '@/store'
app.use(pinia)
// 挂载
app.mount('#app')