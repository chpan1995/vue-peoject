<template>
  <div>
    <Category></Category>
    <el-card>
      <div v-show="scene === 0 ? true : false">
        <el-button @click="addSpu" type="primary" icon="Plus">添加SPU</el-button>
        <el-table border style="margin-top: 20px;" :data="records">
          <el-table-column label="序号" type="index"></el-table-column>
          <el-table-column label="SPU名称" prop="spuName">

          </el-table-column>
          <el-table-column label="SPU描述" prop="description"></el-table-column>
          <el-table-column label="SPU操作">
            <template #="{ row, $index }">
              <el-button type="primary" size="small" icon="Plus" title="添加SKU"></el-button>
              <el-button type="primary" size="small" icon="Edit" title="修改SPU" @click="updateSpu(row)"></el-button>
              <el-button type="primary" size="small" icon="View" title="查看SKU列表" @click="lookSku(row)"></el-button>
              <el-popconfirm :title="`你确定删除${row.spuName}?`" width="200px" @confirm="deleteSpu(row)">
                <template #reference>
                  <el-button type="primary" size="small" icon="Delete" title="删除SPU"></el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination style="margin-top: 20px;" v-model:current-page="pageNo" v-model:page-size="pageSize"
          :page-sizes="[3, 6, 9, 12]" layout="prev, pager, next, jumper,->,sizes, total" :total="total"
          @size-change="changeSize" @current-change="getHasSpu" />
      </div>

      <div v-show="scene === 1 ? true : false">
        <spuForm ref="spu" @changeScene="changeScene"></spuForm>
      </div>

      <div v-show="scene === 2 ? true : false">
        <spuForm ref="sku" @changeScene="changeScene"></spuForm>
      </div>
    </el-card>
    <el-dialog v-model="dialogVisible" title="sku列表" width="900" :before-close="handleClose">
      <el-table border :data="skuArr">
        <el-table-column label="sku名字" prop="skuName"></el-table-column>
        <el-table-column label="sku价格" prop="price"></el-table-column>
        <el-table-column label="sku重量" prop="weight"></el-table-column>
        <el-table-column label="sku图片">
          <template #="{ row, $index }">
            <img :src="row.skuDefaultImg" style="width: 100px;height: 100px;">
          </template>
        </el-table-column>
      </el-table>

    </el-dialog>
  </div>

</template>

<script setup lang="ts">
import { onBeforeMount, ref, watch } from 'vue'
import useCategoryStore from '@/store/modules/category';
import spuForm from './spuForm.vue';

let pageNo = ref<number>(1);
let pageSize = ref<number>(3);
import type { HasSpuResponseData, Records, SkuInfoData, SkuData ,SpuData} from '@/api/product/spu/type'
import { reqHasSpu, reqSkuList, reqRemoveSpu } from '@/api/product/spu';
import { ElMessage } from 'element-plus'
//存储已有的SPU的数据
let records = ref<Records>([]);
//存储已有SPU总个数
let total = ref<number>(0);

let scene = ref<number>(0);

let spu = ref<any>();
let sku = ref<any>();
//存储全部的SKU数据
let skuArr = ref<SkuData[]>([]);

let dialogVisible = ref(false)

let categoryStore = useCategoryStore();

//此方法执行:可以获取某一个三级分类下全部的已有的SPU
const getHasSpu = async (pager = 1) => {
  //修改当前页码
  pageNo.value = pager
  let result: HasSpuResponseData = await reqHasSpu(
    pageNo.value,
    pageSize.value,
    categoryStore.c3Id,
  )
  if (result.code == 200) {
    records.value = result.data.records
    total.value = result.data.total
  }
}
//分页器下拉菜单发生变化的时候触发
const changeSize = () => {
  getHasSpu()
}

watch(() => categoryStore.c3Id, () => {
  if (!categoryStore.c3Id) return
  getHasSpu()
})

const updateSpu = (row: number) => {
  //切换为场景1:添加与修改已有SPU结构->SpuForm
  scene.value = 1;
  //调用子组件实例方法获取完整已有的SPU的数据
  spu.value.initHasSpuData(row);
}
//子组件SpuForm绑定自定义事件:目前是让子组件通知父组件切换场景为0
const changeScene = (obj: any) => {
  //子组件Spuform点击取消变为场景0:展示已有的SPU
  scene.value = obj.flag;
  if (obj.params == 'update') {
    //更新留在当前页
    getHasSpu(pageNo.value);
  } else {
    //添加留在第一页
    getHasSpu();
  }
}

//添加新的SPU按钮的回调
const addSpu = () => {
  //切换为场景1:添加与修改已有SPU结构->SpuForm
  scene.value = 2;
  //点击添加SPU按钮,调用子组件的方法初始化数据
  sku.value.initAddSpu(categoryStore.c3Id);
}

const lookSku = async (row: any) => {

  let result: SkuInfoData = await reqSkuList((row.id as number));
  if (result.code == 200) {
    skuArr.value = result.data;
    //对话框显示出来
    dialogVisible.value = true;
  }
}

const handleClose = () => {
  dialogVisible.value = false;
}

//删除已有的SPU按钮的回调
const deleteSpu = async (row: SpuData) => {
  let result: any = await reqRemoveSpu((row.id as number));
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: '删除成功'
    });
    //获取剩余SPU数据
    getHasSpu(records.value.length > 1 ? pageNo.value : pageNo.value - 1)
  } else {
    ElMessage({
      type: 'error',
      message: '删除失败'
    })
  }
}
onBeforeMount(()=>{
  categoryStore.$reset();
})
</script>

<style lang="scss"></style>