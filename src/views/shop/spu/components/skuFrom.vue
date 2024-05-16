<template>
  <el-card class="card">
    <el-form label-width="100px">
      <el-form-item label="SKU名称">
        <el-input
          placeholder="请输入SKU名称"
          v-model="skuInfo.skuName"
        ></el-input>
      </el-form-item>
      <el-form-item label="价格(元)">
        <el-input
          placeholder="请输入价格"
          type="number"
          v-model="skuInfo.price"
        ></el-input>
      </el-form-item>
      <el-form-item label="重量(克)">
        <el-input
          placeholder="请输入重量"
          type="number"
          v-model="skuInfo.weight"
        ></el-input>
      </el-form-item>
      <el-form-item label="SKU描述">
        <el-input
          placeholder="请输入SKU描述"
          type="textarea"
          v-model="skuInfo.skuDesc"
        ></el-input>
      </el-form-item>
      <el-form-item label="平台属性" v-show="attrList.length != 0">
        <el-form :inline="true">
          <el-form-item
            :label="item.attrName"
            v-for="item in attrList"
            :key="item.id"
          >
            <el-select v-model="item.value" class="select">
              <el-option
                v-for="item2 in item.attrValueList"
                :label="item2.valueName"
                :value="`${item.id}:${item2.id}`"
                :key="item2.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="销售属性" v-show="saleAttrList.length != 0">
        <el-form :inline="true">
          <el-form-item
            v-for="item in saleAttrList"
            :key="item.id"
            :label="item.saleAttrName"
          >
            <el-select class="select" v-model="item.value">
              <el-option
                v-for="item2 in item.spuSaleAttrValueList"
                :key="item2.id"
                :label="item2.saleAttrValueName"
                :value="`${item.id}:${item2.id}`"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="图片名称" v-show="imageList.length != 0">
        <el-table border :data="imageList" ref="imageTable">
          <el-table-column
            type="selection"
            width="100"
            align="center"
          ></el-table-column>
          <el-table-column label="图片" align="center">
            <template #="{ row }">
              <img :src="row.imgUrl" class="img" />
            </template>
          </el-table-column>
          <el-table-column
            label="名称"
            align="center"
            prop="imgName"
          ></el-table-column>
          <el-table-column label="操作" align="center">
            <template #="{ row, $index }">
              <el-button
                :type="row.type ? 'success' : 'primary'"
                @click="setDefault(row, $index)"
              >
                设置默认
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="save">确认</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script lang="ts" setup name="SkuFrom">
import { reqGetAttr } from '@/api/shop/attr'
import { reqGetImageList, reqGetSaleAttrList } from '@/api/shop/spu'
import { ref } from 'vue'
import { reqAddSku } from '@/api/shop/spu'
import { ElMessage } from 'element-plus'

let $emit = defineEmits(['editCardFlag'])
// SKU详情信息
let attrList = ref([])
let imageList = ref([])
let saleAttrList = ref([])
let imageTable = ref()
// 要新增的SKU信息
let skuInfo = ref({
  // 父组件传递过来的SKU信息
  category3Id: '',
  spuId: '',
  tmId: '',
  // v-model绑定的SKU信息
  skuName: '',
  price: '',
  weight: '',
  skuDesc: '',
  skuAttrValueList: [],
  skuSaleAttrValueList: [],
  skuDefaultImg: '',
})

// 点击取消按钮
const cancel = () => {
  $emit('editCardFlag', { type: 0, method: '' })
}

// 获取SKU信息
const getSkuInfo = async ({ categoryId, row }) => {
  // 清除上次展示的数据
  attrList.value = []
  imageList.value = []
  saleAttrList.value = []
  skuInfo.value = {
    category3Id: '',
    spuId: '',
    tmId: '',
    skuName: '',
    price: '',
    weight: '',
    skuDesc: '',
    skuAttrValueList: [],
    skuSaleAttrValueList: [],
    skuDefaultImg: '',
  }
  // 解构出三级分类的id
  const { categoryId1, categoryId2, categoryId3 } = categoryId
  // 保存SKU的id信息
  skuInfo.value.category3Id = row.category3Id
  skuInfo.value.spuId = row.id
  skuInfo.value.tmId = row.tmId
  // 发起请求获取SKU的基本信息
  attrList.value = (await reqGetAttr(categoryId1, categoryId2, categoryId3))
    .data as any
  imageList.value = (await reqGetImageList(row.id)).data as any
  saleAttrList.value = (await reqGetSaleAttrList(row.id)).data as any
}

// 点击设置图片为默认按钮
const setDefault = (row, index) => {
  // 更改点击按钮的type
  imageTable.value.data.map((item) => (item.type = false))
  imageTable.value.data[index].type = true
  // 更改点击按钮的复选框
  imageList.value.map((item) =>
    imageTable.value.toggleRowSelection(item, false),
  )
  imageTable.value.toggleRowSelection(row, true)
  // 保存点击图片的地址
  skuInfo.value.skuDefaultImg = row.imgUrl
}

// 点击确认按钮
const save = async () => {
  skuInfo.value.skuAttrValueList = attrList.value.reduce((prev, next) => {
    if (next.value) {
      let [attrId, valueId] = next.value.split(':')
      prev.push({ attrId, valueId })
    }
    return prev
  }, [])

  skuInfo.value.skuSaleAttrValueList = saleAttrList.value.reduce(
    (prev, next) => {
      if (next.value) {
        let [saleAttrId, saleAttrValueId] = next.value.split(':')
        prev.push({ saleAttrId, saleAttrValueId })
      }
      return prev
    },
    [],
  )
  const { code } = await reqAddSku(skuInfo.value)
  if (code === 200) {
    ElMessage.success('添加成功')
    $emit('editCardFlag', { type: 0, method: '' })
  } else ElMessage.error('添加失败')
}

// 暴露方法
defineExpose({ getSkuInfo })
</script>

<style lang="scss" scoped>
.card {
  margin: 20px 0;

  .btnBox {
    margin: 10px 0;
  }

  .img {
    width: 150px;
    height: 150px;
  }

  .select {
    width: 300px;
  }
}
</style>
