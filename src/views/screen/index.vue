<template>
  <div class="container" @dblclick="fullScreen">
    <!-- 数据大屏展示内容区域 -->
    <div class="screen" ref="screen">
      <!-- 顶部组件 -->
      <Top></Top>
      <div class="bottom">
        <div class="left">
          <Tourist></Tourist>
          <Sex></Sex>
          <Age></Age>
        </div>
        <div class="center">
          <Map></Map>
          <Line></Line>
        </div>
        <div class="right">
          <Rank></Rank>
          <Weigh></Weigh>
          <Contrast></Contrast>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="screen">
import Top from './components/Top/index.vue'
import Sex from './components/Left/Sex/index.vue'
import Age from './components/Left/Age/index.vue'
import Tourist from './components/Left/Tourist/index.vue'
import Map from './components/Center/Map/index.vue'
import Line from './components/Center/Line/index.vue'
import Contrast from './components/Right/Contrast/index.vue'
import Rank from './components/Right/Rank/index.vue'
import Weigh from './components/Right/Weigh/index.vue'

import { ref, onMounted } from 'vue'
import { ElNotification } from 'element-plus'

// 数据大屏展示内容区域的DOM元素
let screen = ref()

onMounted(() => {
  screen.value.style.transform = `scale(${getScale()}) translate(-50%, -50%)`
})

// 根据窗口大小计算缩放比例
const getScale = (w = 1920, h = 1080) => {
  const ww = window.innerWidth / w
  const wh = window.innerHeight / h
  return ww < wh ? ww : wh
}

// 监听窗口大小变化
window.onresize = () => {
  screen.value.style.transform = `scale(${getScale()}) translate(-50%, -50%)`
}

// 双击全屏
const fullScreen = () => {
  // 判断是否全屏
  let full = document.fullscreenElement
  // 退出全屏模式
  if (full) document.exitFullscreen()
  // 进入全屏模式
  else document.documentElement.requestFullscreen()
}
// 弹出提示框双击可进入全屏
onMounted(() => {
  ElNotification({
    title: '提示',
    message: '双击页面可切换全屏模式',
    type: 'info',
    position: 'top-left',
    duration: 3000,
  })
})
</script>

<style lang="scss" scoped>
.container {
  width: 100vw;
  height: 100vh;
  background: url('images/bg.png') no-repeat;
  background-size: cover;
  user-select: none;

  .screen {
    width: 1920px;
    height: 1080px;
    position: fixed;
    left: 50%;
    top: 50%;
    transform-origin: left top;

    .bottom {
      display: flex;
      align-items: flex-end;

      .left {
        flex: 1;
        height: 1040px;
        display: flex;
        flex-direction: column;
      }

      .center {
        flex: 2;
        height: 1000px;
        display: flex;
        flex-direction: column;
      }

      .right {
        flex: 1;
        height: 1040px;
        display: flex;
        flex-direction: column;
      }
    }
  }
}
</style>
