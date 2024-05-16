<template>
  <div class="error">
    <el-result icon="warning" title="404提示" sub-title="该页面不存在">
      <template #extra>
        <el-button type="primary" @click="$router.push('/home')">
          返回首页
        </el-button>
      </template>
    </el-result>
  </div>
</template>

<script setup lang="ts" name="error">
let path = localStorage.getItem('path')
console.log(path)
if (path) {
  console.log(path)
  // router.push()
}
</script>

<style lang="scss" scoped>
.error {
  width: 100vw;
  height: 100vh;
  background: url('./images/error.png');
  background-size: 50% 90%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
