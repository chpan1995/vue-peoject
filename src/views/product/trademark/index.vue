<template>
    <el-card style="max-width: 100%">
        <el-table :data="tabledata" style="width: 100%" border>
            <el-table-column label="序号" width="180" align="center" type="index">
            </el-table-column>
            <el-table-column label="品牌名称" align="center">
                <template #default="scope">
                    <img :src="scope.row.logoUrl" width="100px" height="100px">
                </template>
            </el-table-column>
            <el-table-column label="品牌LOGO" align="center">
                <template #default="scope">
                    <pre> {{scope.row.tmName}} </pre>
                </template>
            </el-table-column>
            <el-table-column label="品牌操作" align="center">
                <template #default="scope">
                    <el-button type="primary" icon="Edit"></el-button>
                    <el-button type="primary" icon="Delete"></el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-pagination v-model:current-page="pageNo" v-model:page-size="limit" :page-sizes="[3, 5, 7, 9]"
            layout="sizes, prev, pager, next,->,jumper,total," :total="total" @size-change="currentSizePageChange" @current-change="currentPageChange"
            style="margin-top: 20px;" />
    </el-card>
</template>

<script setup lang="ts">
//引入组合式API函数
import { ref, onMounted, reactive } from 'vue'
import { reqHasTrademark } from '@/api/product/trademark'
import type { Records } from '@/api/product/trademark/type'
// import {Edit,Delete} from '@element-plus/icons-vue'

const pageNo = ref<number>(1)
//每一页展示的数据
const limit = ref<number>(3)

let total = ref<number>(0)

let tabledata = ref<Records>()

onMounted(async () => {
    let result = await reqHasTrademark(pageNo.value, limit.value);
    if (result.code == 200) {
        total.value = result.data.total;
        tabledata.value = result.data.records;
    }
})

const currentPageChange = async(value:number)=>{
     let result = await reqHasTrademark(value, limit.value);
     if (result.code == 200) {
        total.value = result.data.total;
        tabledata.value = result.data.records;
    }
}

const currentSizePageChange = async(value:number)=>{
    let result = await reqHasTrademark(pageNo.value, value);
    if (result.code == 200) {
        total.value = result.data.total;
        tabledata.value = result.data.records;
    }
} 

</script>

<style lang="scss"></style>