<template>
    <div class="mianBox">
        <div class="leftNav">
            <div class="logo">
                <logo></logo>
            </div>
            <mainNav></mainNav>
        </div>
        <div class="topNav"></div>
        <div class="content">
            <p style="height: 1000px;"></p>
        </div>
    </div>
</template>

<script setup lang="ts" name="home">
import logo from '@/layout/logo/index.vue'
import mainNav from '@/layout/nav/index.vue'
</script>

<style lang="scss" scoped>
.mianBox {
    width: 100vw;
    height: 100vh;

    .leftNav {
        width: $left-nav-width;
        height: 100vh;
        background-color: $left-nav-color;

        .logo {
            height: calc($left-nav-logo-height + 40px);
            display: flex;
            align-items: center;
        }
    }

    .topNav {
        width: calc(100vw - $left-nav-width );
        height: $top-nav-height;
        position: fixed;
        left: $left-nav-width;
        top: 0vh;
        background-color: greenyellow;
    }

    .content {
        width: calc(100vw - $left-nav-width);
        height: calc(100vh - $top-nav-height);
        position: absolute;
        left: $left-nav-width;
        top: calc(0vh + $top-nav-height);
        overflow: auto;
        padding: 20px;
        background-color: rgb(106, 106, 45);
    }
}
</style>