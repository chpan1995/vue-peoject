<template>
    <div class="tabbar">
        <div class="tabbar_left">
            <el-icon>
                <Expand></Expand>
            </el-icon>

            <el-breadcrumb :separator-icon="ArrowRight">
                <el-breadcrumb-item v-for="(item,index) in $useRoute.matched" :key="index" v-show="item.meta.title" >
                    {{item.meta.title}}
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <div class="tabbar_right">
            <el-button icon="Refresh" circle></el-button>
            <el-button icon="FullScreen" circle></el-button>
            <el-button icon="Setting" circle></el-button>
        </div>

    </div>
</template>

<script setup lang="ts">
import { Expand, Refresh, FullScreen, Setting,ArrowRight } from '@element-plus/icons-vue';
import { useRoute } from 'vue-router'

let $useRoute=useRoute();


</script>

<style lang="scss">
.tabbar {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;

    .tabbar_left {
        display: flex;
        align-items: center;

        .el-icon {
            width: 24px;
            height: 24px;
        }

        .el-icon svg {
            width: 24px;
            height: 24px;
        }

        .el-breadcrumb {
            margin: 20px;
            font-size: 18px;
        }
        .el-breadcrumb-item{
            vertical-align: middle;
        }
    }

    .tabbar_right {
        display: flex;
        justify-content: right;
        align-items: center;
        margin-right: 10px;
    }
}
</style>