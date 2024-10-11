<template>
    <div class="tabbar">
        <div class="tabbar_left">
            <el-icon style="margin: 10px;" @click="expandOr">
                <component :is="!SettingStore.fold ? 'Expand' : 'Fold'"></component>
            </el-icon>

            <el-breadcrumb :separator-icon="ArrowRight">
                <el-breadcrumb-item v-for="(item, index) in $useRoute.matched" :key="index" v-show="item.meta.title"
                    :to="item.path">
                    {{ item.meta.title }}
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <div class="tabbar_right">
            <el-button icon="Refresh" circle></el-button>
            <el-button icon="FullScreen" circle></el-button>
            <el-button icon="Setting" circle></el-button>

            <img src="/logo.png" style="width: 40px;height: 40px; margin-left: 20px; margin-right: 5px;">

            <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                    系统设置
                    <el-icon class="el-icon--right">
                        <arrow-down />
                    </el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item>退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>

    </div>
</template>

<script setup lang="ts">
import { Expand, Refresh, FullScreen, Setting, ArrowRight, Fold } from '@element-plus/icons-vue';
import { useRoute } from 'vue-router'
import useLayOutSettingStore from '@/store/modules/setting.ts'

let SettingStore = useLayOutSettingStore();
let $useRoute = useRoute();

let expandOr = () => {
    SettingStore.fold = !SettingStore.fold
}

</script>

<style lang="scss">
.tabbar {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;

    background: linear-gradient(to right, rgb(247, 243, 243) , rgb(250, 229, 229), rgb(245, 243, 243) );

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

        .el-breadcrumb__item {
            height: 24px;
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