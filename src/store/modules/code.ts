import { defineStore } from 'pinia'

const useCodeStore = defineStore('code', {
  state: () => ({
    // 用户输入的验证码
    code: '',
    // 正确的验证码
    correctCode: '',
  }),
  actions: {
    generateCode() {
      const bit = 4
      const pool = '1234567890'
      let code = ''
      for (let i = 0; i < bit; i++) {
        code += pool[Math.floor(Math.random() * pool.length)]
      }
      this.correctCode = code
    },
    checkCode() {
      return this.code === this.correctCode
    },
  },
})

export default useCodeStore
