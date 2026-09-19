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

// 销售趋势、订单数趋势
export interface OrderDataItem {
  date: string
  value: number
}
export type OrderTrendList = OrderDataItem[]
export type SalesTrendList = OrderDataItem[]

// 最新订单
export interface OrderRencentItem {
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
export interface HotProductItem {
  id: string
  order: number
  productName: string
  price: number
  ratio: number
}
export type HotProductList = HotProductItem[]

// 用户统计
export interface StatisticsItem {
  name: string
  value: number
}
export interface UserStatistics {
  gender: StatisticsItem[]
  age: StatisticsItem[]
}
// 渠道来源
export type ChannelStatistics = StatisticsItem[]

// 控制板数据
export interface DashboardData {
  cityId: string
  keyData: KeyDataList
  salesTrend: SalesTrendList
  orderTrend: OrderTrendList
  todayData: KeyDataList
  latestOrders: OrderLatestList
  userStatistics: UserStatistics
  hotProductData: HotProductList
  channelStatistics: ChannelStatistics
}

// state 状态
export interface DashboardState {
  selectedCityId: string
  dashboardData: DashboardData | null
  loading: boolean
  error: string | null
}
