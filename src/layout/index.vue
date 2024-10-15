<template>
    <div class="layout_container">
        <div class="layout_slider">
            <Logo></Logo>
            <!-- el-menu 包在里面递归后应该是两个el-menu le -->
            <el-menu :collapse="SettingStore.fold" :default-active="$router.path" background-color="#001529"
            active-text-color="#ffd04b" text-color="white" class="elmenu" >
                <Menu :menu-list="useStore.menuRoutes"></Menu>
            </el-menu>
        </div>

        <div class="layout_tabbar" :class="{fold_tab: SettingStore.fold}"> 
            <tabbar></tabbar>
        </div>
            
        <!-- 内容展示区域 -->
        <div class="layout_main" :class="{fold_main: SettingStore.fold}">

            <router-view v-slot="{ Component }">
                <transition name="fade">
                    <!-- 渲染layout一级路由的子路由 -->
                    <component :is="Component" v-if="!fresh" />
                </transition>
            </router-view>
        </div>
    </div>


    <!-- 除大屏外其他路由都是二级路由，且其父路由都是layout，跳转时先把layout组件加载，其子路由在layout组件的view-router中加载 -->
</template>

<script setup lang="ts">
import Logo from './logo/index.vue'
import Menu from './menu/index.vue'
import useSserStore from '@/store/modules/user'
import tabbar from './tabbar/index.vue'
import { useRoute } from 'vue-router';
import  useLayOutSettingStore  from '@/store/modules/setting.ts'
import { ref,watch,nextTick } from 'vue'

let fresh = ref(false);

let $router=useRoute();
let useStore = useSserStore();
let SettingStore = useLayOutSettingStore();

watch(()=>SettingStore.refresh ,()=>{
    fresh.value=true;
    nextTick(()=>{
        fresh.value=false
    });
})

</script>


<style lang="scss">
.layout_container {
    width: 100%;
    height: 100vh;

    .layout_slider {
        width: $base-menu-width;
        height: 100vh;
        background-color: $base-menu-background;
        transition: all 0.3s;
        &.fold{
        width: 60px;
    }
    }

    .layout_tabbar {
        position: fixed;
        height: $base-tabbar-height;
        width: calc(100% - $base-menu-width);
        left: $base-menu-width;
        top: 0px;
        transition: all 0.3s;
        &.fold_tab{ // &应该是同级的意思
        left:60px;
        width: calc(100% - 60px);
    }
    }


    .layout_main {
        position: absolute;
        height: calc(100vh - $base-tabbar-height);
        width: calc(100% - $base-menu-width); // width= padding + 真实width
        left: $base-menu-width;
        top: $base-tabbar-height;
        background: white;
        padding: 20px;
        overflow: auto;
        transition: all 0.3s;
        &.fold_main{
        left:60px;
        width: calc(100% - 60px);
    }

    }


    .elmenu {
        border-right:none;
    }

    .el-menu-item:hover,
    .elmenu .el-sub-menu__title:hover {
        background-color: gray
    }

    .fade-enter-from {
        opacity: 0;
        scale: 0;
    }

    .fade-enter-active {
        transition: all 0.3s;
    }

    .fade-enter-to {
        opacity: 1;
        scale: 1;
    }
}
</style>