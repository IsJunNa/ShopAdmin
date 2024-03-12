/* 品牌管理模块接口 */
// 引入封装好的axios
import request from '@/utils/request'
import { recordsType } from '@/api/shop/strdmark/type'

enum API {
  // 新增品牌接口
  ADDTRADEMARK_URL = '/admin/product/baseTrademark/save',
  // 删除品牌接口
  DELETETETRADEMARK_URL = '/admin/product/baseTrademark/remove/',
  // 修改品牌接口
  UPDATETRADEMARK_URL = '/admin/product/baseTrademark/update',
  // 获取品牌列表接口
  GETTRADEMARK_URL = '/admin/product/baseTrademark/',
}
// 引入数据类型
import { strdmarkResType } from '@/api/shop/strdmark/type'

// 获取品牌列表 page:获取第几页 limit:每一页获取几个品牌数据
export const reqHasTrademark = (page: number, limit: number) =>
  request<any, strdmarkResType>({
    url: API.GETTRADEMARK_URL + `${page}/${limit}`,
    method: 'GET',
  })

// 新增品牌数据 logoUrl:图片地址 tmName:品牌名称
export const reqAddTrademark = (data) =>
  request<recordsType, any>({ url: API.ADDTRADEMARK_URL, data, method: 'POST' })

// 修改品牌数据 logoUrl:图片地址 tmName:品牌名称 id:修改品牌数据的id值
export const reqUpdateTrademark = (data) =>
  request<recordsType, any>({
    url: API.UPDATETRADEMARK_URL,
    data,
    method: 'PUT',
  })

// 删除品牌数据 id:要删除的品牌数据的id
export const reqDeleteTrademark = (id) =>
  request<any, any>({ url: API.DELETETETRADEMARK_URL + id, method: 'DELETE' })
