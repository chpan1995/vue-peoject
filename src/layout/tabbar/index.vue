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
            <el-button icon="Refresh" circle @click="fresh"></el-button>
            <el-button icon="FullScreen" circle @click="fullScreen"></el-button>
            <el-button icon="Setting" circle></el-button>

            <img :src="userStore.avatar" style="width: 40px;height: 40px; margin-left: 20px; margin-right: 5px;">

            <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                    {{userStore.username}}
                    <el-icon class="el-icon--right">
                        <arrow-down />
                    </el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item aria-disabled="false" @click="logout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>

    </div>
</template>

<script setup lang="ts">
import { Expand, Refresh, FullScreen, Setting, ArrowRight, Fold } from '@element-plus/icons-vue';
import { useRoute,useRouter } from 'vue-router'
import useLayOutSettingStore from '@/store/modules/setting.ts'
import  useSserStore from '@/store/modules/user.ts'

let SettingStore = useLayOutSettingStore();
let $useRoute = useRoute();
let $useRouter = useRouter();
let userStore = useSserStore();

let expandOr = () => {
    SettingStore.fold = !SettingStore.fold
}

const fresh=()=>{
    SettingStore.refresh = !SettingStore.refresh
}

const fullScreen = () =>{
    if(document.fullscreenElement) {
        document.exitFullscreen();
    }else {
        document.documentElement.requestFullscreen();
    }
   
}

const logout = async()=> {
    try {
        await userStore.userLogout();
        $useRouter.push({path:'/login',query:{redirect:$useRoute.path}});
    } catch (error:any) {
        console.log(error.message);
    }
   
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