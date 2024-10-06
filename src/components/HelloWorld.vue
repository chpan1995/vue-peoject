

<template>
  <h1>我是vue</h1>
  <el-button type="primary" size="default" :icon="Edit">Primary</el-button>
  <el-button type="success" size="small"> Success </el-button>

  <div class="example-pagination-block">
    <div class="example-demonstration">When you have few pages</div>
    <el-pagination layout="prev, pager, next" :total="50" />
  </div>
  <div class="example-pagination-block">
    <div class="example-demonstration">When you have more than 7 pages</div>
    <el-pagination layout="prev, pager, next" :total="1000" />
  </div>
  <Pagination></Pagination>
  <Svgicon name="home"></Svgicon>
</template>

<script setup lang="ts">
import { Edit } from '@element-plus/icons-vue';
import { onMounted } from 'vue';
import { reqlogin } from '@/api/user'
onMounted(()=>{
  console.log(reqlogin({username:'admin',password:'111111'}));
});
</script>

<style scoped lang="scss">
h1{
  color: $color;
}

</style>