// 根据屏幕宽度大小自动收缩左侧导航栏
import setting from '@/setting'
import useSettingStore from '@/store/modules/setting'
const settingStore = useSettingStore()

const changeShow = () => {
  if (window.innerWidth > 1300) {
    settingStore.fold = false
    setting.logoShow = true
    setting.titleShow = true
  } else if (window.innerWidth > 1000) {
    settingStore.fold = false
    setting.logoShow = false
    setting.titleShow = true
  } else if (window.innerWidth > 700) {
    settingStore.fold = false
    setting.logoShow = true
    setting.titleShow = false
  } else {
    settingStore.fold = true
    setting.logoShow = true
    setting.titleShow = false
  }
}

if (setting.adapt) {
  changeShow()
  window.addEventListener('resize', changeShow)
}
