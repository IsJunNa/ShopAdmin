import { dataInCategoryType, dataInattrType } from '@/api/shop/attr/type'
import { getSpuListRes } from '@/api/shop/spu/type'
// attr小仓库的数据类型
export interface attrStoreType {
  categoryId1: string | number
  categoryId2: string | number
  categoryId3: string | number
  category1Arr: dataInCategoryType[]
  category2Arr: dataInCategoryType[]
  category3Arr: dataInCategoryType[]
  AttrList: dataInattrType[]
  spuList: getSpuListRes[]
}
