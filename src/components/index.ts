// 自动将目录下的组件注册为全局组件
const allGlobalComponents = {}
export default {
  install(app: any) {
    Object.keys(allGlobalComponents).forEach((key) => {
      app.use(key)
    })
  },
}
