<template>
  <div class="mianBox">
    <div class="leftNav">
      <!-- 项目logo组件 -->
      <div class="logo">
        <logo></logo>
      </div>
      <!-- 左侧主导航栏 -->
      <el-scrollbar class="scrollbar">
        <el-menu
          class="el-menu"
          background-color="$left-nav-color"
          text-color="white"
        >
          <mainNav :constantRoute="constantRoute"></mainNav>
        </el-menu>
      </el-scrollbar>
    </div>
    <!-- 顶部导航条 -->
    <div class="topNav"></div>
    <!-- 右侧主内容 -->
    <div class="content">
      <Main></Main>
    </div>
  </div>
</template>

<script setup lang="ts" name="home">
import logo from '@/layout/logo/index.vue'
import mainNav from '@/layout/mainNav/index.vue'
// 引入右侧主要内容组件
import Main from '@/views/main/index.vue'

/* 引入路由规则仓库 */
import RouterRluesStore from '@/store/modules/router'
let RouterRlues = RouterRluesStore()
// 路由规则对象变量
let constantRoute = RouterRlues.constantRoute
</script>

<style lang="scss" scoped>
.mianBox {
  width: 100vw;
  height: 100vh;

  .leftNav {
    width: $left-nav-width;
    height: 100vh;
    background-color: $left-nav-color;

    .logo {
      height: calc($left-nav-logo-height + 40px);
      display: flex;
      align-items: center;
    }

    .scrollbar {
      width: 100%;
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
    background-color: greenyellow;
  }

  .content {
    width: calc(100vw - $left-nav-width);
    height: calc(100vh - $top-nav-height);
    position: absolute;
    left: $left-nav-width;
    top: calc(0vh + $top-nav-height);
    overflow: auto;
    padding: 20px;
    background-color: rgb(106, 106, 45);
  }
}
</style>
