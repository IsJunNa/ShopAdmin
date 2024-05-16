<!-- 三级联动 -->
<template>
  <el-card class="form">
    <el-form :inline="true">
      <!-- 一级分类 -->
      <el-form-item label="一级分类">
        <el-select
          :disabled="cardFlag != 0 ? true : false"
          v-model="attrStore.categoryId1"
          class="select"
          @change="changeCategory1"
        >
          <el-option
            v-for="item in attrStore.category1Arr"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <!-- 二级分类 -->
      <el-form-item label="二级分类">
        <el-select
          :disabled="cardFlag != 0 ? true : false"
          v-model="attrStore.categoryId2"
          class="select"
          @change="changeCategory2"
        >
          <el-option
            v-for="item in attrStore.category2Arr"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <!-- 三级分类 -->
      <el-form-item label="三级分类">
        <el-select
          :disabled="cardFlag != 0 ? true : false"
          v-model="attrStore.categoryId3"
          class="select"
        >
          <el-option
            v-for="item in attrStore.category3Arr"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup lang="ts" name="Category">
import useAttrStore from '@/store/modules/attr'
import { onMounted } from 'vue'
// 接收父组件的传参
defineProps(['cardFlag'])
// 引入attr小仓库
const attrStore = useAttrStore()
// 选择一级分类触发的函数
const changeCategory1 = () => {
  attrStore.getCategory2()
  attrStore.categoryId2 = ''
  attrStore.categoryId3 = ''
  attrStore.category2Arr = []
  attrStore.category3Arr = []
  attrStore.AttrList = []
}
// 选择二级分类触发的函数
const changeCategory2 = () => {
  attrStore.getCategory3()
  attrStore.categoryId3 = ''
  attrStore.category3Arr = []
  attrStore.AttrList = []
}
// 发起请求获取一级分类数据
onMounted(() => {
  attrStore.getCategory1()
})
</script>

<style lang="scss" scoped>
.form {
  .select {
    width: 200px;
  }
}
</style>
