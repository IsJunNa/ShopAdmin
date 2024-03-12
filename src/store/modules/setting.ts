import { defineStore } from 'pinia'

const useSettingStore = defineStore('setting', {
  state: () => {
    return {
      // 是否折叠
      fold: false,
      // 是否刷新
      refresh: false,
    }
  },
  actions: {
    // 改变折叠状态
    changeFold() {
      this.fold = !this.fold
    },
    // 改变刷新状态
    changeRefresh() {
      this.refresh = !this.refresh
    },
  },
  getters: {},
})

export default useSettingStore
