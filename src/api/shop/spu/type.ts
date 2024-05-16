// 服务器全部接口返回的数据类型
interface ResponseData {
  code: number
  message: string
  ok: boolean
}

// spu的数据类型
interface SpuItem {
  id?: number
  spuName: string
  description: string
  category3Id: string | number
  tmId: number
  spuSaleAttrList: any
  spuImageList: any
}

interface SPUList {
  Records: SpuItem[]
}

interface recordsType {
  id: number
  tmName: string
  logoUrl: string
}

interface getSpuImageData {
  createTime: string
  id: number
  imgName: string
  imgUrl: string
  spuId: number
  updateTime: string
}

interface spuSaleAttrValueListDate {
  baseSaleAttrId: number
  createTime: string
  id?: number
  isChecked: string
  saleAttrName: string
  saleAttrValueName: string
  spuId: number
  updateTime: string
}

interface getSaleAttrListDate {
  baseSaleAttrId: number
  createTime: string
  id?: number
  saleAttrName: string
  spuId: number
  updateTime: string
  spuSaleAttrValueList: spuSaleAttrValueListDate[]
}

interface getBaseSaleAttrListData {
  createTime: string
  id: number
  name: string
  updateTime: string
}

// 获取spu列表的返回值类型
export interface getSpuListRes extends ResponseData {
  data: {
    records: SPUList
    total: number
    size: number
    current: number
    searchCount: boolean
    pages: number
  }
}

// 获取所有品牌的返回类型
export interface allBrand extends ResponseData {
  data: recordsType[]
}

// 获取spu详情下的图片列表
export interface spuImageList extends ResponseData {
  data: getSpuImageData[]
}

// 获取spu详情下的销售属性列表
export interface getSaleAttrList extends ResponseData {
  data: getSaleAttrListDate[]
}

// 获取全部的品牌属性键
export interface getBaseSaleAttrListType extends ResponseData {
  data: getBaseSaleAttrListData[]
}
