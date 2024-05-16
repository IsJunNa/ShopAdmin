<template>
  <!-- 根据路由动态生成导航 -->
  <!-- 没有子路由或只有一个子路由时 -->
  <template v-for="item in constantRoute" :key="item.path">
    <!-- 没有子路由 -->
    <el-menu-item
      @click="goPath(item.path)"
      :index="item.path"
      v-if="!item.children && !item.meta.hidden"
    >
      <el-icon>
        <component :is="item.meta.icon"></component>
      </el-icon>
      <template #title>{{ item.meta.title }}</template>
    </el-menu-item>
    <!-- 有一个子路由 -->
    <el-menu-item
      @click="goPath(item.path)"
      :index="item.path"
      v-if="item.children && item.children.length == 1 && !item.meta.hidden"
    >
      <el-icon>
        <component :is="item.children[0].meta.icon"></component>
      </el-icon>
      <template #title>{{ item.children[0].meta.title }}</template>
    </el-menu-item>
  </template>
  <!-- 子路由大于两个 -->
  <template v-for="item in constantRoute" :key="item.path">
    <el-sub-menu
      :index="item.path"
      v-if="(item.children ? item.children.length : 0) > 1 && !item.meta.hidden"
    >
      <template #title>
        <el-icon>
          <component :is="item.meta.icon"></component>
        </el-icon>
        <span v-show="!settingStore.fold">{{ item.meta.title }}</span>
      </template>
      <mainNav :constantRoute="item.children"></mainNav>
    </el-sub-menu>
  </template>
</template>

<script setup lang="ts" name="mainNav">
/* 引入setting仓库 */
import useSettingStore from '@/store/modules/setting'
let settingStore = useSettingStore()
defineProps(['constantRoute'])
import { useRouter } from 'vue-router'
const $router = useRouter()
const goPath = (path) => {
  $router.push(path)
}
</script>

<style lang="scss" scoped></style>
