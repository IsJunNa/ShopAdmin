<!-- 右侧内容展示区 -->
<template>
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <div>
        <component :is="Component" v-if="flag" />
      </div>
    </transition>
  </router-view>
</template>

<script setup lang="ts" name="Main">
// 引入setting仓库
import useSettingStore from '@/store/modules/setting'
const settingStore = useSettingStore()
// 监视refresh的值是否发生变化,变化销毁重新加载组件
import { watch, ref, nextTick } from 'vue'
let flag = ref(true)
watch(
  () => settingStore.refresh,
  () => {
    flag.value = false
    nextTick(() => {
      flag.value = true
    })
  },
)
</script>

<style lang="scss" scoped>
.fade-enter-from {
  opacity: 0;
}

.fade-enter-active {
  transition: all 1s;
}

.fade-enter-to {
  opacity: 1;
}
</style>
