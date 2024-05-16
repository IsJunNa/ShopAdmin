<!-- 属性管理组件 -->
<template>
  <div class="attrBox">
    <!-- 多级联动选择器 -->
    <Category :cardFlag="cardFlag"></Category>
    <!-- 内容展示区 -->
    <el-card class="content">
      <!-- 展示内容部分 -->
      <div v-show="cardFlag === 0" class="show">
        <!-- 添加属性按钮 -->
        <el-button
          type="primary"
          icon="Plus"
          :disabled="attrStore.categoryId3 ? false : true"
          @click="add"
          v-btn="'btn.Attr.add'"
        >
          添加属性
        </el-button>
        <!-- 展示内容表格 -->
        <el-table :border="true" class="table" :data="attrStore.AttrList">
          <el-table-column
            label="序号"
            type="index"
            align="center"
            width="100px"
          ></el-table-column>
          <el-table-column
            label="属性名称"
            align="center"
            width="200px"
            prop="attrName"
          ></el-table-column>
          <el-table-column label="属性值名称" align="center">
            <template #="{ row }">
              <el-tag
                class="tag"
                v-for="item in row.attrValueList"
                :key="item.key"
              >
                {{ item.valueName }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="200px">
            <template #="{ row }">
              <span v-if="false">{{ row }}</span>
              <!-- 修改属性按钮 -->
              <el-button
                v-btn="'btn.Attr.update'"
                type="primary"
                icon="Edit"
                @click="updateAttr(row)"
              ></el-button>
              <!-- 确认气泡框 -->
              <el-popconfirm
                :title="`确认要删除&quot;${row.attrName}&quot;吗?`"
                @confirm="deleteAttr(row)"
                width="200px"
              >
                <template #reference>
                  <!-- 删除属性按钮 -->
                  <el-button
                    v-btn="'btn.Attr.remove'"
                    type="danger"
                    icon="Delete"
                  ></el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <!-- 修改内容部分 -->
      <div v-show="cardFlag === 1" class="modify">
        <!-- 属性名称 -->
        <el-form :inline="true">
          <el-form-item label="属性名称">
            <el-input
              placeholder="请输入属性名称"
              v-model="addAttrValue.attrName"
            ></el-input>
          </el-form-item>
        </el-form>
        <!-- 添加取消属性值 -->
        <el-button
          type="primary"
          icon="Plus"
          @click="addAttr"
          :disabled="!addAttrValue.attrName"
        >
          添加属性值
        </el-button>
        <el-button @click="cancel">取消</el-button>
        <el-table
          :border="true"
          class="table"
          :data="addAttrValue.attrValueList"
        >
          <el-table-column
            align="center"
            label="序号"
            type="index"
            width="100px"
          ></el-table-column>
          <el-table-column align="center" label="属性值名称">
            <template #="{ row, $index }">
              <el-input
                :ref="(vc) => (inputArr[$index] = vc)"
                v-model="row.valueName"
                v-show="row.flag"
                @blur="inputBlur(row)"
              ></el-input>
              <div
                style="cursor: pointer"
                v-show="!row.flag"
                @click="changeDiv(row, $index)"
              >
                {{ row.valueName }}
              </div>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作">
            <template #="{ $index }">
              <el-button
                type="danger"
                @click="addAttrValue.attrValueList.splice($index, 1)"
              >
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 保存与取消按钮 -->
        <el-button type="primary" @click="save" :disabled="saveDisabled">
          保存
        </el-button>
        <el-button @click="cancel">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts" name="attr">
import useAttrStore from '@/store/modules/attr'
import { ref, watch, nextTick } from 'vue'
import { ElMessage } from 'element-plus'
// 卡片组件内容切换的变量
let cardFlag = ref(0)
// 引入attr小仓库
const attrStore = useAttrStore()
// 监视三级分类id发生变化获取属性列表数据
watch(
  () => attrStore.categoryId3,
  () => {
    attrStore.AttrList = []
    if (attrStore.categoryId3) attrStore.getAttr()
  },
  { immediate: true },
)

// 添加属性按钮
const add = () => {
  cardFlag.value = 1
}

const inputArr = ref([])
// 点击div切换输入框
const changeDiv = (row, index) => {
  row.flag = true
  nextTick(() => {
    inputArr.value[index].focus()
  })
}

// 修改属性按钮
const updateAttr = (row) => {
  Object.assign(addAttrValue.value, JSON.parse(JSON.stringify(row)))
  cardFlag.value = 1
  saveDisabled.value = false
}

// 删除属性按钮
const deleteAttr = async (row) => {
  // 派发删除请求
  const code = await attrStore.deleteAttr(row.id)
  // 提示
  if (code === 200) ElMessage.success('删除成功')
  else ElMessage.error('删除失败')
  // 重新获取属性列表数据
  attrStore.getAttr()
}

// 取消按钮
const cancel = () => {
  // 清空数据
  addAttrValue.value = {
    attrName: '',
    categoryId: attrStore.categoryId3,
    categoryLevel: 3,
    attrValueList: [],
  }
  // 隐藏修改表单
  cardFlag.value = 0
  // 重置保存按钮状态
  saveDisabled.value = true
}

// 要添加属性的内容
const addAttrValue = ref({
  attrName: '', // 属性名称
  categoryId: attrStore.categoryId3, // 三级分类id
  categoryLevel: 3, // 三级分类等级
  // 属性值数组
  attrValueList: [],
})

// 添加属性值按钮
const addAttr = () => {
  addAttrValue.value.attrValueList.push({
    valueName: '',
    flag: true,
  })
  saveDisabled.value = true
  nextTick(() => {
    inputArr.value[addAttrValue.value.attrValueList.length - 1].focus()
  })
}

// 保存按钮的disabled
const saveDisabled = ref(true)

// 保存按钮
const save = async () => {
  // 判断属性名称是否为空
  addAttrValue.value.attrValueList.map((item) => {
    if (item.flag) saveDisabled.value = false
  })
  // 判断属性值是否重复
  if (addAttrValue.value.attrValueList.length >= 2) {
    console.log(1)
    const hasDuplicateValueName = addAttrValue.value.attrValueList.some(
      (item) =>
        item.valueName ===
        addAttrValue.value.attrValueList.find((i) => i !== item).valueName,
    )
    if (hasDuplicateValueName) saveDisabled.value = false
  }

  // 设置三级分类id
  addAttrValue.value.categoryId = attrStore.categoryId3
  // 派发请求
  const code = await attrStore.addOrUpdateAttr(addAttrValue.value)
  // 提示
  if (code === 200)
    ElMessage({
      message: (addAttrValue.value as any).id ? '修改成功' : '新增成功',
      type: 'success',
    })
  else
    ElMessage({
      message: (addAttrValue.value as any).id ? '修改失败' : '新增失败',
      type: 'error',
    })
  // 隐藏修改表单
  cardFlag.value = 0
  // 重新获取属性列表数据
  attrStore.getAttr()
  // 清空数据
  addAttrValue.value = {
    attrName: '',
    categoryId: attrStore.categoryId3,
    categoryLevel: 3,
    attrValueList: [],
  }
  // 重置保存按钮状态
  saveDisabled.value = true
}

// input失去焦点
const inputBlur = (row: any) => {
  // 非空判断
  row.valueName = row.valueName.trim()
  if (row.valueName.trim()) {
    row.flag = false
    saveDisabled.value = false
  } else {
    ElMessage({ message: '属性值不能为空', type: 'error' })
    saveDisabled.value = true
  }
  // 重复判断
  let flag = addAttrValue.value.attrValueList.find((item) => {
    if (item != row) return item.valueName === row.valueName
  })
  if (flag) {
    row.flag = true
    ElMessage({ message: '属性值已存在', type: 'error' })
    saveDisabled.value = true
  }
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
