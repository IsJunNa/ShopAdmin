<template>
  <div class="contrast">
    <div class="title">
      <p>预约渠道数量统计</p>
      <p class="bg"></p>
    </div>
    <div class="charts" ref="charts"></div>
  </div>
</template>

<script lang="ts" setup name="Contrast">
import { ref, onMounted } from 'vue'

/* 初始化echarts */
import * as echarts from 'echarts'
let charts = ref()
onMounted(() => {
  const myChart = echarts.init(charts.value)
  myChart.setOption({
    color: [
      '#A0CE3A',
      '#31C5C0',
      '#1E9BD1',
      '#0F347B',
      '#585247',
      '#7F6AAD',
      '#009D85',
      'rgba(250,250,250,0.3)',
    ],
    title: {
      text: '预约总数',
      subtext: 7789,
      textStyle: {
        color: '#f2f2f2',
        fontSize: 15,
        align: 'center',
      },
      subtextStyle: {
        fontSize: 20,
        color: ['#ff9d19'],
      },
      x: 158,
      y: 135,
    },
    legend: {
      orient: 'vertical',
      top: 'middle',
      right: 10,
      textStyle: {
        color: '#f2f2f2',
        fontSize: 20,
      },
      icon: 'roundRect',
      data: [
        {
          name: '小程序',
          value: 30,
        },
        {
          name: '抖音',
          value: 10,
        },
        {
          name: '官网',
          value: 20,
        },
        {
          name: '公众号',
          value: 25,
        },
        {
          name: '线下',
          value: 15,
        },
      ],
    },
    series: [
      {
        radius: ['30%', '60%'],
        center: ['40%', '50%'],
        type: 'pie',
        label: {
          normal: {
            show: false,
            formatter: '{c}%',
            textStyle: {
              fontSize: 20,
            },
            position: 'outside',
          },
          emphasis: {
            show: true,
          },
        },
        labelLine: {
          normal: {
            show: true,
            length: 12,
            length2: 30,
          },
          emphasis: {
            show: true,
          },
        },
        data: [
          {
            name: '小程序',
            value: 30,
          },
          {
            name: '抖音',
            value: 10,
          },
          {
            name: '官网',
            value: 20,
          },
          {
            name: '公众号',
            value: 25,
          },
          {
            name: '线下',
            value: 15,
          },
        ],
      },
      // 边框的设置
      {
        radius: ['30%', '34%'],
        center: ['40%', '50%'],
        type: 'pie',
        label: {
          normal: {
            show: true,
          },
          emphasis: {
            show: true,
          },
        },
        data: [
          {
            value: 1,
            itemStyle: {
              color: 'rgba(250,250,250,0.3)',
            },
          },
        ],
      },
      {
        name: '外边框',
        type: 'pie',
        clockWise: true, //顺时加载
        hoverAnimation: true, //鼠标移入变大
        center: ['40%', '50%'],
        radius: ['65%', '65%'],
        label: {
          normal: {
            show: false,
          },
        },
        data: [
          {
            value: 9,
            itemStyle: {
              normal: {
                borderWidth: 2,
                borderColor: '#29fcff',
              },
            },
          },
        ],
      },
    ],
  })
})
</script>

<style lang="scss" scoped>
.contrast {
  width: 100%;
  flex: 1;
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

  .charts {
    width: 100%;
    height: 100%;
  }
}
</style>
