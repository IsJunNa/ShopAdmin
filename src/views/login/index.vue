<template>
    <div class="mainBox">
        <el-row>
            <el-col :span="13" :xs="0"></el-col>
            <el-col :span="11" :xs="24">
                <div class="loginBox">
                    <p class="title">硅谷甄选管理后台</p>
                    <el-form :model="loginInfo" :rules="rules" ref="loginForm">
                        <el-form-item prop="username">
                            <el-input v-model="loginInfo.username" placeholder="账号" type="text" :prefix-icon="User"
                                class="input"></el-input>
                        </el-form-item>
                        <el-form-item prop="password">
                            <el-input v-model="loginInfo.password" placeholder="密码" type="password" :prefix-icon="Lock"
                                class="input" show-password></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" class="loginBtn" :loading="loadingFlag"
                                @click="userLogin">登录</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script setup lang="ts" name="login">
/* element图标 */
import { User } from '@element-plus/icons-vue';
import { Lock } from '@element-plus/icons-vue';

/* element提示 */
import { ElNotification } from 'element-plus'

/* 响应式数据 */
import { ref, reactive } from 'vue'

/* 用户相关数据仓库 */
import useUserStore from '@/store/modules/user';
let userStore = useUserStore()

/* 路由跳转 */
import { useRouter } from 'vue-router'
let router = useRouter()

/* 时间信息 */
import getTime from '@/utils/time'

/* 数据 */
// 用户登录数据
let loginInfo = reactive({
    username: 'admin',
    password: '123456'
})

// 表单组件
let loginForm = ref()

// 登录按钮加载
let loadingFlag = ref(false)

// 自定义验证规则
const usernameRules = (rule: object, value: string, callback: any) => {
    // rule:验证对象 value:表单内容 callback:放行函数
    if (value.length >= 5 && value.length <= 10) callback()
    else callback(new Error('用户名为5-10位英文或数字'))
}
const passwordRules = (rule: object, value: string, callback: any) => {
    if (value.length >= 6 && value.length <= 15) callback()
    else callback(new Error('密码为6-15位英文或数字'))
}

// element自带表单验证
/* const rules = {
    username: [
        { min: 6, max: 15, message: '密码为6-15位英文或数字', trigger: 'blur' }
    ],
    password: [
        { min: 6, max: 15, message: '密码为6-15位英文或数字', trigger: 'blur' }
    ]
} */



/* 方法 */
// 用户登录
const userLogin = async () => {
    // 是否通过表单验证
    await loginForm.value.validate()

    loadingFlag.value = true
    // 登录成功
    try {
        await userStore.userLogin(loginInfo)
        router.push('/home')
        ElNotification({
            type: 'success',
            message: '登陆成功',
            title: `Hi,${getTime()}`
        })
        // 登陆失败
    } catch (error) {
        ElNotification({
            type: 'error',
            message: error
        })
    } finally {
        loadingFlag.value = false
    }
}


</script>

<style lang="scss" scoped>
.mainBox {
    width: 100vw;
    height: 100vh;
    background: url('@/assets/images/background.jpg')no-repeat;
    background-size: 100% 100%;

    .loginBox {
        width: 80%;
        height: 110%;
        border-radius: 15px;
        position: relative;
        top: 35vh;
        background: url('@/assets/images/login_form.png') no-repeat;
        padding: 20px 70px;
        background-size: 100% 100%;

        .title {
            color: white;
            font-size: 25px;
            font-weight: bold;
            text-align: center;
            line-height: 50px;
            margin: 10px auto;
        }

        .loginBtn {
            margin-top: 15px;
            width: 100%;
        }
    }
}
</style>