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
      <el-popover
        placement="bottom"
        title="主题设置"
        :width="300"
        trigger="hover"
      >
        <!-- 表单元素 -->
        <el-form inline>
          <el-form-item label="主题颜色">
            <el-color-picker
              v-model="color"
              @change="setColor"
              :teleported="false"
            />
          </el-form-item>
          <el-form-item label="暗黑模式">
            <el-switch @change="changeDark" v-model="dark" />
          </el-form-item>
        </el-form>
        <template #reference>
          <el-button size="small" icon="Setting" circle></el-button>
        </template>
      </el-popover>
    </div>
    <!-- 用户头像 -->
    <el-avatar class="avatar" :src="userStore.avatar" :size="30"></el-avatar>
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
import { onMounted, ref } from 'vue'
// 功能按钮名称
let refreshBtn = '刷新'
let FullScreenBtn = '全屏'
// 是否开启暗黑模式
let dark = ref()
// 主题色
const color = ref()

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
import { useRouter } from 'vue-router'
const router = useRouter()
// const route = useRoute()
const logout = () => {
  userStore.logout()
  // 退出登录可以保持登录前的路由
  router.push({ path: '/login' })
  // router.push({ path: '/login', query: { path: route.path } })
}

/* 切换暗黑模式 */
const changeDark = () => {
  localStorage.setItem('dark', dark.value as string)
  let html = document.documentElement
  dark.value ? (html.className = 'dark') : (html.className = '')
}

/* 切换主题色 */
const setColor = () => {
  localStorage.setItem('color', color.value)
  const html = document.documentElement
  html.style.setProperty('--el-color-primary', color.value)
}

// 初始化暗黑模式状态和主题色
onMounted(() => {
  // 初始化主题色
  color.value = localStorage.getItem('color')
  // 存储的为清空的主题色，则设置为默认主题色
  if (localStorage.getItem('color') === 'null') color.value = ''
  // 进行初始化赋值
  const html = document.documentElement
  html.style.setProperty('--el-color-primary', color.value)
  // 初始化暗黑模式
  if (localStorage.getItem('dark')) {
    dark.value = localStorage.getItem('dark') === 'true'
    let html = document.documentElement
    dark.value ? (html.className = 'dark') : (html.className = '')
  } else dark.value = false
})
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

  .avatar {
    margin: 0 10px;
  }
}
</style>
