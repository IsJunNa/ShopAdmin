<!-- 属性管理组件 -->
<template>
  <div class="attrBox">
    <!-- 多级联动选择器 -->
    <Category :cardFlag="cardFlag"></Category>
    <!-- 内容展示区 -->
    <el-card class="content">
      <!-- 展示内容部分 -->
      <div v-show="cardFlag" class="show">
        <!-- 添加属性按钮 -->
        <el-button type="primary" icon="Plus" :disabled="attrStore.categoryId3 ? false : true"
          @click="add">添加属性</el-button>
        <!-- 展示内容表格 -->
        <el-table :border="true" class="table" :data="attrStore.AttrList">
          <el-table-column label="序号" type="index" align="center" width="100px"></el-table-column>
          <el-table-column label="属性名称" align="center" width="200px" prop="attrName"></el-table-column>
          <el-table-column label="属性值名称" align="center">
            <template #="{ row }">
              <el-tag class="tag" v-for="item in row.attrValueList" :key="item.key">{{ item.valueName }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="200px">
            <template #="{ row }">
              <span v-if="false">{{ row }}</span>
              <!-- 修改属性按钮 -->
              <el-button type="primary" icon="Edit" @click="updateAttr"></el-button>
              <!-- 删除属性按钮 -->
              <el-button type="danger" icon="Delete" @click="deleteAttr"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 修改内容部分 -->
      <div v-show="!cardFlag" class="modify">
        <!-- 属性名称 -->
        <el-form :inline="true">
          <el-form-item label="属性名称">
            <el-input placeholder="请输入属性名称"></el-input>
          </el-form-item>
        </el-form>
        <!-- 添加取消属性值 -->
        <el-button type="primary" icon="Plus" @click="addAttr">添加属性值</el-button>
        <el-button @click="cancel">取消</el-button>
        <el-table :border="true" class="table">
          <el-table-column align="center" label="序号" type="index" width="100px"></el-table-column>
          <el-table-column align="center" label="属性值名称"></el-table-column>
          <el-table-column align="center" label="操作"></el-table-column>
        </el-table>
        <!-- 保存与取消按钮 -->
        <el-button type="primary">保存</el-button>
        <el-button @click="cancel">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts" name="attr">
import useAttrStore from '@/store/modules/attr'
import { ref, watch } from 'vue'
// 卡片组件内容切换的变量
let cardFlag = ref(false)
// 引入attr小仓库
const attrStore = useAttrStore()
// 监视三级分类id发生变化获取属性列表数据
watch(() => attrStore.categoryId3, () => {
  attrStore.AttrList = []
  if (attrStore.categoryId3) attrStore.getAttr()
})
// 添加按钮
const add = () => {
  cardFlag.value = false
}
// 修改属性
const updateAttr = () => {
  cardFlag.value = false
}
// 删除属性
const deleteAttr = () => {
  cardFlag.value = false
}
// 取消按钮
const cancel = () => {
  cardFlag.value = true
}
// 添加属性值按钮
const addAttr = () => {
  attrStore.addAttr(1)
}


</script>

<style lang="scss" scoped>
.attrBox {
  .content {
    margin: 20px 0;

    .show {
      .table {
        margin: 20px 0;

        .tag {
          margin: 5px;
        }
      }
    }

    .modify {
      .table {
        margin: 10px 0;
      }
    }


  }
}
</style>
