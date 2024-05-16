<template>
  <div
    style="
      display: flex;
      align-items: center;
      justify-content: right;
      width: 100%;
    "
  >
    <el-button type="primary" @click="generateCode" style="margin: 0 10px">
      刷新验证码
    </el-button>
    <canvas id="canvas" width="90" height="48"></canvas>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import useCodeStore from '@/store/modules/code'
const codeStore = useCodeStore()

const id = 'canvas'
const width = 90
const height = 48
const bit = 4
const lineNum = 5
const dotNum = 40
const pool = '1234567890'
const code = ref('')
let ctx: CanvasRenderingContext2D | null = null

const init = () => {
  const canvas = document.getElementById(id) as HTMLCanvasElement
  if (!canvas) {
    throw new Error('Can not find element by id')
  }
  ctx = canvas.getContext('2d')
}

const start = () => {
  drawBg()
  drawText()
  drawLine()
  drawDot()
}

const drawBg = () => {
  ctx!.save()
  ctx!.fillStyle = randomColor(180, 230)
  ctx!.fillRect(0, 0, width, height)
  ctx!.restore()
}

const drawText = () => {
  code.value = ''
  for (let i = 0; i < bit; i++) {
    const text = pool[randomNum(0, pool.length - 1)]
    code.value += text
    const fontSize = randomNum(18, 35)
    const deg = randomNum(-30, 30)
    ctx!.save()
    ctx!.font = `${fontSize}px Simhei`
    ctx!.textBaseline = 'top'
    ctx!.fillStyle = randomColor(80, 120)
    ctx!.translate(20 * i + 8, height / 2)
    ctx!.rotate((deg * Math.PI) / 180)
    ctx!.fillText(text, 0, -fontSize / 2)
    ctx!.restore()
  }
}

const drawLine = () => {
  for (let i = 0; i < lineNum; i++) {
    ctx!.beginPath()
    ctx!.strokeStyle = randomColor(40, 180)
    ctx!.moveTo(randomNum(0, width), randomNum(0, height))
    ctx!.lineTo(randomNum(0, width), randomNum(0, height))
    ctx!.stroke()
  }
}

const drawDot = () => {
  for (let i = 0; i < dotNum; i++) {
    ctx!.beginPath()
    ctx!.fillStyle = randomColor(0, 255)
    ctx!.arc(randomNum(0, width), randomNum(0, height), 1, 0, Math.PI * 2)
    ctx!.fill()
  }
}

const randomNum = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const randomColor = (min: number, max: number) => {
  const r = randomNum(min, max)
  const g = randomNum(min, max)
  const b = randomNum(min, max)
  return `rgb(${r},${g},${b})`
}

// 获取验证码
const generateCode = () => {
  codeStore.code = ''
  start()
  codeStore.generateCode()
  codeStore.correctCode = code.value
  // ElNotification({
  //   message: `用户名: admin<br>密码: 111111<br>验证码: ${code.value}`,
  //   type: 'info',
  //   position: 'top-left',
  //   dangerouslyUseHTMLString: true,
  //   duration: 5000,
  // })
}

onMounted(() => {
  init()
  start()
  generateCode()
})

defineExpose({ generateCode })
</script>
