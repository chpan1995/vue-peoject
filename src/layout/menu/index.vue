<template>
    <template v-for="(item, index) in menuList" :key="item.path">
        <el-menu-item v-if="!item.children && !item.meta.hidden" :index="item.path" @click="goRouter">
            <el-icon>
                <component :is="item.meta.icon"></component>
            </el-icon>
            <template #title>
                <span>{{ item.meta.title }}</span>
            </template>
        </el-menu-item>
        <template v-if="item.children && !item.meta.hidden && item.children.length === 1">
            <el-menu-item :index="item.children[0].path" @click="goRouter">
                <el-icon>
                <component :is="item.children[0].meta.icon"></component>
            </el-icon>
                <template #title>
                    <span>{{ item.children[0].meta.title }}</span>
                </template>
            </el-menu-item>
        </template>

        <el-sub-menu :index="item.path" v-if="item.children && item.children.length > 1">
            <template #title>
                <el-icon>
                <component :is="item.meta.icon"></component>
                </el-icon>
                <span>{{ item.meta.title }}</span>
            </template>
            <Menu :menuList="item.children"></Menu>
        </el-sub-menu>
    </template>
</template>

<script setup lang="ts">
// import { constantRoute } from '@/router/router'
// import { onMounted, ref } from 'vue';
defineProps(['menuList']);
import {useRouter} from 'vue-router'
let $useRouter=useRouter();
// let mdata: any = ref({})
// onMounted(() => {
//     mdata.value = constantRoute
// });
// console.log(constantRoute)
const goRouter = (vc: any) => {
    $useRouter.push(vc.index);
}
</script>

<script lang="ts">

export default {
    name: 'Menu',
}

</script>

<style lang="scss"></style>