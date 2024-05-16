// 商品属性相关API
import request from '@/utils/request'
import { categoryType, attrType } from '@/api/shop/attr/type'

enum API {
  // 获取一级分类数据
  GETCATEGORY1_URL = '/admin/product/getCategory1',
  // 获取二级分类数据
  GETCATEGORY2_URL = '/admin/product/getCategory2/',
  // 获取三级分类数据
  GETCATEGORY3_URL = '/admin/product/getCategory3/',
  // 获取分类下的属性值
  GETATTR_URL = '/admin/product/attrInfoList',
  // 新增属性值
  ADDORUPDATEATTR_URL = '/admin/product/saveAttrInfo',
  // 删除属性值
  DELETEATTR_URL = '/admin/product/deleteAttr/',
}
// 获取一级分类数据
export const reqCategory1 = () =>
  request<any, categoryType>({ url: API.GETCATEGORY1_URL, method: 'GET' })
// 获取二级分类数据
export const reqCategory2 = (category1Id) =>
  request<any, categoryType>({
    url: API.GETCATEGORY2_URL + category1Id,
    method: 'GET',
  })
// 获取三级分类数据
export const reqCategory3 = (category2Id) =>
  request<any, categoryType>({
    url: API.GETCATEGORY3_URL + category2Id,
    method: 'GET',
  })
// 获取分类下的属性值
export const reqGetAttr = (category1Id, category2Id, category3Id) =>
  request<any, attrType>({
    url: API.GETATTR_URL + `/${category1Id}/${category2Id}/${category3Id}`,
    method: 'GET',
  })
// 新增/修改属性值
export const reqAddOrUpDateAttr = (data) =>
  request<any, any>({ url: API.ADDORUPDATEATTR_URL, data, method: 'POST' })
// 删除属性值
export const reqDeleteAttr = (data) =>
  request<number, any>({ url: API.DELETEATTR_URL + data, method: 'DELETE' })
