<template>
  <div class="mianBox">
    <div class="leftNav" :class="{ active: settingStore.fold ? true : false }">
      <!-- 项目logo组件 -->
      <div class="logo">
        <logo></logo>
      </div>
      <!-- 左侧主导航栏 -->
      <el-scrollbar class="scrollbar">
        <el-menu
          :collapse="settingStore.fold"
          class="el-menu"
          background-color="#001529"
          text-color="white"
          :default-active="routePath"
        >
          <mainNav :constantRoute="constantRoute"></mainNav>
        </el-menu>
      </el-scrollbar>
    </div>
    <!-- 顶部导航条 -->
    <div class="topNav" :class="{ active: settingStore.fold ? true : false }">
      <tabBar></tabBar>
    </div>
    <!-- 右侧主内容 -->
    <div class="content" :class="{ active: settingStore.fold ? true : false }">
      <Main></Main>
    </div>
  </div>
</template>

<script setup lang="ts" name="home">
/* 引入logo组件 */
import logo from '@/layout/logo/index.vue'
import mainNav from '@/layout/mainNav/index.vue'
/* 引入右侧主要内容组件 */
import Main from '@/views/main/index.vue'
/* 获取当前页面的路由路径 */
import { useRoute } from 'vue-router'
let routePath = useRoute().path

/* 引入顶部tabBar组件 */
import tabBar from '@/layout/tabBar/index.vue'
/* 路由规则对象变量 */
import { ref, watch } from 'vue'
import useUserStore from '@/store/modules/user'
const userStore = useUserStore()
let constantRoute = ref(userStore.menuRoutes)

watch(
  () => userStore.menuRoutes,
  (newValue) => {
    constantRoute.value = newValue
  },
)

/* 引入setting仓库 */
import useSettingStore from '@/store/modules/setting'
let settingStore = useSettingStore()
</script>

<style lang="scss" scoped>
.mianBox {
  height: 100vh;

  .leftNav {
    width: $left-nav-width;
    height: 100vh;
    background-color: $left-nav-color;
    transition: all 0.3s;

    &.active {
      width: $letf-nav-fold;
    }

    .logo {
      height: calc($left-nav-logo-height + 40px);
      display: flex;
      align-items: center;
    }

    .scrollbar {
      height: calc(100% - $left-nav-logo-height - 40px);
      overflow: auto;

      .el-menu {
        border-right: none;
      }
    }
  }

  .topNav {
    width: calc(100vw - $left-nav-width);
    height: $top-nav-height;
    position: fixed;
    left: $left-nav-width;
    top: 0vh;
    transition: all 0.3s;

    &.active {
      width: calc(100vw - $left-nav-width + $left-nav-width - $letf-nav-fold);
      left: calc($left-nav-width - $left-nav-width + $letf-nav-fold);
    }
  }

  .content {
    width: calc(100vw - $left-nav-width);
    height: calc(100vh - $top-nav-height);
    position: absolute;
    left: $left-nav-width;
    top: calc(0vh + $top-nav-height);
    overflow: auto;
    padding: 20px;
    transition: all 0.3s;

    &.active {
      width: calc(100vw - $left-nav-width + $left-nav-width - $letf-nav-fold);
      left: calc($left-nav-width - $left-nav-width + $letf-nav-fold);
    }
  }
}
</style>
