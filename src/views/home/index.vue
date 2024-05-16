<template>
  <el-card>
    <div class="box">
      <el-avatar :src="userStore.avatar" class="avatar" :size="50"></el-avatar>
      <div class="bottom">
        <h3 class="title">{{ getTime() }},{{ userStore.username }}</h3>
        <p class="subtitle">{{ setting.title }}</p>
      </div>
    </div>
  </el-card>
  <div class="bottoms">
    <img src="../../assets/icons/huanying.gif" />
  </div>
</template>

<script setup lang="ts">
import getTime from '@/utils/time'
//引入用户相关的仓库,获取当前用户的头像、昵称
import useUserStore from '@/store/modules/user'
//获取存储用户信息的仓库对象
let userStore = useUserStore()
import setting from '@/setting'
</script>

<style scoped lang="scss">
.box {
  display: flex;
  align-items: center;

  .avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }

  .bottom {
    margin-left: 20px;

    .title {
      font-size: 30px;
      font-weight: 900;
    }

    .subtitle {
      margin: 10px 0;
    }
  }
}

.bottoms {
  margin-top: 10px;
  display: flex;
  justify-content: center;

  img {
    width: 400px;
  }
}
</style>
