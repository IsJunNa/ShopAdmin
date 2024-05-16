<template>
  <div class="line">
    <div class="title">
      <p>未来七日游客数量趋势</p>
      <p class="bg"></p>
    </div>
    <div class="charts" ref="charts"></div>
  </div>
</template>

<script lang="ts" setup name="Line">
import { onMounted, ref } from 'vue'

/* 初始化charts */
import * as echarts from 'echarts'
let charts = ref()
onMounted(() => {
  let myChart = echarts.init(charts.value)
  myChart.setOption({
    xAxis: {
      type: 'category',
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      boundaryGap: false,
      splitLine: {
        show: false,
      },
    },
    yAxis: {
      splitLine: {
        show: false,
      },
      axisLine: {
        show: true,
      },
      axisTick: {
        show: true,
      },
    },
    grid: {
      left: 45,
      right: 10,
      bottom: 25,
      top: 30,
    },
    series: [
      {
        type: 'line',
        data: [159, 384, 256, 267, 651, 1030, 920],
        smooth: true,
        areaStyle: {
          color: {
            type: 'liner',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: '#29fcff', // 0% 处的颜色
              },
              {
                offset: 1,
                color: '#11144e', // 100% 处的颜色
              },
            ],
          },
        },
      },
    ],
  })
})
</script>

<style lang="scss" scoped>
.line {
  flex: 1;
  width: 95%;
  background: url('../../../images/dataScreen-main-cb.png') no-repeat;
  background-size: 100% 100%;
  margin: 15px auto;

  .title {
    margin: 6px;
    font-size: 20px;
    color: #fff;

    .bg {
      width: 68px;
      height: 7px;
      margin-top: 5px;
      background: url('../../../images/dataScreen-title.png') no-repeat;
    }
  }

  .charts {
    width: 100%;
    height: 100%;
  }
}
</style>
