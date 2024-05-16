<template>
  <el-card class="card">
    <!-- 新增按钮 -->
    <el-button
      type="primary"
      icon="Plus"
      @click="addTrademark"
      v-btn="'btn.Trademark.add'"
    >
      添加品牌
    </el-button>
    <!-- 表格组件 -->
    <el-table class="table" border :data="trademarkArr">
      <el-table-column
        align="center"
        label="序号"
        width="100px"
        type="index"
      ></el-table-column>
      <el-table-column align="center" label="名称">
        <template #="{ row }">{{ row.tmName }}</template>
      </el-table-column>
      <el-table-column align="center" label="LOGO">
        <template #="{ row }">
          <img :src="row.logoUrl" style="height: 100px" alt="图片加载失败" />
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template #="{ row }">
          <!-- 修改按钮 -->
          <el-button
            type="primary"
            icon="edit"
            @click="updateTrademark(row)"
            v-btn="'btn.Trademark.update'"
          ></el-button>
          <!-- 删除按钮 -->
          <el-popconfirm
            width="200px"
            icon="Delete"
            icon-color="red"
            :title="`确定要删除&quot;${row.tmName}&quot;吗`"
            @confirm="deleteTrademark(row.id)"
          >
            <template #reference>
              <el-button
                type="danger"
                v-btn="'btn.Trademark.remove'"
                icon="delete"
              ></el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器组件 -->
    <el-pagination
      v-model:current-page="pageNo"
      v-model:page-size="pageSize"
      :page-sizes="pageSizes"
      background
      layout="prev,pager, next, jumper,->,sizes,total"
      :total="total"
      @current-change="changePagoNo"
      @size-change="changePageSizes"
    />
    <!-- 对话框组件 -->
    <el-dialog v-model="showDialog" :title="dialogTitle" width="500">
      <el-form :model="trademarkData" :rules="rules" ref="formRef">
        <!-- 品牌名称 -->
        <el-form-item label="品牌名称" label-width="100px" prop="tmName">
          <el-input
            placeholder="请输入品牌名称"
            v-model="trademarkData.tmName"
          ></el-input>
        </el-form-item>
        <!-- 品牌图标 -->
        <el-form-item label="品牌LOGO" label-width="100px" prop="logoUrl">
          <el-upload
            drag
            class="avatar-uploader"
            action="http://sph-api.atguigu.cn/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img
              v-if="trademarkData.logoUrl"
              :src="trademarkData.logoUrl"
              class="avatar"
            />
            <el-icon v-else class="avatar-uploader-icon">
              <Plus />
            </el-icon>
          </el-upload>
        </el-form-item>
      </el-form>
      <!-- 对话框按钮 -->
      <template #footer>
        <el-button type="primary" @click="confirm">确定</el-button>
        <el-button @click="cancel">取消</el-button>
      </template>
    </el-dialog>
  </el-card>
</template>

<script setup lang="ts" name="strdmark">
import { ref } from 'vue'
import { recordsType } from '@/api/shop/strdmark/type'
import {
  reqHasTrademark,
  reqAddTrademark,
  reqUpdateTrademark,
  reqDeleteTrademark,
} from '@/api/shop/strdmark/index'
import { onMounted } from 'vue'
import { ElMessage, type UploadProps } from 'element-plus'

// 当前页码(v-model:current-page)
let pageNo = ref<number>(1)
// 每一页展示多少条数据(v-model:page-size)
let pageSize = ref<number>(3)
// 设置显示个数选择器的内容(:page-sizes)
let pageSizes = ref<number[]>([3, 5, 7, 9])
// 已有品牌的总数
let total = ref<number>(1)
// 展示的品牌列表
let trademarkArr = ref<recordsType[]>([])
// 对话框是否隐藏
let showDialog = ref<boolean>(false)
// 新增的品牌数据
let trademarkData = ref<recordsType>({
  logoUrl: '',
  tmName: '',
  id: 0,
})
// 最大页数
let maxPage = ref<number>(1)
// 对话框标题
let dialogTitle = ref<string>('')
// form表单实例对象
let formRef = ref()

// 页面初始化获取品牌数据
onMounted(() => {
  getHasTrademark()
})
// 获取品牌数据
const getHasTrademark = async () => {
  let res = await reqHasTrademark(pageNo.value, pageSize.value)
  // 请求成功
  if (res.code === 200) {
    // 判断图片路径是否完整,不完整补全图片路径
    res.data.records.map((item) => {
      if (item.logoUrl.indexOf('http') === -1)
        item.logoUrl = 'http://' + item.logoUrl
    })
    total.value = res.data.total
    trademarkArr.value = res.data.records
    maxPage.value = res.data.pages
  }
}
// 分页器页数改变
const changePagoNo = () => getHasTrademark()
// 页数选择器改变
const changePageSizes = () => getHasTrademark()
// 点击添加品牌按钮
const addTrademark = () => {
  close()
  dialogTitle.value = '添加品牌'
  showDialog.value = true
}
// 点击修改品牌按钮
const updateTrademark = (row) => {
  close()
  dialogTitle.value = '修改品牌'
  showDialog.value = true
  trademarkData.value.tmName = row.tmName
  trademarkData.value.logoUrl = row.logoUrl
  trademarkData.value.id = row.id
}
// 关闭对话框
const close = () => {
  // 隐藏对话框
  showDialog.value = false
  // 重置所有数据
  trademarkData.value.logoUrl = ''
  trademarkData.value.tmName = ''
  trademarkData.value.id = 0
  // 清除表单验证信息
  formRef.value?.clearValidate()
}
// 对话框的取消按钮
const cancel = () => {
  close()
}
// 对话框的确定按钮
const confirm = async () => {
  // 表单内容校验
  await formRef.value.validate()
  // 定义变量来保存返回结果
  let res
  // 没有id走新增接口
  if (!trademarkData.value.id)
    res = await reqAddTrademark({
      logoUrl: trademarkData.value.logoUrl,
      tmName: trademarkData.value.tmName,
    })
  // 有则走修改接口
  else
    res = await reqUpdateTrademark({
      logoUrl: trademarkData.value.logoUrl,
      tmName: trademarkData.value.tmName,
      id: trademarkData.value.id,
    })
  // 判断是否为当前最后一条数据,是则新增成功后跳转的页数在最大页数基础上加一
  if (total.value % pageSize.value === 0)
    trademarkData.value.id ? pageNo.value : (pageNo.value = maxPage.value + 1)
  else trademarkData.value.id ? pageNo.value : (pageNo.value = maxPage.value)
  // 成功
  if (res.code === 200) {
    // 弹出成功提示框
    ElMessage({
      type: 'success',
      message: trademarkData.value.id ? '修改成功' : '新增成功',
    })
    // 重新获取数据
    getHasTrademark()
  }
  // 失败
  else
    ElMessage({
      type: 'error',
      message: trademarkData.value.id ? '失败成功' : '新增失败',
    })
  // 关闭对话框
  close()
}
// 限制logo上传文件类型(文件上传成功之前调用的钩子)
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  // 限制文件类型
  if (
    rawFile.type === 'image/jpeg' ||
    rawFile.type === 'image/jpg' ||
    rawFile.type === 'image/gif' ||
    rawFile.type === 'image/png'
  ) {
    // 限制文件大小不能超过4MB
    if (rawFile.size / 1024 / 1024 < 4) return true
    else {
      ElMessage({
        type: 'error',
        message: '超过最大文件大小4MB',
      })
      return false
    }
  } else {
    ElMessage({
      type: 'error',
      message: '该文件类型暂不支持',
    })
    return false
  }
}
// 图片上传成功将资源路径保存到trademarkData中
const handleAvatarSuccess: UploadProps['onSuccess'] = (response) => {
  trademarkData.value.logoUrl = response.data
  // 清除表单校验数据
  formRef.value.clearValidate()
}
// 品牌名称校验规则
const tmNameRule = (_, value: any, callBack: any) => {
  if (value.trim().length >= 2) callBack()
  else callBack(new Error('品牌名称需大于2位'))
}
// 品牌logo校验规则
const logoUrlRule = (_, value: any, callBack: any) => {
  if (value) callBack()
  else callBack(new Error('请选择上传图片'))
}
// 表单校验规则
const rules = {
  tmName: [{ required: true, trigger: 'change', validator: tmNameRule }],
  logoUrl: [{ required: true, validator: logoUrlRule }],
}
// 删除品牌
const deleteTrademark = async (id) => {
  const res = await reqDeleteTrademark(id)
  // 删除成功
  if (res.code === 200) {
    // 弹出提示信息
    ElMessage({ type: 'success', message: '删除成功' })
    // 重新获取数据
    getHasTrademark()
  }
  // 删除失败
  else ElMessage({ type: 'error', message: '删除失败' })
}
</script>

<style lang="scss" scoped>
.card {
  .table {
    margin: 10px;
  }

  .avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);

    img {
      width: 80%;
      height: 50%;
    }
  }

  .avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
  }

  .el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
  }

  .avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
  }

  .avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
  }

  .el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
  }
}
</style>
