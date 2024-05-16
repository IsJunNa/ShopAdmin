import pinia from '@/store'
import useUserStore from '@/store/modules/user'
const userStore = useUserStore(pinia)
export const isHasButton = (app) => {
  app.directive('btn', {
    mounted(el, options) {
      if (!userStore.buttons.includes(options.value))
        el.parentNode.removeChild(el)
    },
  })
}
