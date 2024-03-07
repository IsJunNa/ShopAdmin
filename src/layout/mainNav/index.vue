<template>
  <!-- 根据路由动态生成导航 -->

  <!-- 没有子路由 -->
  <template v-for="item in constantRoute" :key="item.path">
    <el-menu-item
      @click="goPath(item.path)"
      :index="item.path"
      v-if="(!item.children || item.children.length <= 1) && !item.meta.hidden"
    >
      <el-icon>
        <component :is="item.meta.icon"></component>
      </el-icon>
      <span>{{ item.meta.title }}</span>
    </el-menu-item>
  </template>

  <!-- 只有一个子路由 -->
  <template v-for="item in constantRoute" :key="item.path">
    <el-menu-item
      :index="item.path"
      v-if="
        (item.children ? item.children.length : 0) == 1 && !item.meta.hidden
      "
    >
      <template v-for="i in item.children" :key="i.path">
        <el-icon>
          <component :is="i.meta.icon"></component>
        </el-icon>
        <span>{{ i.meta.title }}</span>
      </template>
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
        <span>{{ item.meta.title }}</span>
      </template>

      <mainNav :constantRoute="item.children"></mainNav>
    </el-sub-menu>
  </template>
</template>

<script setup lang="ts" name="mainNav">
defineProps(['constantRoute'])
import { useRouter } from 'vue-router'
const $router = useRouter()
const goPath = (path) => {
  $router.push(path)
}
</script>

<style lang="scss" scoped></style>
