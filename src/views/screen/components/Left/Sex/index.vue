<template>
  <div class="sex">
    <div class="title">
      <p>男女比例</p>
      <p class="bg"></p>
    </div>
    <div class="main">
      <div class="man">
        <img src="../../../images/man.png" alt="" />
      </div>
      <div class="woman">
        <img src="../../../images/woman.png" alt="" />
      </div>
    </div>
    <div class="rate">
      <p>男士62%</p>
      <p>女士38%</p>
    </div>
    <div class="echarts" ref="charts"></div>
  </div>
</template>

<script lang="ts" setup name="Sex">
import { ref, onMounted } from 'vue'

/* 初始化echarts */
import * as echarts from 'echarts'
let charts = ref(null)
onMounted(() => {
  let myChart = echarts.init(charts.value)
  myChart.setOption({
    title: {
      text: '男女比例',
      left: 'center',
      textStyle: {
        color: '#fff',
        fontSize: 16,
      },
    },
    xAxis: {
      show: false,
      min: 0,
      max: 100,
    },
    yAxis: {
      show: false,
      type: 'category',
    },
    series: [
      {
        type: 'bar',
        data: [62],
        barWidth: 20,
        itemStyle: {
          borderRadius: 20,
          color: '#ff4b7a',
        },
      },
      {
        type: 'bar',
        data: [38],
        barWidth: 20,
        barGap: '-100%',
        itemStyle: {
          borderRadius: 20,
          color: '#007afe',
        },
      },
    ],
    grid: {
      left: 120,
      right: 0,
      top: 20,
      bottom: 0,
    },
  })
})
</script>

<style lang="scss" scoped>
.sex {
  flex: 1;
  width: 100%;
  height: 100%;
  background: url('../../../images/dataScreen-main-cb.png') no-repeat;
  background-size: cover;
  margin: 10px 0;

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

  .main {
    display: flex;
    justify-content: center;

    .man {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 111px;
      height: 115px;
      margin: 40px;
      background: url('../../../images/man-bg.png') no-repeat;
      background-size: cover;
      margin-bottom: 10px;
    }

    .woman {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 111px;
      height: 115px;
      margin: 40px;
      background: url('../../../images/woman-bg.png') no-repeat;
      background-size: cover;
      margin-bottom: 10px;
    }
  }

  .rate {
    display: flex;
    justify-content: center;
    color: #fff;

    p {
      margin: 0 65px;
    }
  }

  .echarts {
    width: 100%;
    height: 50px;
    margin: 5px;
  }
}
</style>
