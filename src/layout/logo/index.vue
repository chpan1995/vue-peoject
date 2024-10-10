<template>
    <div class="logo">
        <img :src="setting.logo">
        <p> {{ setting.title }} </p>
    </div>

</template>

<script setup lang="ts">
// 带default就不用 {} default应该默认导出的对象
import setting from '@/setting'

</script>

<style lang="scss" scoped>
.logo {
    width: 100%;
    height: $base-menu-logo-height;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
        width: 50px;
        height: 50px;
    }

    p {
        margin: 10px;
        color: white;
        font-size: 30px;
    }
}
</style>