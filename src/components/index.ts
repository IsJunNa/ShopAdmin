import Category from '@/components/Category/index.vue'
import Code from '@/components/Code/index.vue'

// 自动将目录下的组件注册为全局组件
const allGlobalComponents = { Category, Code }
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

export default {
  install(app: any) {
    Object.keys(allGlobalComponents).forEach((key) => {
      app.component(key, allGlobalComponents[key])
    })
    // 将element-plus的所有图标注册为全局组件
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }
  },
}
