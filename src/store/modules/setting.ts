import { de } from 'element-plus/es/locale/index.js'
import { defineStore } from 'pinia'

const useLayOutSettingStore =defineStore('settingStrore',{
    state: () => {
        return {
            fold:false
        }
    },
})

export default useLayOutSettingStore;