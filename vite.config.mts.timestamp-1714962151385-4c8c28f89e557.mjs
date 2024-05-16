// vite.config.mts
import { defineConfig, loadEnv } from "file:///D:/%E6%A1%8C%E9%9D%A2/ShopAdmin/node_modules/.pnpm/vite@5.1.4_@types+node@20.11.25_sass@1.71.1/node_modules/vite/dist/node/index.js";
import VueSetupExtend from "file:///D:/%E6%A1%8C%E9%9D%A2/ShopAdmin/node_modules/.pnpm/vite-plugin-vue-setup-extend@0.4.0_vite@5.1.4/node_modules/vite-plugin-vue-setup-extend/dist/index.mjs";
import vue from "file:///D:/%E6%A1%8C%E9%9D%A2/ShopAdmin/node_modules/.pnpm/@vitejs+plugin-vue@5.0.4_vite@5.1.4_vue@3.4.21/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import path from "path";
import { createSvgIconsPlugin } from "file:///D:/%E6%A1%8C%E9%9D%A2/ShopAdmin/node_modules/.pnpm/vite-plugin-svg-icons@2.0.1_vite@5.1.4/node_modules/vite-plugin-svg-icons/dist/index.mjs";
import { viteMockServe } from "file:///D:/%E6%A1%8C%E9%9D%A2/ShopAdmin/node_modules/.pnpm/vite-plugin-mock@2.9.6_mockjs@1.1.0_rollup@2.79.1_vite@5.1.4/node_modules/vite-plugin-mock/dist/index.js";
var vite_config_default = defineConfig(({ command, mode }) => {
  let env = loadEnv(mode, process.cwd());
  return {
    // 配置svg图标
    plugins: [
      VueSetupExtend(),
      vue(),
      // svg图标配置
      createSvgIconsPlugin({
        // Specify the icon folder to be cached
        iconDirs: [path.resolve(process.cwd(), "src/assets/icons")],
        // Specify symbolId format
        symbolId: "icon-[dir]-[name]"
      }),
      viteMockServe({
        localEnabled: command === "serve"
      })
    ],
    // 配置src路径别名为@
    resolve: {
      alias: {
        "@": path.resolve("./src")
        // 相对路径别名配置，使用 @ 代替 src
      }
    },
    // 配置css全局变量
    css: {
      preprocessorOptions: {
        scss: {
          javascriptEnabled: true,
          additionalData: '@import "./src/styles/variable.scss";'
        }
      }
    },
    // 配置解决代理跨域
    server: {
      proxy: {
        [env.VITE_APP_URL]: {
          target: env.VITE_APP_URL,
          changeOrigin: true,
          rewrite: (path2) => path2.replace(/^\/api/, "")
        }
      }
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcubXRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDpcXFxcXHU2ODRDXHU5NzYyXFxcXFNob3BBZG1pblwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcXHU2ODRDXHU5NzYyXFxcXFNob3BBZG1pblxcXFx2aXRlLmNvbmZpZy5tdHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6LyVFNiVBMSU4QyVFOSU5RCVBMi9TaG9wQWRtaW4vdml0ZS5jb25maWcubXRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnLCBsb2FkRW52IH0gZnJvbSAndml0ZSdcclxuaW1wb3J0IFZ1ZVNldHVwRXh0ZW5kIGZyb20gJ3ZpdGUtcGx1Z2luLXZ1ZS1zZXR1cC1leHRlbmQnXHJcbmltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJ1xyXG4vLyBcdThERUZcdTVGODRcdTdCQTFcdTc0MDYsXHU3RUQ5c3JjXHU5MTREXHU3RjZFXHU1MjJCXHU1NDBELFx1NjVCOVx1NEZCRlx1N0JBMVx1NzQwNlx1OERFRlx1NUY4NFxyXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJ1xyXG4vLyBzdmdcdTU2RkVcdTY4MDdcclxuaW1wb3J0IHsgY3JlYXRlU3ZnSWNvbnNQbHVnaW4gfSBmcm9tICd2aXRlLXBsdWdpbi1zdmctaWNvbnMnXHJcbi8vIFx1NUYxNVx1NTE2NW1vY2tcclxuaW1wb3J0IHsgdml0ZU1vY2tTZXJ2ZSB9IGZyb20gJ3ZpdGUtcGx1Z2luLW1vY2snXHJcbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZygoeyBjb21tYW5kLCBtb2RlIH0pID0+IHtcclxuICAvLyBcdTgzQjdcdTUzRDYuZW52XHU2NTg3XHU0RUY2XHU0RTJEXHU3Njg0XHU1M0Q4XHU5MUNGXHJcbiAgbGV0IGVudiA9IGxvYWRFbnYobW9kZSwgcHJvY2Vzcy5jd2QoKSlcclxuICByZXR1cm4ge1xyXG4gICAgLy8gXHU5MTREXHU3RjZFc3ZnXHU1NkZFXHU2ODA3XHJcbiAgICBwbHVnaW5zOiBbXHJcbiAgICAgIFZ1ZVNldHVwRXh0ZW5kKCksXHJcbiAgICAgIHZ1ZSgpLFxyXG4gICAgICAvLyBzdmdcdTU2RkVcdTY4MDdcdTkxNERcdTdGNkVcclxuICAgICAgY3JlYXRlU3ZnSWNvbnNQbHVnaW4oe1xyXG4gICAgICAgIC8vIFNwZWNpZnkgdGhlIGljb24gZm9sZGVyIHRvIGJlIGNhY2hlZFxyXG4gICAgICAgIGljb25EaXJzOiBbcGF0aC5yZXNvbHZlKHByb2Nlc3MuY3dkKCksICdzcmMvYXNzZXRzL2ljb25zJyldLFxyXG4gICAgICAgIC8vIFNwZWNpZnkgc3ltYm9sSWQgZm9ybWF0XHJcbiAgICAgICAgc3ltYm9sSWQ6ICdpY29uLVtkaXJdLVtuYW1lXScsXHJcbiAgICAgIH0pLFxyXG4gICAgICB2aXRlTW9ja1NlcnZlKHtcclxuICAgICAgICBsb2NhbEVuYWJsZWQ6IGNvbW1hbmQgPT09ICdzZXJ2ZScsXHJcbiAgICAgIH0pLFxyXG4gICAgXSxcclxuICAgIC8vIFx1OTE0RFx1N0Y2RXNyY1x1OERFRlx1NUY4NFx1NTIyQlx1NTQwRFx1NEUzQUBcclxuICAgIHJlc29sdmU6IHtcclxuICAgICAgYWxpYXM6IHtcclxuICAgICAgICAnQCc6IHBhdGgucmVzb2x2ZSgnLi9zcmMnKSwgLy8gXHU3NkY4XHU1QkY5XHU4REVGXHU1Rjg0XHU1MjJCXHU1NDBEXHU5MTREXHU3RjZFXHVGRjBDXHU0RjdGXHU3NTI4IEAgXHU0RUUzXHU2NkZGIHNyY1xyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIC8vIFx1OTE0RFx1N0Y2RWNzc1x1NTE2OFx1NUM0MFx1NTNEOFx1OTFDRlxyXG4gICAgY3NzOiB7XHJcbiAgICAgIHByZXByb2Nlc3Nvck9wdGlvbnM6IHtcclxuICAgICAgICBzY3NzOiB7XHJcbiAgICAgICAgICBqYXZhc2NyaXB0RW5hYmxlZDogdHJ1ZSxcclxuICAgICAgICAgIGFkZGl0aW9uYWxEYXRhOiAnQGltcG9ydCBcIi4vc3JjL3N0eWxlcy92YXJpYWJsZS5zY3NzXCI7JyxcclxuICAgICAgICB9LFxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIC8vIFx1OTE0RFx1N0Y2RVx1ODlFM1x1NTFCM1x1NEVFM1x1NzQwNlx1OERFOFx1NTdERlxyXG4gICAgc2VydmVyOiB7XHJcbiAgICAgIHByb3h5OiB7XHJcbiAgICAgICAgW2Vudi5WSVRFX0FQUF9VUkxdOiB7XHJcbiAgICAgICAgICB0YXJnZXQ6IGVudi5WSVRFX0FQUF9VUkwsXHJcbiAgICAgICAgICBjaGFuZ2VPcmlnaW46IHRydWUsXHJcbiAgICAgICAgICByZXdyaXRlOiAocGF0aCkgPT4gcGF0aC5yZXBsYWNlKC9eXFwvYXBpLywgJycpLFxyXG4gICAgICAgIH1cclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgfVxyXG59KVxyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXVQLFNBQVMsY0FBYyxlQUFlO0FBQzdSLE9BQU8sb0JBQW9CO0FBQzNCLE9BQU8sU0FBUztBQUVoQixPQUFPLFVBQVU7QUFFakIsU0FBUyw0QkFBNEI7QUFFckMsU0FBUyxxQkFBcUI7QUFFOUIsSUFBTyxzQkFBUSxhQUFhLENBQUMsRUFBRSxTQUFTLEtBQUssTUFBTTtBQUVqRCxNQUFJLE1BQU0sUUFBUSxNQUFNLFFBQVEsSUFBSSxDQUFDO0FBQ3JDLFNBQU87QUFBQTtBQUFBLElBRUwsU0FBUztBQUFBLE1BQ1AsZUFBZTtBQUFBLE1BQ2YsSUFBSTtBQUFBO0FBQUEsTUFFSixxQkFBcUI7QUFBQTtBQUFBLFFBRW5CLFVBQVUsQ0FBQyxLQUFLLFFBQVEsUUFBUSxJQUFJLEdBQUcsa0JBQWtCLENBQUM7QUFBQTtBQUFBLFFBRTFELFVBQVU7QUFBQSxNQUNaLENBQUM7QUFBQSxNQUNELGNBQWM7QUFBQSxRQUNaLGNBQWMsWUFBWTtBQUFBLE1BQzVCLENBQUM7QUFBQSxJQUNIO0FBQUE7QUFBQSxJQUVBLFNBQVM7QUFBQSxNQUNQLE9BQU87QUFBQSxRQUNMLEtBQUssS0FBSyxRQUFRLE9BQU87QUFBQTtBQUFBLE1BQzNCO0FBQUEsSUFDRjtBQUFBO0FBQUEsSUFFQSxLQUFLO0FBQUEsTUFDSCxxQkFBcUI7QUFBQSxRQUNuQixNQUFNO0FBQUEsVUFDSixtQkFBbUI7QUFBQSxVQUNuQixnQkFBZ0I7QUFBQSxRQUNsQjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUE7QUFBQSxJQUVBLFFBQVE7QUFBQSxNQUNOLE9BQU87QUFBQSxRQUNMLENBQUMsSUFBSSxZQUFZLEdBQUc7QUFBQSxVQUNsQixRQUFRLElBQUk7QUFBQSxVQUNaLGNBQWM7QUFBQSxVQUNkLFNBQVMsQ0FBQ0EsVUFBU0EsTUFBSyxRQUFRLFVBQVUsRUFBRTtBQUFBLFFBQzlDO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFsicGF0aCJdCn0K
