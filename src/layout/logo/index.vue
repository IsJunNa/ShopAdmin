<template>
  <div class="root">
    <img :src="setting.logo" class="logo" v-if="setting.logoShow" />
    <h1 class="title" v-show="!settingStore.fold" v-if="setting.titleShow">
      {{ setting.title }}
    </h1>
  </div>
</template>

<script setup lang="ts" name="logo">
/* 引入setting全局变量 */
import setting from '@/setting'

import useSettingStore from '@/store/modules/setting'
let settingStore = useSettingStore()
</script>

<style lang="scss" scoped>
.root {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  height: $left-nav-logo-height;

  .logo {
    height: 100%;
    border-radius: 10%;
  }

  .title {
    color: white;
    font-weight: bold;
    font-size: 25px;
    white-space: nowrap;
  }
}
</style>
