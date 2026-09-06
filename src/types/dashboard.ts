import type { IconName } from './icon'

// 核心指标
export interface KeyDataItem {
  id: string
  icon: IconName
  title: string
  account: number
  diff: number
  status: 0 | 1 // 0 降低，1 上升
  color: string
}

export type KeyDataList = KeyDataItem[]

// 最新订单
interface OrderRencentItem {
  id: string
  orderNum: string
  userName: string
  productName: string
  price: number
  time: string
  state: 0 | 1 | 2 // 0 待发货，1 已发货，2 已完成
}

export type OrderLatestList = OrderRencentItem[]

// 热门商品
interface HotProductItem {
  id: string
  order: number
  productName: string
  price: number
  ratio: number
}

export type HotProductList = HotProductItem[]
