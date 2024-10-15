<template>
    <div>
        <h1> 我是一级路由home </h1>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import useSserStore  from '@/store/modules/user.ts'

let useStore = useSserStore();

onMounted(async()=>{
     await useStore.userInfo();
});

</script>

<style></style>