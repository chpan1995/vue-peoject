import { defineStore } from 'pinia'
import { reqlogin } from '@/api/user'
import type {loginForm} from '@/api/user'
import type { loginResponseData } from '@/api/user/type'
import type { UserState } from '@/store/modules/type'
// 创建用户小仓库
const useSserStore = defineStore('User',
    {
        state: ():UserState => {
            return {
                token: localStorage.getItem('TOKEN')
            }
        },
        actions: {
            async userLogin(data: loginForm) {
                let result:loginResponseData = await reqlogin(data);
                if (result.code == 200) {
                    return 'ok'
                } else {
                    return Promise.reject(new Error(result.data.message));
                }
            }
        },
        getters: {

        }
    }
)

export default useSserStore;