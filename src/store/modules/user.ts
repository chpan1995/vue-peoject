import { defineStore } from 'pinia'
import { reqlogin,reqUserinfo,reqUserlogout } from '@/api/user'
import type {loginForm} from '@/api/user'
import type { loginResponseData } from '@/api/user/type'
import type { UserState } from '@/store/modules/type'
import { constantRoute } from '@/router/router'
// 创建用户小仓库
const useSserStore = defineStore('User',
    {
        state: ():UserState => {
            return {
                token: localStorage.getItem('TOKEN'),
                username:'',
                avatar:'',
                menuRoutes: constantRoute, //仓库存储生成菜单需要数组（路由）
            }
        },
        actions: {
            async userLogin(data: loginForm) {
                
                let result:any = await reqlogin(data);
                if (result.code == 200) {
                    this.token=result.data;
                    localStorage.setItem('TOKEN',result.data);
                    return 'ok'
                } else {
                    return Promise.reject(new Error(result.message));
                }
            },
            async userInfo(){
                let result = await reqUserinfo();
                if (result.code == 200) { 
                    this.username=result.data.name;
                    this.avatar=result.data.avatar;
                }
            },
            async userLogout(){
                let result:any = await reqUserlogout();
                console.log(result);
                if(result.code == 200) {
                    this.token='';
                    this.username='';
                    this.avatar='';
                    localStorage.setItem('TOKEN','');
                    return 'ok'
                }else {
                    return Promise.reject(new Error(result.message));
                }
            }
        },
        getters: {

        }
    }
)

export default useSserStore;