<template>
  <div class="rank">
    <div class="title">
      <p>热门景区排行</p>
      <p class="bg"></p>
    </div>
    <div class="charts" ref="charts"></div>
  </div>
</template>

<script lang="ts" setup name="Rank">
import { ref, onMounted } from 'vue'

/* 初始化echarts */
import * as echarts from 'echarts'
let charts = ref()
let colorArray = [
  {
    top: '#ffa800', //黄
    bottom: 'rgba(11,42,84,.3)',
  },
  {
    top: '#1ace4a', //绿
    bottom: 'rgba(11,42,84, 0.3)',
  },
  {
    top: '#4bf3ff', //蓝
    bottom: 'rgba(11,42,84,.3)',
  },
  {
    top: '#4f9aff', //深蓝
    bottom: 'rgba(11,42,84,.3)',
  },
  {
    top: '#b250ff', //粉
    bottom: 'rgba(11,42,84,.3)',
  },
]

onMounted(() => {
  const myChart = echarts.init(charts.value)
  myChart.setOption({
    tooltip: {
      show: true,
      formatter: '{c}万/人',
    },
    grid: {
      left: 10,
      top: 0,
      right: 0,
      bottom: 0,
      containLabel: true,
    },

    xAxis: {
      type: 'value',
      show: false,
      position: 'top',
      axisTick: {
        show: false,
      },
      axisLine: {
        show: false,
        lineStyle: {
          color: '#fff',
        },
      },
      splitLine: {
        show: false,
      },
    },
    yAxis: [
      {
        type: 'category',
        axisTick: {
          show: false,
          alignWithLabel: false,
          length: 5,
        },
        splitLine: {
          //网格线
          show: false,
        },
        inverse: 'true', //排序
        axisLine: {
          show: false,
          lineStyle: {
            color: '#fff',
          },
        },
        data: ['长沙', '岳阳', '株洲', '湘潭', '湘西'],
      },
    ],
    series: [
      {
        type: 'bar',
        label: {
          normal: {
            show: true,
            position: 'right',
            formatter: '{c}',
            textStyle: {
              color: 'white',
            },
          },
        },
        itemStyle: {
          normal: {
            show: true,
            color: function (params) {
              let num = colorArray.length
              return {
                type: 'linear',
                colorStops: [
                  {
                    offset: 0,
                    color: colorArray[params.dataIndex % num].bottom,
                  },
                  {
                    offset: 1,
                    color: colorArray[params.dataIndex % num].top,
                  },
                  {
                    offset: 0,
                    color: colorArray[params.dataIndex % num].bottom,
                  },
                  {
                    offset: 1,
                    color: colorArray[params.dataIndex % num].top,
                  },
                  {
                    offset: 0,
                    color: colorArray[params.dataIndex % num].bottom,
                  },
                  {
                    offset: 1,
                    color: colorArray[params.dataIndex % num].top,
                  },
                  {
                    offset: 0,
                    color: colorArray[params.dataIndex % num].bottom,
                  },
                  {
                    offset: 1,
                    color: colorArray[params.dataIndex % num].top,
                  },
                  {
                    offset: 0,
                    color: colorArray[params.dataIndex % num].bottom,
                  },
                  {
                    offset: 1,
                    color: colorArray[params.dataIndex % num].top,
                  },
                  {
                    offset: 0,
                    color: colorArray[params.dataIndex % num].bottom,
                  },
                  {
                    offset: 1,
                    color: colorArray[params.dataIndex % num].top,
                  },
                ],
                //globalCoord: false
              }
            },
            barBorderRadius: 70,
            borderWidth: 0,
            borderColor: '#333',
          },
        },
        barGap: '0%',
        barCategoryGap: '50%',
        data: [60, 132, 89, 134, 60],
      },
    ],
  })
})
</script>

<style lang="scss" scoped>
.rank {
  width: 100%;
  flex: 1.2;
  background: url('../../../images/dataScreen-main-lb.png') no-repeat;
  background-size: cover;
  margin-top: 20px;

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
    height: 300px;
  }
}
</style>
