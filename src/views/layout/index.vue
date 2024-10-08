<template>
<div class="layout_container">
    <div class="layout_slider"> </div>

    <div class="layout_tabbar"> </div>

    <!-- 内容展示区域 -->
    <div class="layout_main">
        <p style="height: 1000000px">111</p>
    </div>
</div>



</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
    .layout_container {
        width: 100%;
        height: 100vh;
        .layout_slider {
            width: $base-menu-width;
            height: 100vh;
            background-color: $base-menu-background;
        }
        .layout_tabbar {
            position: fixed;
            height: $base-tabbar-height;
            width: calc(100% - $base-menu-width);
            left: $base-menu-width;
            background: cyan;
            top: 0;
        }
        .layout_main {
            position: absolute;
            height: calc(100vh - $base-tabbar-height);
            width: calc(100% - $base-menu-width); // width= padding + 真实width
            left: $base-menu-width;
            top:  $base-tabbar-height;
            background: yellow;
            padding: 20px;
            overflow: auto;
        }
    }
</style>