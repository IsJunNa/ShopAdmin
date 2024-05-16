<template>
  <div class="box">
    <!-- tabBar左侧部分 -->
    <breadCrumb></breadCrumb>
    <!-- tabBar右侧部分 -->
    <userSetting></userSetting>
  </div>
</template>

<script setup lang="ts" name="tabBar">
import breadCrumb from '@/layout/tabBar/breadCrumb/index.vue'
import userSetting from '@/layout/tabBar/userSetting/index.vue'
</script>

<style lang="scss" scoped>
.box {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  padding: 20px;
}
</style>
