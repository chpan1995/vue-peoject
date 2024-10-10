<template>
    <div class="login_container">
        <el-row>
            <el-col :span="12" :xs="0">
            </el-col>
            <el-col :span="12" :xs="24">
                <el-form class="login_form" :model="loginForm" :rules="rules" ref="loginForms">
                    <h1>hello</h1>
                    <h2>欢迎来到硅谷甄选</h2>
                    <el-form-item prop="username">
                        <!-- 绑定了v-model才能输入 -->
                        <el-input :prefix-icon="User" v-model="loginForm.username" ></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input type="password" :prefix-icon="Lock" show-password
                            v-model="loginForm.password"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button :loading="loading" class="login_btn" type="primary" size="default" @click="login">
                            登录
                        </el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>

    </div>
</template>

<script setup lang="ts">
import { User, Lock } from '@element-plus/icons-vue';
import { reactive,ref } from 'vue';
import  useSserStore  from '@/store/modules/user'
import {useRouter} from 'vue-router'
import { ElNotification,FormRules } from 'element-plus';
import { getTime } from '@/utils/time'

let $useRouter=useRouter();
let loading=ref(false);
let useStore = useSserStore();

let loginForm = reactive({
    username: 'Admin',
    password: '111111'
});

const validatePass = (rule: any, value: any, callback: any) => {
    // if (/^d{5,10}$/.test(value)) {
    console.log(value);
    if (typeof value === 'string' && value.length >= 5) {
    callback()
  } else {
    callback(new Error('账号长度至少5位'))
  }
}

const rules = reactive<FormRules>({
    username:[
      { validator: validatePass, trigger: 'change' }
    ],
    password: [{}]
})

let loginForms=ref();

async function login(){
    await loginForms.value.validate();
    loading.value=true
    try {
       await useStore.userLogin(loginForm);
       $useRouter.push('/');
       ElNotification({
            type:'success',
            message:'登录成功',
            title:`HI,${getTime()}好`
        })
    } catch (error:any) {
        ElNotification({
            type:'error',
            message:error.message
        })
    }
    loading.value=false;
}

</script>

<style lang="scss" scoped>
.login_container {
    width: 100%;
    height: 100vh;
    background: url('@/assets/images/background.jpg') no-repeat;
    background-size: cover;

    h1 {
        font-size: 40px;
        color: white;
    }

    h2 {
        font-size: 20px;
        color: white;
        margin: 20px 0px;
    }

    .login_form {
        position: relative;
        width: 60%;
        top: 30vh;
        background-size: cover;
        background: url('@/assets/images/login_form.png') no-repeat;
        padding: 40px;


        .login_btn {
            width: 100%;
        }
    }


}
</style>