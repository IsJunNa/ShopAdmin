/* 定义strdmark接口数据 */

// 所有接口返回数据的数据类型(用于继承)
export interface RESTYPE {
  code: number
  message: string
  ok: boolean
}

// recordsType的数据类型(strdmarkResType中的数据类型)
export interface recordsType {
  id?: number
  tmName: string
  logoUrl: string
}

// 品牌管理列表的数据类型(返回数据)
export interface strdmarkResType extends RESTYPE {
  data: {
    records
    total: number
    size: number
    current: number
    searchCount: boolean
    pages: number
  }
}
