import { defineStore } from 'pinia'
import {
  reqGetAttr,
  reqCategory1,
  reqCategory2,
  reqCategory3,
  reqAddOrUpDateAttr,
  reqDeleteAttr,
} from '@/api/shop/attr/index'
import { categoryType, attrType } from '@/api/shop/attr/type'
import { attrStoreType } from '@/store/type/attr'
import { reqGetSpuList } from '@/api/shop/spu/index'

const useAttrStore = defineStore('attr', {
  state: (): attrStoreType => {
    return {
      // 一级分类id
      categoryId1: '',
      // 二级分类id
      categoryId2: '',
      // 三级分类id
      categoryId3: '',
      // 一级分类数据
      category1Arr: [],
      // 二级分类数据
      category2Arr: [],
      // 三级分类数据
      category3Arr: [],
      // 属性列表数据
      AttrList: [],
      // spu列表数据
      spuList: [],
    }
  },
  actions: {
    // 获取一级分类数据
    async getCategory1() {
      const res: categoryType = await reqCategory1()
      if (res.code === 200) this.category1Arr = res.data
    },
    // 获取二级分类数据
    async getCategory2() {
      const res: categoryType = await reqCategory2(this.categoryId1)
      if (res.code === 200) this.category2Arr = res.data
    },
    // 获取三级分类数据
    async getCategory3() {
      const res: categoryType = await reqCategory3(this.categoryId2)
      if (res.code === 200) this.category3Arr = res.data
    },
    // 获取属性列表
    async getAttr() {
      const res: attrType = await reqGetAttr(
        this.categoryId1,
        this.categoryId2,
        this.categoryId3,
      )
      if (res.code === 200) this.AttrList = res.data
    },
    // 添加属性值
    async addOrUpdateAttr(data) {
      const res = await reqAddOrUpDateAttr(data)
      return res.code
    },
    // 删除属性值
    async deleteAttr(data) {
      const res = await reqDeleteAttr(data)
      return res.code
    },
    // 获取SPU列表
    async getSpuList(page, limit, category3Id) {
      const res = await reqGetSpuList(page, limit, category3Id)
      if (res.code === 200) {
        this.spuList = res.data.records
        return res.data
      }
    },
  },
  getters: {},
})

export default useAttrStore
