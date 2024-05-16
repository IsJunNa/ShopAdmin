<template>
  <div class="tourist">
    <div class="top">
      <div>
        <p class="title">实时游客统计</p>
        <p class="bg"></p>
      </div>
      <p class="number">可预约总量5236人</p>
    </div>
    <div class="number">
      <span v-for="(item, index) in number" :key="index">{{ item }}</span>
    </div>
    <div class="echarts" ref="charts"></div>
  </div>
</template>

<script lang="ts" setup name="Tourist">
import { ref, onMounted } from 'vue'
/* 可预约人数 */
let number = ref(20000 - 5236 + '人')

/* 获取echarsDOM元素 */
import * as echarts from 'echarts'
import 'echarts-liquidfill'
let charts = ref(null)
onMounted(() => {
  // 初始化echarts
  const myChart = echarts.init(charts.value)
  // echarts配置项
  myChart.setOption({
    xAxis: {},
    yAxis: {},
    series: {
      type: 'liquidFill',
      data: [(20000 - 5236) / 20000], // 数据
      radius: '80%', // 圆环大小
    },
    grid: {
      left: 0,
      top: 0,
      width: '100%',
      height: '100%',
    },
  })
})
</script>

<style lang="scss" scoped>
.tourist {
  flex: 1.2;
  background: url('../../../images/dataScreen-main-lb.png') no-repeat;
  background-size: cover;
  margin-top: 20px;

  .top {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    padding: 0 10px;

    .title {
      font-size: 20px;
      color: #fff;
    }

    .bg {
      width: 68px;
      height: 7px;
      margin-top: 5px;
      background: url('../../../images/dataScreen-title.png');
    }

    .number {
      font-size: 19px;
      color: #fff;
    }
  }

  .number {
    display: flex;
    margin: 15px 25px;

    span {
      flex: 1;
      text-align: center;
      line-height: 40px;
      background: url('../../../images/total.png') no-repeat;
      background-size: 100% 100%;
      color: #29fcff;
    }
  }

  .echarts {
    width: 100%;
    height: 235px;
  }
}
</style>
