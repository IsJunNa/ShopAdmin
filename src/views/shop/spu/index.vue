<template>
  <div class="spuBox">
    <!-- 多级联动选择器 -->
    <Category :cardFlag="cardFlag"></Category>
    <!-- 查看模式 -->
    <el-card class="content" v-show="!cardFlag">
      <!-- 添加按钮 -->
      <el-button type="primary" icon="Plus" :disabled="!attrStore.categoryId3" @click="addSPU" v-btn="'btn.Spu.add'">
        添加SPU
      </el-button>
      <!-- 表格 -->
      <el-table :border="true" class="table" :data="attrStore.spuList">
        <el-table-column label="序号" width="100" align="center" type="index"></el-table-column>
        <el-table-column label="SPU名称" align="center" prop="spuName"></el-table-column>
        <el-table-column label="SPU描述" align="center" prop="description" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作" align="center">
          <template #="{ row }">
            <el-button type="primary" icon="Plus" title="添加" @click="addSKU(row)" v-btn="'btn.Spu.addsku'"></el-button>
            <el-button type="warning" icon="Edit" title="修改" @click="editSPU(row)" v-btn="'btn.Spu.update'"></el-button>
            <el-button type="info" icon="View" title="查看" @click="lookSKU(row)" v-btn="'btn.Spu.skus'"></el-button>
            <el-popconfirm :title="`确定删除&quot; ${row.spuName} &quot;吗？`" @confirm="deleteSPU(row)" width="auto">
              <template #reference>
                <el-button type="danger" icon="Delete" title="删除" v-btn="'btn.Spu.delete'"></el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <el-pagination v-model:current-page="pageNo" v-model:page-size="pageSize" :page-sizes="[3, 5, 7, 9]"
        :background="true" layout=" prev, pager, next, jumper,->,sizes,total" :total="total" @change="getSpuList()" />
    </el-card>
    <!-- spu模式 -->
    <spuFrom ref="spuFromRef" v-show="cardFlag === 1" @editCardFlag="editCardFlag"></spuFrom>
    <!-- sku模式 -->
    <skuFrom ref="skuFromRef" v-show="cardFlag === 2" @editCardFlag="editCardFlag"></skuFrom>
    <el-dialog v-model="dialogFlag">
      <el-table :data="skuInfo">
        <el-table-column label="SKU名称" prop="skuName"></el-table-column>
        <el-table-column label="SKU价格" prop="price"></el-table-column>
        <el-table-column label="SKU重量" prop="weight"></el-table-column>
        <el-table-column label="SKU图片">
          <template #="{ row }">
            <img :src="row.skuDefaultImg" alt="" style="width: 100px; height: 100px" />
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script setup lang="ts" name="spu">
import { ref, watch } from 'vue'
import useAttrStore from '@/store/modules/attr.ts'
import spuFrom from './components/spuFrom.vue'
import skuFrom from './components/skuFrom.vue'
import { reqGetSkuInfo, reqDeleteSpu } from '@/api/shop/spu'
import { ElMessage } from 'element-plus'

const attrStore = useAttrStore()

// 场景模式
let cardFlag = ref<number>(0) // 0为展示模式,1为spu模式,2为sku模式
// 当前页码
let pageNo = ref<number>(1)
// 一页展示数据数量
let pageSize = ref<number>(5)
// spu数据总数
let total = ref<number>(0)
// 查看面板的显示与隐藏
let dialogFlag = ref(false)
// SKU数据
let skuInfo = ref([])

const skuFromRef = ref()

// 根据自定义事件改变场景模式cardFlag的值
const editCardFlag = ({ type, method }) => {
  cardFlag.value = type
  if (method === 'add') {
    pageNo.value = 1
    getSpuList()
  }
}

// 获取spu列表
const getSpuList = async () => {
  const res = await attrStore.getSpuList(
    pageNo.value,
    pageSize.value,
    attrStore.categoryId3,
  )
  total.value = res.total
}

// 清除spu列表数据
const clearSpuList = () => {
  attrStore.spuList = []
  total.value = 0
  pageNo.value = 1
}

// 监听三级分类id来发送请求
watch(
  () => attrStore.categoryId3,
  () => {
    if (attrStore.categoryId3) getSpuList()
    else clearSpuList()
  },
  { immediate: true },
)

// 点击添加SPU按钮
const addSPU = () => {
  spuFromRef.value.addSpuInfo(attrStore.categoryId3)
  cardFlag.value = 1
}

// 点击修改SPU按钮
let spuFromRef = ref()
const editSPU = (row) => {
  spuFromRef.value.getSpuInfo(row)
  cardFlag.value = 1
}

// 点击添加SKU按钮
const addSKU = (row) => {
  cardFlag.value = 2
  const categoryId = {
    categoryId1: attrStore.categoryId1,
    categoryId2: attrStore.categoryId2,
    categoryId3: attrStore.categoryId3,
  }
  skuFromRef.value.getSkuInfo({ categoryId, row })
}

// 点击查看SKU按钮
const lookSKU = async (row) => {
  skuInfo.value = []
  dialogFlag.value = true
  const { data } = await reqGetSkuInfo(row.id)
  skuInfo.value = data
}

// 点击删除SPU按钮
const deleteSPU = async (row) => {
  const res = await reqDeleteSpu(row.id)
  console.log(res)

  if (res.code === 200) {
    ElMessage.success('删除成功')
    getSpuList()
  } else ElMessage.error('删除失败')
}
</script>

<style lang="scss" scoped>
.spuBox {
  .content {
    margin: 20px 0;

    .table {
      margin: 20px 0;
    }
  }
}
</style>
