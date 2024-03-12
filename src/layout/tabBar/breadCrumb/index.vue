<template>
  <div class="left">
    <!-- 收缩图标 -->
    <el-icon class="icon" @click="changeIcon">
      <Expand v-show="!settingStore.fold"></Expand>
      <Fold v-show="settingStore.fold"></Fold>
    </el-icon>
    <!-- 面包屑 -->
    <el-breadcrumb separator-icon="ArrowRight">
      <el-breadcrumb-item
        v-show="item.meta.title"
        v-for="item in $route.matched"
        :key="item.path"
      >
        <span class="breadCrumbItem">
          <el-icon class="itemIcon">
            <component v-if="item.meta.icon" :is="item.meta.icon"></component>
          </el-icon>
          <span>{{ item.meta.title }}</span>
        </span>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts" name="breadCrumb">
// 引入setting仓库
import useSettingStore from '@/store/modules/setting'
let settingStore = useSettingStore()
// 获取当前页面路由信息
import { useRoute } from 'vue-router'
const $route = useRoute()
// 修改setting仓库中fold的值
const changeIcon = () => {
  settingStore.changeFold()
}
</script>

<style lang="scss" scoped>
.left {
  height: 100%;
  display: flex;
  align-items: center;
  user-select: none;

  .icon {
    margin-right: 20px;
    cursor: pointer;
  }

  .breadCrumbItem {
    display: flex;
    align-items: center;
    cursor: auto;

    .itemIcon {
      margin: 3px;
    }
  }
}
</style>
