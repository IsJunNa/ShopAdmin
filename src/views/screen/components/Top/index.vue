<template>
  <div class="top">
    <div class="left">
      <div class="btn" @click="goHome">首页</div>
    </div>
    <div class="center">
      <div class="title">智慧旅游可视化数据大屏</div>
    </div>
    <div class="right">
      <div class="btn">统计报告</div>
      <div class="time">{{ time }}</div>
    </div>
  </div>
</template>

<script setup lang="ts" name="Top">
import { ref, onBeforeMount, onMounted } from 'vue'

/* 当前时间 */
import moment from 'moment'
let time = ref(moment().format('YYYY年MM月DD日 HH:mm:ss')) // 当前时间
let timer = ref(null) // 定时器
onMounted(() => {
  timer.value = setInterval(() => {
    time.value = moment().format('YYYY年MM月DD日 HH:mm:ss')
  }, 1000)
})
onBeforeMount(() => {
  clearInterval(timer.value)
})

/* 点击首页按钮 */
import { useRouter } from 'vue-router'
const router = useRouter()
const goHome = () => {
  router.push('/home')
}
</script>

<style lang="scss" scoped>
.top {
  width: 100%;
  height: 40px;
  display: flex;

  .left {
    flex: 1;
    background: url(../../images/dataScreen-header-left-bg.png) no-repeat;
    background-size: cover;
    height: 40px;

    .btn {
      width: 155px;
      line-height: 45px;
      background: url(../../images/dataScreen-header-btn-bg-l.png) no-repeat;
      background-size: cover;
      float: right;
      text-align: center;
      color: #29fcff;
      font-size: 20px;
      cursor: pointer;
    }
  }

  .center {
    flex: 2;

    .title {
      line-height: 74px;
      text-align: center;
      color: #29fcff;
      background: url(../../images/dataScreen-header-center-bg.png) no-repeat;
      background-size: cover;
      font-size: 32px;
    }
  }

  .right {
    flex: 1;
    background: url(../../images/dataScreen-header-right-bg.png) no-repeat;
    background-size: cover;
    height: 40px;
    display: flex;
    justify-content: space-between;

    .btn {
      width: 155px;
      line-height: 40px;
      background: url(../../images/dataScreen-header-btn-bg-r.png) no-repeat;
      background-size: 100% 100%;
      float: left;
      text-align: center;
      color: #29fcff;
      font-size: 20px;
      cursor: pointer;
    }

    .time {
      line-height: 40px;
      color: #29fcff;
      font-size: 18px;
      margin-right: 10px;
    }
  }
}
</style>
