<template>
  <el-card>
    <!-- 展示的表单 -->
    <el-table border class="table" :data="skuList">
      <el-table-column
        label="序号"
        align="center"
        width="100"
        type="index"
      ></el-table-column>
      <el-table-column
        label="名称"
        align="center"
        width="150"
        show-overflow-tooltip
        prop="skuName"
      ></el-table-column>
      <el-table-column
        label="描述"
        align="center"
        width="150"
        show-overflow-tooltip
        prop="skuDesc"
      ></el-table-column>
      <el-table-column label="默认图片" align="center" width="150">
        <template #="{ row }">
          <img :src="row.skuDefaultImg" style="width: 150px; height: 150px" />
        </template>
      </el-table-column>
      <el-table-column
        label="重量(克)"
        align="center"
        width="150"
        prop="weight"
      ></el-table-column>
      <el-table-column
        label="价格(元)"
        align="center"
        width="150"
        prop="price"
      ></el-table-column>
      <el-table-column label="操作" align="center" width="250" fixed="right">
        <template #="{ row }">
          <!-- 上/下架按钮 -->
          <el-button
            :type="row.isSale ? 'primary' : 'info'"
            size="small"
            :icon="row.isSale ? 'Top' : 'Bottom'"
            :title="row.isSale ? '上架中' : '已下架'"
            @click="editSale(row)"
            v-btn="'btn.Sku.updown'"
          ></el-button>
          <!-- 详情按钮 -->
          <el-button
            v-btn="'btn.Sku.detail'"
            type="info"
            size="small"
            icon="InfoFilled"
            title="详情"
            @click="showDetail(row)"
          ></el-button>
          <!--  删除按钮 -->
          <el-popconfirm
            :title="`您确认要删除 &quot;${row.skuName}&quot; 吗?`"
            :width="200"
            @confirm="deleteSku(row)"
          >
            <template #reference>
              <el-button
                v-btn="'btn.Sku.remove'"
                type="danger"
                size="small"
                icon="Delete"
                title="删除"
              ></el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination
      background
      v-model:current-page="pageNo"
      v-model:page-size="pageSize"
      :page-sizes="[3, 6, 9, 12]"
      layout="prev, pager, next, jumper,->,sizes,total"
      :total="total"
      @current-change="getSkuList"
      @size-change="getSkuList"
    />
    <!-- 抽屉组件 -->
    <el-drawer v-model="drawerFlag" :with-header="false">
      <!-- 名称 -->
      <el-row class="row" v-show="skuInfo.skuName">
        <el-col :span="6">名称</el-col>
        <el-col :span="18">{{ skuInfo.skuName }}</el-col>
      </el-row>
      <!-- 描述 -->
      <el-row class="row" v-show="skuInfo.skuDesc">
        <el-col :span="6">描述</el-col>
        <el-col :span="18">{{ skuInfo.skuDesc }}</el-col>
      </el-row>
      <!-- 价格 -->
      <el-row class="row" v-show="skuInfo.price">
        <el-col :span="6">价格</el-col>
        <el-col :span="18">{{ skuInfo.price }}元</el-col>
      </el-row>
      <!-- 品牌属性 -->
      <el-row class="row" v-show="skuInfo.skuAttrValueList.length != 0">
        <el-col :span="6">品牌属性</el-col>
        <el-col :span="18">
          <el-tag
            class="tag"
            v-for="item in skuInfo.skuAttrValueList"
            :key="item.id"
          >
            {{ item.valueName }}
          </el-tag>
        </el-col>
      </el-row>
      <!-- 销售属性 -->
      <el-row class="row" v-show="skuInfo.skuSaleAttrValueList.length != 0">
        <el-col :span="6">销售属性</el-col>
        <el-col :span="18">
          <el-tag
            class="tag"
            type="success"
            v-for="item in skuInfo.skuSaleAttrValueList"
            :key="item.id"
          >
            {{ item.saleAttrName }}
          </el-tag>
        </el-col>
      </el-row>
      <!-- 商品图片 -->
      <el-row class="row" v-show="skuInfo.skuImageList.length != 0">
        <el-col :span="6">商品图片</el-col>
        <el-col :span="18">
          <el-carousel indicator-position="none">
            <el-carousel-item v-for="item in skuInfo.skuImageList" :key="item">
              <img :src="item.imgUrl" style="width: 100%; height: 250px" />
            </el-carousel-item>
          </el-carousel>
        </el-col>
      </el-row>
    </el-drawer>
  </el-card>
</template>

<script setup lang="ts" name="sku">
import { ref, onMounted } from 'vue'
import {
  reqGetSkuList,
  reqCancelSale,
  reqOnSale,
  reqGetSkuInfo,
  reqDeleteSku,
} from '@/api/shop/sku'
import { ElMessage } from 'element-plus'

// 分页器页码
let pageNo = ref(1)
// 一页展示商品数
let pageSize = ref(3)
// 数据总条数
let total = ref(0)
// SKU列表数据
let skuList = ref([])
// 控制抽屉组件的显示与隐藏
let drawerFlag = ref(false)
// 展示的SKU的详情数据
let skuInfo = ref({
  skuName: '',
  skuDesc: '',
  price: '',
  skuAttrValueList: [],
  skuImageList: [],
  skuSaleAttrValueList: [],
})

// 获取SKU列表数据
const getSkuList = async () => {
  const res = await reqGetSkuList(pageNo.value, pageSize.value)
  total.value = res.data.total
  skuList.value = res.data.records
}

// 修改上/下架状态
const editSale = async (row) => {
  if (row.isSale === 0) {
    const { code } = await reqOnSale(row.id)
    if (code === 200) ElMessage.success('上架成功')
    else ElMessage.error('上架失败')
    getSkuList()
  } else {
    const { code } = await reqCancelSale(row.id)
    if (code === 200) ElMessage.success('下架成功')
    else ElMessage.error('下架失败')
    getSkuList()
  }
}

// 展示SKU详情
const showDetail = async (row) => {
  const res = await reqGetSkuInfo(row.id)
  skuInfo.value = res.data
  console.log(skuInfo.value)
  drawerFlag.value = true
}

// 删除SKU
const deleteSku = async (row) => {
  const { code } = await reqDeleteSku(row.id)
  if (code === 200) {
    ElMessage.success('删除成功')
    getSkuList()
  } else ElMessage.error('删除失败')
}

onMounted(() => {
  getSkuList()
})
</script>

<style lang="scss" scoped>
.table {
  margin-bottom: 20px;
}

.row {
  margin-bottom: 25px;
}

.tag {
  margin: 0 5px;
}
</style>
