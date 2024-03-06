<template>
  <div class="root">
    <img :src="setting.logo" class="logo" v-if="setting.logoShow" />
    <h1 class="title">{{ setting.title }}</h1>
  </div>
</template>

<script setup lang="ts" name="logo">
import setting from '@/setting'
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
  }
}
</style>
