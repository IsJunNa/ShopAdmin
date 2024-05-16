<template>
  <div class="map">
    <div ref="charts" class="charts"></div>
  </div>
</template>

<script lang="ts" setup name="Map">
import { onMounted, ref } from 'vue'
import axios from 'axios'

/* 获取中国地图坐标json数据 */
let mapJson = ref(null)
const getMapJson = async () => {
  const res = await axios({
    url: 'https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json',
  })
  mapJson.value = JSON.stringify(res.data)
}

/* 初始化echarts */
import * as echarts from 'echarts'
let charts = ref(null)
onMounted(async () => {
  await getMapJson()
  echarts.registerMap('china', mapJson.value as any)
  let myChart = echarts.init(charts.value)
  myChart.setOption({
    geo: {
      map: 'china',
      roam: true,
      left: 20,
      right: 20,
      top: 40,
      bottom: -200,
      itemStyle: {
        areaColor: '#4365a9',
        borderColor: '#28f9fd',
      },
      emphasis: {
        itemStyle: {
          color: '#11144e',
        },
        label: {
          show: true,
          color: '#fff',
          fontSize: 22,
        },
      },
    },
    series: [
      {
        type: 'lines',
        data: [
          {
            coords: [
              [116.405285, 39.904989],
              [112.982279, 28.19409],
            ],
            lineStyle: {
              color: 'white',
              width: 5,
              curveness: 0.1,
            },
          },
          {
            coords: [
              [123.429096, 41.796767],
              [112.982279, 28.19409],
            ],
            lineStyle: {
              color: 'white',
              width: 5,
              curveness: 0.1,
            },
          },
          {
            coords: [
              [110.33119, 20.031971],
              [112.982279, 28.19409],
            ],
            lineStyle: {
              color: 'white',
              width: 5,
              curveness: 0.1,
            },
          },
          {
            coords: [
              [91.132212, 29.660361],
              [112.982279, 28.19409],
            ],
            lineStyle: {
              color: 'white',
              width: 5,
              curveness: 0.1,
            },
          },
          {
            coords: [
              [101.778916, 36.623178],
              [112.982279, 28.19409],
            ],
            lineStyle: {
              color: 'white',
              width: 5,
              curveness: 0.1,
            },
          },
        ],
        effect: {
          show: true,
          symbol:
            'path://M596.562 830.99l11.947-192.1 367.547 183.187V710.714L615.134 370.097V155.791c-0.02-56.63-45.548-142.138-101.694-142.138S411.767 99.161 411.767 155.791v214.255L50.842 710.766v111.363l361.472-183.187 14.755 207.926a131.335 131.335 0 0 0 1.12 14.61l-65.71 59.938v66.13L514.259 937l2.434-0.83L662 987.547v-66.13l-67.782-61.843 2.287-28.583z',
          symbolSize: 20,
          color: '#11144e',
        },
      },
    ],
  })
})
</script>

<style lang="scss" scoped>
.map {
  flex: 3;
  width: 100%;

  .charts {
    width: 100%;
    height: 100%;
  }
}
</style>
