import request from '@/utils/request'
import {
  getSpuListRes,
  allBrand,
  spuImageList,
  getSaleAttrList,
  getBaseSaleAttrListType,
} from './type.ts'

enum API {
  // 获取spu列表
  GETSPULIST_URL = '/admin/product/',
  // 获取所有品牌数据
  GETALLBRAND_URL = '/admin/product/baseTrademark/getTrademarkList',
  // 获取spu详情下的图片列表
  GETSPUIMAHGELIST_URL = '/admin/product/spuImageList/',
  // 获取spu详情下的销售属性列表
  GETSPUSALEATTRLIST_URL = '/admin/product/spuSaleAttrList/',
  // 获取全部的品牌属性键
  GETBASESALEATTRLIST_URL = '/admin/product/baseSaleAttrList',
  // 新增SPU
  ADDSPUINFO_URL = '/admin/product/saveSpuInfo',
  // 修改SPU
  EDITSPUINFO_URL = '/admin/product/updateSpuInfo',
  // 新增SKU
  ADDSKU_URL = '/admin/product/saveSkuInfo',
  // 获取SKU列表
  GETSKUINFO_URL = '/admin/product/findBySpuId/',
  // 删除SPU
  DELETESPU_URL = '/admin/product/deleteSpu/',
}

// 获取spu列表
export const reqGetSpuList = (
  page: number,
  limit: number,
  category3Id: number | string,
) =>
  request<any, getSpuListRes>({
    url: API.GETSPULIST_URL + `/${page}/${limit}?category3Id=${category3Id}`,
    method: 'GET',
  })
// 获取所有品牌数据
export const reqGetAllBrand = () =>
  request<any, allBrand>({ url: API.GETALLBRAND_URL, method: 'GET' })
// 获取spu详情下的图片列表
export const reqGetImageList = (spuId) =>
  request<any, spuImageList>({
    url: API.GETSPUIMAHGELIST_URL + spuId,
    method: 'GET',
  })
// 获取spu详情下的销售属性列表
export const reqGetSaleAttrList = (spuId) =>
  request<any, getSaleAttrList>({
    url: API.GETSPUSALEATTRLIST_URL + spuId,
    method: 'GET',
  })
// 获取全部的品牌属性键
export const reqGetBaseSaleAttrList = () =>
  request<any, getBaseSaleAttrListType>({
    url: API.GETBASESALEATTRLIST_URL,
    method: 'GET',
  })
// 新增SPU
export const reqAddSpuInfo = (data) =>
  request<any, any>({ url: API.ADDSPUINFO_URL, method: 'POST', data })
// 修改SPU
export const reqEditSpuInfo = (data) =>
  request<any, any>({ url: API.EDITSPUINFO_URL, method: 'POST', data })
// 新增SKU
export const reqAddSku = (data) =>
  request<any, any>({ url: API.ADDSKU_URL, method: 'POST', data })
// 获取SKU列表
export const reqGetSkuInfo = (spuId) =>
  request<any, any>({ url: API.GETSKUINFO_URL + spuId, method: 'GET' })
// 删除SPU
export const reqDeleteSpu = (spuId) =>
  request<any, any>({ url: API.DELETESPU_URL + spuId, method: 'DELETE' })
