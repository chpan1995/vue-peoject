<template>
    <div>
        <el-button type="primary" style="margin-bottom: 20px;" @click="addProduct">添加商品</el-button>
    <el-card style="max-width: 100%">
        <el-table :data="tabledata" style="width: 100%" border>
            <el-table-column label="序号" width="180" align="center" type="index">
            </el-table-column>
            <el-table-column label="品牌LOGO" align="center">
                <template #default="scope">
                    <img :src="scope.row.logoUrl" width="100px" height="100px">
                </template>
            </el-table-column>
            <el-table-column label="品牌名称" align="center">
                <template #default="scope">
                    <pre> {{ scope.row.tmName }} </pre>
                </template>
            </el-table-column>
            <el-table-column label="品牌操作" align="center">
                <template #default="scope">
                    <el-button type="primary" icon="Edit" @click="updateProduct(scope.row)"> 修改 </el-button>
                    <el-button type="primary" icon="Delete" @click="deleteProduct(scope.row)"> 删除 </el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-pagination v-model:current-page="pageNo" v-model:page-size="limit" :page-sizes="[3, 5, 7, 9]"
            layout="sizes, prev, pager, next,->,jumper,total," :total="total" @size-change="currentSizePageChange"
            @current-change="currentPageChange" style="margin-top: 20px;" />
    </el-card>

    <el-dialog v-model="dialogVisible" title="添加品牌" style="width: 600px;">
        <el-form :model="trademarkParams" :rules="rules" ref="ruleFormRef">
            <!-- prop 必须是 trademarkParams的字段-->
            <el-form-item label="品牌名称" prop="tmName">
                <el-input v-model="trademarkParams.tmName"></el-input>
            </el-form-item>
            <el-form-item label="品牌LOGO" prop="logoUrl">
                <el-upload class="avatar-uploader" action="/api/admin/product/fileUpload" :show-file-list="false"
                    :on-success="handleAvatarSuccess" :before-upload="fileinfo">
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
    </div>
   
</template>

<script setup lang="ts">
//引入组合式API函数
import { ref, onMounted, reactive, nextTick } from 'vue'
import { reqHasTrademark, reqAddorUpdateTradeMark,reqDeleteTrademark } from '@/api/product/trademark'
import type { Records, TradeMark } from '@/api/product/trademark/type'
import { ElMessage, FormRules } from 'element-plus';
// import {Edit,Delete} from '@element-plus/icons-vue'

const pageNo = ref<number>(1)
//每一页展示的数据
const limit = ref<number>(3)

let total = ref<number>(0)

let tabledata = ref<Records>()

let dialogVisible = ref<boolean>(false);

const ruleFormRef = ref()

const trademarkParams = reactive<TradeMark>({
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

const sure_ = async () => {
    await ruleFormRef.value.validate();
    dialogVisible.value = false;

    let result = await reqAddorUpdateTradeMark(trademarkParams);
    if (result.code == 200) {
        ElMessage({
            type: "success",
            message: trademarkParams.id ? '修改品牌成功' : '添加品牌成功'
        })
        if (trademarkParams.id) {
            let result = await reqHasTrademark(pageNo.value, limit.value);
            if (result.code == 200) {
                total.value = result.data.total;
                tabledata.value = result.data.records;
            }
        }
    } else {
        ElMessage({
            type: "error",
            message: result.message
        })
    }

}

const addProduct = () => {

    trademarkParams.logoUrl = '';
    trademarkParams.tmName = '';
    trademarkParams.id = 0;
    dialogVisible.value = true;

    nextTick(() => {
        ruleFormRef.value.clearValidate('tmName');
        ruleFormRef.value.clearValidate('logoUrl');
    })
}

const handleAvatarSuccess: UploadProps['onSuccess'] = (
    response,
    uploadFile
) => {
    trademarkParams.logoUrl = URL.createObjectURL(uploadFile.raw!)
}

const updateProduct = async (raw: any) => {
    // trademarkParams.id=raw.id;
    // trademarkParams.tmName=raw.tmName;
    // trademarkParams.logoUrl=raw.logoUrl;
    Object.assign(trademarkParams, raw)
    dialogVisible.value = true;

    // await reqAddorUpdateTradeMark(trademarkParams);
}

// const validateProductNate = (rule: any, value: any, callBack: any) => {
//     console.log(value);
//     if (value.length > 2) {
//         callBack(new Error('输入大于两个长度'));
//     } else {
//         callBack();
//     }
// }


//品牌自定义校验规则方法
const validatorTmName = (rule: any, value: any, callBack: any) => {
    //是当表单元素触发blur时候,会触发此方法
    //自定义校验规则
    if (value.trim().length >= 2) {
        callBack()
    } else {
        //校验未通过返回的错误的提示信息
        callBack(new Error('品牌名称位数大于等于两位'))
    }
}

const validateProductlogUrl = (rule: any, value: any, callBack: any) => {
    console.log(111)
    console.log(value)
    //如果图片上传
    if (value) {
        callBack()
    } else {
        callBack(new Error('LOGO图片务必上传'))
    }
}

const fileinfo = (rawFile: any) => {
    console.log(rawFile)
    if (rawFile.type == 'image/png' || rawFile.type == 'image/jpg' || rawFile.type == 'image/gif' && (rawFile.size / 1024 / 1024 < 4)) {
        return 'ok';
    } else {
        ElMessage({
            type: 'error',
            message: "上传文件格式务必PNG|JPG|GIF,文件大小小于4M"
        })
        return Promise.reject('文件上传有误');
    }
}

//表单校验规则对象
const rules = {
    tmName: [
        //required:这个字段务必校验,表单项前面出来五角星
        //trigger:代表触发校验规则时机[blur、change]
        { required: true, trigger: 'blur', validator: validatorTmName },
    ],
    logoUrl: [{ required: true, validator: validateProductlogUrl }],
}


const deleteProduct = async(raw:any)=>{
    let result = await reqDeleteTrademark(raw.id);
    if(result.code==200){
        let result = await reqHasTrademark(pageNo.value, limit.value);
            if (result.code == 200) {
                total.value = result.data.total;
                tabledata.value = result.data.records;
            }
    }else {
        ElMessage({
            type: 'error',
            message: "删除文件失败"
        })
    }
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

.avatar {
    width: 178px;
    height: 178px;
}
</style>