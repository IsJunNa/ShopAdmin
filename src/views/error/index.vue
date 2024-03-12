<template>
  <img :src="imgUrl" @click="getCode" v-if="flag">
</template>

<script setup lang="ts" name="error">
import { onMounted, ref } from 'vue'
let imgUrl = ref('http://localhost:8080/codeDemo_Web_exploded/captcha')
let flag = ref(true)

const getCode = async () => {
  flag.value = true
}

onMounted(() => {
  getCode()
})

</script>

<style lang="scss" scoped></style>
