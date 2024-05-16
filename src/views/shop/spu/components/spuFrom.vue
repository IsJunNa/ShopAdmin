<template>
  <el-card class="card">
    <el-form>
      <el-form-item label="SPU名称">
        <el-input
          placeholder="请输入SPU名称"
          v-model="spuInfo.spuName"
        ></el-input>
      </el-form-item>
      <el-form-item label="SPU品牌">
        <el-select v-model="spuInfo.tmId">
          <el-option
            :label="item.tmName"
            :value="item.id"
            v-for="(item, index) in allBrand"
            :key="index"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="SPU描述">
        <el-input
          type="textarea"
          placeholder="请输入SPU描述"
          v-model="spuInfo.description"
        ></el-input>
      </el-form-item>
      <el-form-item label="SPU图片">
        <el-upload
          action="http://sph-api.atguigu.cn/admin/product/fileUpload"
          v-model:fileList="imageList"
          list-type="picture-card"
          :on-preview="showDialog"
          :on-remove="removeImg"
          :before-upload="beforeUpload"
        >
          <el-icon>
            <Plus />
          </el-icon>
        </el-upload>

        <el-dialog v-model="dialogFlag">
          <img w-full :src="dialogImgUrl" />
        </el-dialog>
      </el-form-item>
      <el-form-item label="销售属性">
        <div class="salesAttribute">
          <el-select
            v-model="saleAttrListValue"
            :placeholder="
              filterSaleAttrList.length != 0
                ? `还有${filterSaleAttrList.length}项未选择`
                : '暂无数据可选择'
            "
          >
            <el-option
              :label="item.name"
              :value="`${item.id}:${item.name}`"
              v-for="item in filterSaleAttrList"
              :key="item.id"
            ></el-option>
          </el-select>
          <el-button
            type="primary"
            icon="Plus"
            class="btn"
            :disabled="saleAttrListValue ? false : true"
            @click="addSaleAttr"
          >
            添加属性
          </el-button>
        </div>
        <!-- 销售属性表单 -->
        <el-table :border="true" :data="saleAttrList">
          <el-table-column
            label="序号"
            align="center"
            type="index"
            width="100"
          ></el-table-column>
          <el-table-column
            label="属性名"
            align="center"
            prop="saleAttrName"
          ></el-table-column>
          <el-table-column label="属性值" align="center">
            <template #="{ row }">
              <el-tag
                v-for="(item, index) in row.spuSaleAttrValueList"
                :key="row.id"
                class="tag"
                closable
                @close="row.spuSaleAttrValueList.splice(index, 1)"
              >
                {{ item.saleAttrValueName }}
              </el-tag>
              <el-button
                v-show="!row.flag"
                type="primary"
                icon="Plus"
                size="small"
                @click="toEdit(row)"
              ></el-button>
              <el-input
                v-show="row.flag"
                @blur="toShowButton(row)"
                class="editInput"
                placeholder="请输入属性值"
                v-model="row.inputValue"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template #="{ row }">
              <el-button
                type="danger"
                icon="Delete"
                size="small"
                @click="deleteSaleAttr(row)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 保存与取消按钮 -->
        <div class="btnBox">
          <el-button type="primary" @click="confirm">保存</el-button>
          <el-button @click="cancel">取消</el-button>
        </div>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script lang="ts" setup name="spuFrom">
import {
  reqGetAllBrand,
  reqGetImageList,
  reqGetSaleAttrList,
  reqGetBaseSaleAttrList,
} from '@/api/shop/spu'
import { ref, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { reqAddSpuInfo, reqEditSpuInfo } from '@/api/shop/spu'

let $emit = defineEmits(['editCardFlag'])
let dialogFlag = ref<boolean>(false)
// 预览图片地址
let dialogImgUrl = ref('')

// 清除数据
const clearInfo = () => {
  allBrand.value = []
  imageList.value = []
  saleAttrList.value = []
  baseSaleAttrList.value = []
  saleAttrListValue.value = ''
  spuInfo.value = {
    spuName: '',
    description: '',
    tmId: '',
    spuImageList: [],
    spuSaleAttrList: [],
    id: '',
    category3Id: '',
  }
}

// 点击取消按钮
const cancel = () => {
  // 切换模式,清除数据
  $emit('editCardFlag', 0)
  clearInfo()
}

// 点击保存按钮
const confirm = async () => {
  // 整理数据
  spuInfo.value.spuImageList = imageList.value.map((item) => {
    return {
      imgName: item.name,
      imgUrl: (item.response && item.response.data) || item.url,
    }
  })
  spuInfo.value.spuSaleAttrList = saleAttrList.value
  // 发起新增请求
  if (!spuInfo.value.id) {
    $emit('editCardFlag', { type: 0, method: 'add' })
    const res = await reqAddSpuInfo(spuInfo.value)
    if (res.code === 200) ElMessage.success('新增成功')
    else ElMessage.error('新增失败')
  }
  // 发起修改请求
  else {
    $emit('editCardFlag', { type: 0, method: 'edit' })
    const res = await reqEditSpuInfo(spuInfo.value)
    if (res.code === 200) ElMessage.success('修改成功')
    else ElMessage.error('修改失败')
  }
  // 切换模式,清除数据
  clearInfo()
}

// 获取spu详情
let allBrand = ref([])
let imageList = ref([])
let saleAttrList = ref([])
let baseSaleAttrList = ref([])
let spuInfo = ref({
  spuName: '',
  description: '',
  tmId: '',
  spuImageList: [],
  spuSaleAttrList: [],
  id: '',
  category3Id: '',
})
const getSpuInfo = async (row) => {
  clearInfo()
  const allBrandRes = await reqGetAllBrand()
  const imageListRes = await reqGetImageList(row.id)
  const saleAttrListRes = await reqGetSaleAttrList(row.id)
  const baseSaleAttrListRes = await reqGetBaseSaleAttrList()
  allBrand.value = allBrandRes.data
  imageList.value = imageListRes.data.map((item) => {
    return { name: item.imgName, url: item.imgUrl }
  })
  saleAttrList.value = saleAttrListRes.data
  baseSaleAttrList.value = baseSaleAttrListRes.data
  spuInfo.value = row
}

// 显示图片预览
const showDialog = (file) => {
  dialogImgUrl.value = file.url
  dialogFlag.value = true
}

// 删除图片
const removeImg = (file) => {
  imageList.value = imageList.value.filter((item) => item.name !== file.name)
}

// 图片上传成功前钩子
const beforeUpload = (file) => {
  if (file.type.indexOf('image') === -1) {
    ElMessage.error('上传图片格式错误')
    return false
  }
  if (file.size / 1024 / 1024 > 2) {
    ElMessage.error('上传头像图片大小不能超过 2MB!')
    return false
  }
}

// 计算SPU还未拥有的销售属性
let filterSaleAttrList = computed(() => {
  return baseSaleAttrList.value.filter((i1) => {
    return saleAttrList.value.every((i2) => i1.name !== i2.saleAttrName)
  })
})

// 点击添加属性按钮
let saleAttrListValue = ref<string>('')
const addSaleAttr = () => {
  const [baseSaleAttrId, saleAttrName] = saleAttrListValue.value.split(':')
  saleAttrList.value.push({
    saleAttrName,
    baseSaleAttrId,
    spuSaleAttrValueList: [],
  })
  saleAttrListValue.value = ''
}

// 点击编辑属性按钮
const toEdit = (row) => {
  row.flag = true
}

// 表单失焦切换回显示按钮
const toShowButton = (row) => {
  // 非法判断
  if (!row.inputValue.trim()) {
    ElMessage.error('属性值不能为空')
    return false
  } else if (
    row.spuSaleAttrValueList.find(
      (item) => item.saleAttrName === row.inputValue,
    )
  ) {
    ElMessage.error('属性值不能重复')
    return false
  }
  row.spuSaleAttrValueList.push({
    baseSaleAttrId: row.baseSaleAttrId,
    saleAttrValueName: row.inputValue,
  })
  row.inputValue = ''
  row.flag = false
}

// 添加销售属性
const addSpuInfo = async (category3Id) => {
  clearInfo()
  const allBrandRes = await reqGetAllBrand()
  const baseSaleAttrListRes = await reqGetBaseSaleAttrList()
  allBrand.value = allBrandRes.data
  baseSaleAttrList.value = baseSaleAttrListRes.data
  spuInfo.value.category3Id = category3Id
}

// 点击删除属性按钮
const deleteSaleAttr = (row) => {
  saleAttrList.value = saleAttrList.value.filter((item) => item.id != row.id)
}

defineExpose({ getSpuInfo, addSpuInfo })
</script>

<style lang="scss" scoped>
.card {
  margin: 20px 0;

  .salesAttribute {
    display: flex;
    width: 40%;
    margin-bottom: 10px;

    .btn {
      margin: 0 10px;
    }
  }

  .btnBox {
    margin: 10px 0;
  }

  .tag {
    margin: 0 5px;
  }

  .editInput {
    width: 106px;
    margin: 0 5px;
  }
}
</style>
