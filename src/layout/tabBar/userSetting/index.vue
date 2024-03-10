<template>
  <div class="right">
    <!-- 功能按钮 -->
    <div class="btn">
      <el-tooltip effect="light" :content="refreshBtn" placement="top-start">
        <el-button
          @click="refresh"
          size="small"
          icon="Refresh"
          circle
        ></el-button>
      </el-tooltip>
      <el-tooltip effect="light" :content="FullScreenBtn" placement="top-start">
        <el-button
          @click="fullScreen"
          size="small"
          icon="FullScreen"
          circle
        ></el-button>
      </el-tooltip>
      <el-tooltip effect="light" content="设置" placement="top-start">
        <el-button size="small" icon="Setting" circle></el-button>
      </el-tooltip>
    </div>
    <!-- 用户头像 -->
    <img class="img" :src="userStore.avatar" />
    <!-- 退出登录 -->
    <el-dropdown class="dropdown">
      <span class="el-dropdown-link">
        <span>{{ userStore.username }}</span>
        <el-icon class="el-icon--right"><arrow-down /></el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts" name="userSetting">
// 功能按钮名称
let refreshBtn = '刷新'
let FullScreenBtn = '全屏'

// 引入setting仓库
import useSettingStore from '@/store/modules/setting'
const settingStore = useSettingStore()

/* 刷新页面功能 */
const refresh = () => {
  settingStore.changeRefresh()
}
/* 全屏功能 */
const fullScreen = () => {
  // 判断是否全屏
  let full = document.fullscreenElement
  // 退出全屏模式
  if (full) document.exitFullscreen()
  // 进入全屏模式
  else document.documentElement.requestFullscreen()
}

/* 从user仓库中获取用户信息 */
import useUserStore from '@/store/modules/user'
const userStore = useUserStore()
userStore.getUserInfo()

/* 退出登录 */
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()
const logout = () => {
  userStore.logout()
  router.push({ path: '/login', query: { path: route.path } })
}
</script>

<style lang="scss" scoped>
.right {
  height: 100%;
  display: flex;
  align-items: center;

  .img {
    width: 30px;
    height: 30px;
    margin: 5px;
    border-radius: 100%;
  }

  .dropdown {
    cursor: pointer;
  }
}
</style>
