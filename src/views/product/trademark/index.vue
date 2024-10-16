<template>
    <el-button type="primary" style="margin-bottom: 20px;" @click="addProduct">添加商品</el-button>
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
                    <pre> {{ scope.row.tmName }} </pre>
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
            layout="sizes, prev, pager, next,->,jumper,total," :total="total" @size-change="currentSizePageChange"
            @current-change="currentPageChange" style="margin-top: 20px;" />
    </el-card>

    <el-dialog v-model="dialogVisible" title="添加品牌" style="width: 600px;">
        <el-form>
            <el-form-item label="品牌名称">
                <el-input v-model="trademarkParams.tmName"></el-input>
            </el-form-item>
            <el-form-item label="品牌LOGO">
                <el-upload class="avatar-uploader" action="/api/admin/product/fileUpload"
                    :show-file-list="false" :on-success="handleAvatarSuccess">
                    <img v-if="trademarkParams.logoUrl" :src="trademarkParams.logoUrl" class="avatar" />
                    <el-icon v-else class="avatar-uploader-icon">
                        <Plus />
                    </el-icon>
                </el-upload>
            </el-form-item>
        </el-form>
        <template #footer>
                <el-button @click="cancel">取消</el-button>
                <el-button type="primary" @click="sure_">确定</el-button>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
//引入组合式API函数
import { ref, onMounted, reactive } from 'vue'
import { reqHasTrademark , reqAddorUpdateTradeMark } from '@/api/product/trademark'
import type { Records,TradeMark } from '@/api/product/trademark/type'
import { ElMessage } from 'element-plus';
// import {Edit,Delete} from '@element-plus/icons-vue'

const pageNo = ref<number>(1)
//每一页展示的数据
const limit = ref<number>(3)

let total = ref<number>(0)

let tabledata = ref<Records>()

let dialogVisible = ref<boolean>(false);

let trademarkParams = reactive<TradeMark>({
    tmName: '',
    logoUrl: ''
})

onMounted(async () => {
    let result = await reqHasTrademark(pageNo.value, limit.value);
    if (result.code == 200) {
        total.value = result.data.total;
        tabledata.value = result.data.records;
    }
})

const currentPageChange = async (value: number) => {
    let result = await reqHasTrademark(value, limit.value);
    if (result.code == 200) {
        total.value = result.data.total;
        tabledata.value = result.data.records;
    }
}

const currentSizePageChange = async (value: number) => {
    let result = await reqHasTrademark(pageNo.value, value);
    if (result.code == 200) {
        total.value = result.data.total;
        tabledata.value = result.data.records;
    }
}

const cancel = () => {
    dialogVisible.value = false;
}

const sure_ = async() => {
    dialogVisible.value = false;
    await reqAddorUpdateTradeMark(trademarkParams);
    ElMessage ({
        type:"success",
        message:'添加品牌成功'
    })
}

const addProduct = () => {
    trademarkParams.logoUrl='';
    trademarkParams.tmName='';
    trademarkParams.id=0;
    dialogVisible.value = true;
}

const handleAvatarSuccess: UploadProps['onSuccess'] = (
    response,
    uploadFile
) => {
    trademarkParams.logoUrl = URL.createObjectURL(uploadFile.raw!)
}

</script>

<style lang="scss">
.avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
  }
  
  .avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
  }
  
  .el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
  }
</style>