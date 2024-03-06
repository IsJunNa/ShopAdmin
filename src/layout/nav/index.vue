<template>
    <el-scrollbar class="root">
        <el-menu background-color="$left-nav-color" text-color="white">
            <el-menu-item index="1">首页</el-menu-item>
            <el-menu-item index="2">数据大屏</el-menu-item>
            <el-sub-menu index="3">
                <template #title>权限管理</template>
                <el-menu-item index="3-1">用户管理</el-menu-item>
                <el-menu-item index="3-2">角色管理</el-menu-item>
                <el-menu-item index="3-3">菜单管理</el-menu-item>
            </el-sub-menu>
        </el-menu>
    </el-scrollbar>
</template>

<script setup lang="ts" name="nav">

</script>

<style lang="scss" scoped>
div {
    width: 100%;
    height: calc(100% - $left-nav-logo-height - 40px);
    overflow: auto;
}
</style>