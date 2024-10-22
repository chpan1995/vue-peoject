<template>
  <div>
    <Category :scence="scence">

    </Category>
    <el-card style="margin-top: 20px;">
      <el-button type="primary" icon="Plus" v-show="!scence" :disabled="CategoryStore.c3Id ? false : true"
        @click="addPro"> 添加属性 </el-button>
      <div v-show="!scence">
        <el-table border style="width: 100%;margin-top: 20px;" :data="attrArr">
          <el-table-column label="序号" width="180" type="index" />
          <el-table-column label="属性名称" width="180">
            <template #default="scope, $index">
              {{ scope.row.attrName }}
            </template>
          </el-table-column>
          <el-table-column label="属性值名称">
            <template #default="scope">
              <div class="flex gap-2">
                <el-tag type="primary" style="margin-left: 5px;" v-for="(item, $index) in scope.row.attrValueList"
                  :id="item.id">
                  {{ item.valueName }}
                </el-tag>
              </div>
            </template>
          </el-table-column>

          <el-table-column label="操作">
            <template #="{ row, $index }">
              <el-button type="primary" icon="Edit" @click="editattr(row)"></el-button>
              <el-button type="danger" icon="Delete"></el-button>
            </template>

          </el-table-column>
        </el-table>
      </div>
      <div v-show="scence">
        <el-form style="margin-top: 20px;">
          <el-form-item label="属性名称">
            <el-input placeholder="请输入名称" style="width: 240px;" v-model="attrParams.attrName"></el-input>
          </el-form-item>
        </el-form>

        <el-button type="primary" @click="addProName" :disabled="attrParams.attrName ? false : true"> 添加属性值 </el-button>
        <!-- <el-button type="primary"> 取消 </el-button> -->

        <el-table border :data="attrParams.attrValueList" style="margin-top: 20px; margin-bottom: 20px;">
          <el-table-column label="序号" width="180" type="index" />
          <el-table-column label="属性值名称">
            <template #="{ row, $index }">
              <el-input v-if="row.flag" v-model="row.valueName" @blur="toLook(row, $index)"
                :ref="(vc: any) => inputArr[$index] = vc"></el-input>
              <div v-else @click="toEdit(row, $index)">{{ row.valueName }}</div>
            </template>

          </el-table-column>
          <el-table-column label="属性操作">
            <template #="{row,$index}">
              <el-button type="danger" icon="Delete" @click="deleteAttr($index)"></el-button>
            </template>
          </el-table-column>
        </el-table>

        <el-button type="primary" @click="save"> 保存 </el-button>
        <el-button type="primary" @click="cancel"> 取消 </el-button>

      </div>

    </el-card>
  </div>

</template>

<script setup lang="ts">
import useCategoryStore from '@/store/modules/category.ts'
import { reqAttr } from '@/api/product/attr'
import type { AttrResponseData, Attr, AttrList, AttrValue } from '@/api/product/attr/type'
import { watch, ref, reactive, nextTick, onBeforeMount } from 'vue';
import { ElMessage } from 'element-plus'
//存储已有的属性与属性值
let attrArr = ref<AttrList>();

let scence = ref<boolean>(false);

let CategoryStore = useCategoryStore();

let attrParams = reactive<Attr>({
  attrName: '', //新增的属性的名字
  attrValueList: [

  ],
  categoryId: '', //三级分类的ID
  categoryLevel: 3, //代表的是三级分类
})

//准备一个数组:将来存储对应的组件实例el-input
let inputArr = ref<any>([])

watch(() => { return CategoryStore.c3Id }, () => {
  if(CategoryStore.c3Id) getAttr();
})

const getAttr = async () => {
  attrArr.value = []
  const { c1Id, c2Id, c3Id } = CategoryStore;
  let obj: AttrResponseData = new Object;
  obj['data'] = [
    {
      id: 1,
      attrName: 'hello',
      categoryId: 1,
      categoryLevel: 3,
      attrValueList: [
        {
          id: 1,
          valueName: 'hello',
          attrId: 1,
          flag: true,
        },
        {
          id: 1,
          valueName: 'world',
          attrId: 1,
          flag: true,
        }
      ]
    },
    {
      id: 2,
      attrName: 'chpan',
      categoryId: 1,
      categoryLevel: 3,
      attrValueList: [
        {
          id: 1,
          valueName: 'fdd',
          attrId: 1,
          flag: true,
        },
        {
          id: 1,
          valueName: 'mfds',
          attrId: 1,
          flag: true,
        }
      ]
    }
  ]
  try {
    let result: AttrResponseData = await reqAttr(c1Id, c2Id, c3Id);
    if (result.code == 200) {
      attrArr.value = result.data;
    }
  } catch (error) {
    attrArr.value = obj.data;
  }

}

const addPro = () => {
  Object.assign(attrParams, {
    attrName: "",//新增的属性的名字
    attrValueList: [//新增的属性值数组
    ],
    categoryId: CategoryStore.c3Id,//三级分类的ID
    categoryLevel: 3,//代表的是三级分类
  });
  scence.value = !scence.value
}

const addProName = () => {
  attrParams.attrValueList.push({
    valueName: '',
    flag: true, //控制每一个属性值编辑模式与切换模式的切换
  });
  nextTick(() => {
    inputArr.value[attrParams.attrValueList.length - 1].focus();
  });
}

const save = () => {
  attrArr.value?.push(attrParams);
  scence.value = !scence.value
}

const cancel = () => {
  scence.value = !scence.value;
}

const toLook = (row: AttrValue, $index: number) => {
  row.flag = false;
  //非法情况判断1
  if (row.valueName.trim() == '') {
    //删除调用对应属性值为空的元素
    attrParams.attrValueList.splice($index, 1)
    //提示信息
    ElMessage({
      type: 'error',
      message: '属性值不能为空',
    })
    return
  }
  //非法情况2
  let repeat = attrParams.attrValueList.find((item) => {
    //切记把当前失却焦点属性值对象从当前数组扣除判断
    if (item != row) {
      return item.valueName === row.valueName
    }
  })


  if (repeat) {
    //将重复的属性值从数组当中干掉
    attrParams.attrValueList.splice($index, 1)
    //提示信息
    ElMessage({
      type: 'error',
      message: '属性值不能重复',
    })
    return
  }
  //相应的属性值对象flag:变为false,展示div
  row.flag = false
}

//属性值div点击事件
const toEdit = (row: AttrValue, $index: number) => {
  //相应的属性值对象flag:变为true,展示input
  row.flag = true
  nextTick(() => {
    inputArr.value[$index].focus();
  })
}

const editattr = (row: any) => {
  scence.value = !scence.value;

  // attrParams.value=row;
  //将已有的属性对象赋值给attrParams对象即为
  //ES6->Object.assign进行对象的合并
  Object.assign(attrParams, JSON.parse(JSON.stringify(row)));
  console.log(attrParams.value);
}

const deleteAttr = ($index:number)=>{
  attrParams.attrValueList.splice($index,1);
}

onBeforeMount(() => {
  // scence.value=false;
  CategoryStore.$reset();
})

</script>

<style lang="scss"></style>