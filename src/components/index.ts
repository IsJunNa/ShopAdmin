// 自动将目录下的组件注册为全局组件
const allGlobalComponents = {}
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

export default {
  install(app: any) {
    Object.keys(allGlobalComponents).forEach((key) => {
      app.use(key)
    })
    // 将element-plus的所有图标注册为全局组件
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }
  },
}
