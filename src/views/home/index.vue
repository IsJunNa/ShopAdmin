<template>
  <h1>首页11</h1>
</template>

<script setup lang="ts" name="home">
// 引入user小仓库
import useUserStore from '@/store/modules/user'
const userStore = useUserStore()

// 进入首页时发送请求获取用户信息
import { onMounted } from 'vue'
onMounted(() => {
  userStore.getUserInfo()
})
</script>

<style lang="scss" scoped></style>
