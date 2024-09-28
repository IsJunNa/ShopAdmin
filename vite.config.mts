import { defineConfig, loadEnv } from 'vite'
import VueSetupExtend from 'vite-plugin-vue-setup-extend'
import vue from '@vitejs/plugin-vue'
// 路径管理,给src配置别名,方便管理路径
import path from 'path'
// svg图标
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
// 引入mock
import { viteMockServe } from 'vite-plugin-mock'
// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // 获取.env文件中的变量
  let env = loadEnv(mode, process.cwd())
  return {
    // 配置svg图标
    plugins: [
      VueSetupExtend(),
      vue(),
      // svg图标配置
      createSvgIconsPlugin({
        // Specify the icon folder to be cached
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
        // Specify symbolId format
        symbolId: 'icon-[dir]-[name]',
      }),
      viteMockServe({
        localEnabled: command === 'serve',
      }),
    ],
    // 配置src路径别名为@
    resolve: {
      alias: {
        '@': path.resolve('./src'), // 相对路径别名配置，使用 @ 代替 src
      },
    },
    // 配置css全局变量
    css: {
      preprocessorOptions: {
        scss: {
          javascriptEnabled: true,
          additionalData: '@import "./src/styles/variable.scss";',
        },
      },
    },
    // 配置解决代理跨域
    server: {
      proxy: {
        [env.VITE_APP_URL]: {
          target: env.VITE_APP_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        }
      },
    },
    // 查看打包文件体积大小
    chainWebpack: (config: { plugin: (arg0: string) => { (): any; new(): any; use: { (arg0: any): void; new(): any } } }) => {
      // 查看打包文件体积大小
      config
        .plugin('webpack-bundle-analyzer')
        .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
    }
  }
})



