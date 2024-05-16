/* 商品属性相关的数据类型 */

// 所有接口返回数据的数据类型(用于继承)
export interface resType {
  code: number
  message: string
  ok: boolean
}

// categoryType中的data数据类型
export interface dataInCategoryType {
  id: number | string
  name: string
  category1Id?: number
  category2Id?: number
}

// 三级分类返回的数据类型
export interface categoryType extends resType {
  data: dataInCategoryType[]
}

// attrValueList中的数据类型
export interface attrValueListType {
  attrId?: number
  createTime?: any
  id?: number
  updateTime?: any
  valueName: string
}

// 分类下的属性值列表中的data
export interface dataInattrType {
  attrName: string
  attrValueList: attrValueListType[]
  categoryId: number
  categoryLevel: number
  createTime: any
  id: number
  updateTime: number
}

// 分类下的属性值列表
export interface attrType extends resType {
  data: [dataInattrType: object]
}
