import { defineStore } from 'pinia'

const useLayOutSettingStore =defineStore('settingStrore',{
    state: () => {
        return {
            fold:false,
            refresh:false,
        }
    },
})

export default useLayOutSettingStore;