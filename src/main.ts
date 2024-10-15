import { createApp } from 'vue';
import App from './App.vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css'
import { zhCn } from 'element-plus/es/locale/index.mjs';
import '@/styles/index.scss'
import router from '@/router'
import store from './store';
import '../permission.ts'

const app = createApp(App);
app.use(ElementPlus,{
  locale:zhCn
});
// 入口文件导入插件
import 'virtual:svg-icons-register'
import gloablComponent from './components'

app.use(gloablComponent)
app.use(router);
app.use(store);
app.mount('#app');

// const test = () => {
//   console.log('123');
//   console.log(import.meta.env.VITE_APP_TITLE)
// };

// test();
type Fish = { swim: () => void };
type Bird = { fly: () => void };
type Human = { swim?: () => void; fly?: () => void };

function move(animal: Fish | Bird | Human) {
  if ("swim" in animal) {
      animal.swim!();
//  ^?
  } else {
    animal;
//  ^?
  }
}
let fish:Fish = {
  swim:()=>{
  }
}
move(fish);