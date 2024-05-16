<template>
  <div class="age">
    <div class="title">
      <p>年龄比例</p>
      <p class="bg"></p>
    </div>
    <div class="echarts" ref="charts"></div>
  </div>
</template>

<script lang="ts" setup name="Age">
import { ref, onMounted } from 'vue'

/* 初始化echarts */
import * as echarts from 'echarts'
let charts = ref(null)
onMounted(() => {
  let myChart = echarts.init(charts.value)
  myChart.setOption({
    series: [
      {
        type: 'pie',
        radius: ['40%', '70%'],
        data: [
          { value: 335, name: '20-30' },
          { value: 310, name: '30-40' },
          { value: 234, name: '40-50' },
          { value: 135, name: '50-60' },
          { value: 1548, name: '60-70' },
        ],
      },
    ],
    legend: {
      orient: 'vertical',
      right: 10,
      top: 40,
      textStyle: {
        color: '#fff',
      },
    },
    grid: {
      left: 0,
      right: 0,
      bottom: 0,
      top: 0,
    },
  })
})
</script>

<style lang="scss" scoped>
.age {
  flex: 1;
  width: 100%;
  height: 100%;
  background: url('../../../images/dataScreen-main-cb.png') no-repeat;
  background-size: cover;

  .title {
    margin: 20px 10px;
    font-size: 20px;
    color: #fff;

    .bg {
      width: 68px;
      height: 7px;
      margin-top: 5px;
      background: url('../../../images/dataScreen-title.png') no-repeat;
    }
  }

  .echarts {
    width: 100%;
    height: calc(100% - 60px);
  }
}
</style>
