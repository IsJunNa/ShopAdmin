import request from '@/utils/request'

enum API {
  // 获取SKU列表
  GETSKULIST_URL = '/admin/product/list/',
  // 下架商品
  CANCELSALE_URL = '/admin/product/cancelSale/',
  // 上架商品
  ONSALE_URL = '/admin/product/onSale/',
  // 获取SKU详情
  GETSKUINFO_URL = '/admin/product/getSkuInfo/',
  // 删除SKU
  DELETESKU_URL = '/admin/product/deleteSku/',
}

// 获取SKU列表
export const reqGetSkuList = (page: number, limit: number) =>
  request<any, any>({
    url: API.GETSKULIST_URL + `${page}/${limit}`,
    method: 'GET',
  })
// 下架商品
export const reqCancelSale = (skuId) =>
  request<any, any>({ url: API.CANCELSALE_URL + skuId, method: 'GET' })
// 上架商品
export const reqOnSale = (skuId) =>
  request<any, any>({ url: API.ONSALE_URL + skuId, method: 'GET' })
// 获取SKU详情
export const reqGetSkuInfo = (skuId) =>
  request<any, any>({ url: API.GETSKUINFO_URL + skuId, method: 'GET' })
// 删除SKU
export const reqDeleteSku = (skuId) =>
  request<any, any>({ url: API.DELETESKU_URL + skuId, method: 'DELETE' })
