<template>
  <div class="weigh">
    <div class="title">
      <p>半年游客量对比</p>
      <p class="bg"></p>
    </div>
    <div class="charts" ref="charts"></div>
  </div>
</template>

<script lang="ts" setup name="Weigh">
import { ref, onMounted } from 'vue'

/* 初始化echarts */
import * as echarts from 'echarts'
let charts = ref()
onMounted(() => {
  const myChart = echarts.init(charts.value)
  myChart.setOption({
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      align: 'left',
      right: 10,
      bottom: 0,
      type: 'plain',
      top: 0,
      textStyle: {
        color: '#7ec7ff',
        fontSize: 12,
      },
    },
    grid: {
      top: 40,
      left: 70,
      right: 15,
      bottom: 110,
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        axisLine: {
          show: true,
          lineStyle: {
            color: '#233653',
          },
        },
        axisLabel: {
          textStyle: {
            color: '#7ec7ff',
            padding: 10,
            fontSize: 12,
          },
          formatter: function (data) {
            return data
          },
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: '#192a44',
          },
        },
        axisTick: {
          show: false,
        },
        data: ['一月', '二月', '三月', '四月', '五月', '六月'],
      },
    ],
    yAxis: [
      {
        name: '游客量',
        nameTextStyle: {
          color: '#7ec7ff',
          fontSize: 12,
          padding: 10,
        },
        min: 0,
        splitLine: {
          show: true,
          lineStyle: {
            color: '#192a44',
          },
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: '#233653',
          },
        },
        axisLabel: {
          show: true,
          textStyle: {
            color: '#7ec7ff',
            padding: 10,
          },
          formatter: function (value) {
            if (value === 0) {
              return value
            }
            return value + '万人'
          },
        },
        axisTick: {
          show: false,
        },
      },
    ],
    series: [
      {
        name: '2023',
        type: 'line',
        symbol: 'circle',
        showAllSymbol: true,
        symbolSize: 0,
        smooth: true,
        lineStyle: {
          normal: {
            width: 2,
            color: 'rgba(84,131,255,1)',
          },
          borderColor: 'rgba(0,0,0,.4)',
        },
        itemStyle: {
          color: 'rgba(84,131,255,1)',
        },
        tooltip: {
          show: true,
        },
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(
              0,
              0,
              0,
              1,
              [
                {
                  offset: 0,
                  color: 'rgba(84,131,255,.3)',
                },
                {
                  offset: 1,
                  color: 'rgba(84,131,255, 0)',
                },
              ],
              false,
            ),
            shadowColor: 'rgba(25,163,223, 0.5)', //阴影颜色
            shadowBlur: 20, //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
          },
        },
        data: ['30', '60', '22', '85', '50', '40'],
      },
      {
        name: '2024',
        type: 'line',
        symbol: 'circle',
        showAllSymbol: true,
        symbolSize: 0,
        smooth: true,
        lineStyle: {
          normal: {
            width: 2,
            color: 'rgba(77,192,36,1)',
          },
        },
        itemStyle: {
          color: 'rgba(77,192,36,1)',
        },
        tooltip: {
          show: true,
        },
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(
              0,
              0,
              0,
              1,
              [
                {
                  offset: 0,
                  color: 'rgba(77,192,36,.3)',
                },
                {
                  offset: 1,
                  color: 'rgba(77,192,36, 0)',
                },
              ],
              false,
            ),
            shadowColor: 'rgba(10,219,250, 0.5)', //阴影颜色
            shadowBlur: 20, //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
          },
        },
        data: ['50', '30', '72', '35', '80', '60'],
      },
    ],
  })
})
</script>

<style lang="scss" scoped>
.weigh {
  width: 100%;
  flex: 1;
  background: url('../../../images/dataScreen-main-cb.png') no-repeat;
  background-size: cover;
  margin: 10px 0;
  overflow: hidden;

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

  .charts {
    width: 100%;
    height: 100%;
  }
}
</style>
