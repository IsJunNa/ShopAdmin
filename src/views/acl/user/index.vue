<template>
  <div class="acl">
    <!-- 搜索区卡片 -->
    <el-card class="card">
      <el-form inline class="form">
        <el-form-item label="账号" class="formItem">
          <el-input
            placeholder="请输入账号"
            class="input"
            v-model="searchValue"
          ></el-input>
        </el-form-item>
        <el-form-item class="formItem">
          <el-button
            type="primary"
            :disabled="!searchValue"
            @click="searchUserList"
          >
            搜索
          </el-button>
          <el-button :disabled="!searchValue" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 展示区卡片 -->
    <el-card>
      <!-- 操作按钮 -->
      <el-button type="primary" @click="addUser" v-btn="'btn.User.add'">
        添加
      </el-button>
      <el-button
        type="danger"
        @click="deleteUserList"
        :disabled="deleteUserIds.length === 0 ? true : false"
        v-btn="'btn.User.remove'"
      >
        批量删除
      </el-button>
      <!-- 展示的表单 -->
      <el-table
        border
        class="table"
        :data="userList"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" align="center"></el-table-column>
        <el-table-column
          label="序号"
          type="index"
          align="center"
          width="60"
        ></el-table-column>
        <el-table-column
          label="id"
          align="center"
          prop="id"
          width="80"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          label="账号"
          align="center"
          prop="username"
          width="100"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          label="姓名"
          align="center"
          prop="name"
          width="100"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column label="角色" align="center" width="210">
          <template #="{ row }">
            <el-tag
              type="danger"
              class="tag"
              v-if="row.roleName === '暂未分配'"
            >
              暂未分配
            </el-tag>
            <el-tag
              v-else
              type="success"
              class="tag"
              v-for="(item, index) in row.roleName"
              :key="index"
            >
              {{ item }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label=" 创建时间"
          align="center"
          prop="createTime"
          width="180"
        ></el-table-column>
        <el-table-column
          label="更新时间"
          align="center"
          prop="updateTime"
          width="180"
        ></el-table-column>
        <el-table-column label="操作" align="center" fixed="right" width="200">
          <template #="{ row }">
            <!-- 分配角色按钮 -->
            <el-button
              v-btn="'btn.User.assgin'"
              type="primary"
              size="small"
              icon="User"
              title="分配角色"
              @click="assignRoles(row)"
            ></el-button>
            <!-- 编辑按钮 -->
            <el-button
              v-btn="'btn.User.update'"
              type="warning"
              size="small"
              icon="Edit"
              title="编辑"
              @click="editUserInfo(row)"
            ></el-button>
            <!-- 删除按钮 -->
            <el-popconfirm
              :title="`确定要删除 ${row.username} 吗？`"
              width="auto"
              @confirm="deleteUser(row)"
            >
              <template #reference>
                <el-button
                  v-btn="'btn.User.remove'"
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
        @current-change="getUserList"
        @size-change="getUserList"
      />
    </el-card>
    <!-- 新增/编辑用户卡片 -->
    <el-drawer
      v-model="addOrEditDrawerFlag"
      :title="userInfo.id != '' ? '修改用户' : '添加用户'"
    >
      <!-- 内容展示区 -->
      <template #default>
        <el-form :model="userInfo" :rules="rules" ref="formRef">
          <el-form-item label="用户账号" prop="username">
            <el-input
              placeholder="请填写用户账号"
              v-model="userInfo.username"
            ></el-input>
          </el-form-item>
          <el-form-item label="用户姓名" prop="name">
            <el-input
              placeholder="请填写用户姓名"
              v-model="userInfo.name"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="用户密码"
            prop="password"
            v-if="userInfo.id === ''"
          >
            <el-input
              placeholder="请填写用户密码"
              v-model="userInfo.password"
            ></el-input>
          </el-form-item>
        </el-form>
      </template>
      <!-- 底部按钮 -->
      <template #footer>
        <el-button type="primary" @click="save">确认</el-button>
        <el-button @click="addOrEditDrawerFlag = false">取消</el-button>
      </template>
    </el-drawer>
    <!-- 分配角色卡片 -->
    <el-drawer v-model="roleDrawerFlag" title="分配角色">
      <!-- 内容展示区 -->
      <template #default>
        <el-form label-width="80px">
          <el-form-item label="用户账号">
            <el-input v-model="userInfo.username" disabled></el-input>
          </el-form-item>
          <el-form-item label="角色列表">
            <el-checkbox
              label="全选"
              v-model="checkAll"
              :indeterminate="indeterminate"
              @change="checkAllChange"
            ></el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-checkbox-group
              v-model="userRoles"
              @change="handleCheckedChange"
            >
              <el-checkbox
                :value="item"
                v-for="item in allRoles"
                :key="item.id"
              >
                {{ item.roleName }}
              </el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
      </template>
      <!-- 底部按钮 -->
      <template #footer>
        <el-button type="primary" @click="saveRoles">确认</el-button>
        <el-button @click="roleDrawerFlag = false">取消</el-button>
      </template>
    </el-drawer>
  </div>
</template>

<script setup lang="ts" name="user">
import { ref, onMounted, nextTick } from 'vue'
import {
  reqGetUserList,
  reqGetRole,
  reqAddUser,
  reqUpdateUser,
  reqDeleteUser,
  reqGetRoleList,
  reqUpdateUserRole,
  reqDeleteUserList,
} from '@/api/acl/user'
import { ElMessage } from 'element-plus'
import useUserStore from '@/store/modules/user'
import router from '@/router'

// 分页器页码
let pageNo = ref(1)
// 分页器一页展示数据条数
let pageSize = ref(6)
// 数据总条数
let total = ref(0)
// 搜索用户的关键字
let searchValue = ref('')
// 用户列表
let userList = ref([])
// 新增用户弹窗的显示与隐藏
let addOrEditDrawerFlag = ref(false)
// 用户详情信息
let userInfo = ref({ id: '', username: '', name: '', password: '' })
// 表单ref
let formRef = ref()
// 分配角色弹窗的显示与隐藏
let roleDrawerFlag = ref<boolean>(false)
// 用户名称
let userName = ref('')

// 清除表单
const clearForm = () => {
  if (formRef.value) {
    nextTick(() => {
      formRef.value.clearValidate('username')
      formRef.value.clearValidate('name')
      formRef.value.clearValidate('password')
    })
  }
  userInfo.value = { id: '', username: '', name: '', password: '' }
}

// 获取用户列表
const getUserList = async () => {
  const res = await reqGetUserList(
    pageNo.value,
    pageSize.value,
    searchValue.value,
  )
  total.value = res.data.total
  userList.value = res.data.records
  userList.value.map((item) => {
    if (!item.roleName) item.roleName = '暂未分配'
    else item.roleName = item.roleName.split(',')
  })
}

// 点击新增用户按钮
const addUser = () => {
  clearForm()
  addOrEditDrawerFlag.value = true
}

// 点击修改用户信息按钮
const editUserInfo = async (row) => {
  clearForm()
  const { data } = await reqGetRole(row.id)
  userName.value = data.username
  userInfo.value = data
  addOrEditDrawerFlag.value = true
}

// 点击保存按钮
const userStore = useUserStore()
const save = async () => {
  await formRef.value.validate()
  // 新增用户
  if (userInfo.value.id === '') {
    const { code } = await reqAddUser(userInfo.value)
    if (code === 200) {
      ElMessage.success('添加成功')
      getUserList()
      addOrEditDrawerFlag.value = false
    } else ElMessage.error('添加失败')
  }
  // 修改用户
  else {
    const { code } = await reqUpdateUser(userInfo.value)
    if (code === 200) {
      ElMessage.success('修改成功')
      addOrEditDrawerFlag.value = false
      if (userStore.username === userName.value) {
        userStore.logout()
        ElMessage.warning('当前账户信息发送变更,请重新登录')
        setTimeout(() => {
          router.push('/login')
        }, 2000)
      } else getUserList()
    } else ElMessage.error('修改失败')
  }
}

// 表单校验规则
const usernameValidator = (_: any, value, callBack) => {
  if (value.trim().length >= 5 && value.trim().length <= 10) callBack()
  else callBack(new Error('用户名为5-10位英文或数字'))
}
const nameValidator = (_: any, value, callBack) => {
  if (value.trim().length >= 2 && value.trim().length <= 6) callBack()
  else callBack(new Error('昵称为2-6位英文或数字'))
}
const passwordValidator = (_: any, value, callBack) => {
  if (value.trim().length >= 6 && value.trim().length <= 15) callBack()
  else callBack(new Error('密码为6-15位英文或数字'))
}
const rules = {
  username: [{ required: true, trigger: 'blur', validator: usernameValidator }],
  name: [{ required: true, trigger: 'blur', validator: nameValidator }],
  password: [{ required: true, trigger: 'blur', validator: passwordValidator }],
}

// 点击分配角色
const assignRoles = async (row) => {
  const { data } = await reqGetRole(row.id)
  userInfo.value = data
  roleDrawerFlag.value = true
  userRoles.value = []
  getRoleList()
}

// 点击分配角色的保存按钮
const saveRoles = async () => {
  const data = {
    userId: userInfo.value.id,
    roleIdList: userRoles.value.map((item) => (item = item.id)),
  }
  const { code } = await reqUpdateUserRole(data)
  if (code === 200) {
    if (userStore.username === userName.value) {
      userStore.logout()
      ElMessage.warning('当前账户信息发送变更,请重新登录')
      setTimeout(() => {
        router.push('/login')
      }, 2000)
    } else getUserList()
    roleDrawerFlag.value = false
  } else ElMessage.error('修改失败')
}

// 点击删除单个用户
const deleteUser = async (row) => {
  const { code } = await reqDeleteUser(row.id)
  if (code === 200) {
    ElMessage.success('删除成功')
    getUserList()
  } else ElMessage.error('删除失败')
}

// 角色全选框
let checkAll = ref<boolean>(false)
// 角色全选框不确定状态
let indeterminate = ref<boolean>(false)
// 已有角色
let allRoles = ref([])
// 用户角色
let userRoles = ref([])
// 角色全选框的change事件
const checkAllChange = (val: boolean) => {
  val ? (userRoles.value = allRoles.value) : (userRoles.value = [])
  indeterminate.value = false
}
// 单个角色的change事件
const handleCheckedChange = (val) => {
  if (allRoles.value.length == val.length) {
    checkAll.value = true
    indeterminate.value = false
  } else if (val.length > 0) {
    checkAll.value = false
    indeterminate.value = true
  } else {
    checkAll.value = false
    indeterminate.value = false
  }
}

// 获取用户角色
const getRoleList = async () => {
  const { data } = await reqGetRoleList(userInfo.value.id)
  allRoles.value = data.allRolesList
  userRoles.value = data.assignRoles
  handleCheckedChange(userRoles.value)
}

/* 批量删除 */
// 表单已勾选的用户的id
let deleteUserIds = ref([])
// 表单checkbox的change事件
const handleSelectionChange = async (val: any) => {
  deleteUserIds.value = val.map((item) => item.id)
}
// 点击批量删除
const deleteUserList = async () => {
  const { code } = await reqDeleteUserList(deleteUserIds.value)
  if (code === 200) {
    ElMessage.success('删除成功')
    getUserList()
  } else ElMessage.error('删除失败')
}

// 点击搜索用户按钮
const searchUserList = async () => {
  const res = await reqGetUserList(
    pageNo.value,
    pageSize.value,
    searchValue.value,
  )
  total.value = res.data.total
  userList.value = res.data.records
  userList.value.map((item) => {
    if (!item.roleName) item.roleName = '暂未分配'
    else item.roleName = item.roleName.split(',')
  })
}

// 点击搜索后的重置按钮
const reset = () => {
  searchValue.value = ''
  getUserList()
}

// 生命周期函数
onMounted(async () => {
  getUserList()
})
</script>

<style lang="scss" scoped>
.card {
  margin-bottom: 20px;

  .form {
    display: flex;
    justify-content: space-between;

    .formItem {
      margin: 0;

      .input {
        width: 200px;
      }
    }
  }
}

.table {
  margin: 20px 0;
}

.tag {
  margin: 5px;
}
</style>
