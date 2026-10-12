// 核心指标、今日数据
export interface DataItem {
  id: string
  cityId: string
  metricId: string
  title: string
  account: number
  diff: number
  status: 0 | 1 // 0 降低，1 上升
}
export type DataList = DataItem[]

// 销售趋势、订单数趋势
export interface TrendItem {
  name: string
  value: number
}
export type OrderTrendList = TrendItem[]
export type SalesTrendList = TrendItem[]

// 最新订单
export interface OrderRencentItem {
  id: string
  cityId: string
  orderId: string
  userName: string
  productName: string
  amount: number
  createdAt: string
  status: 0 | 1 | 2 // 0 待发货，1 已发货，2 已完成
}
export type OrderLatestList = OrderRencentItem[]

// 热门商品
export interface HotProductItem {
  id: string
  cityId: string
  productName: string
  amount: number
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
  keyData: DataList
  salesTrend: SalesTrendList
  orderTrend: OrderTrendList
  todayData: DataList
  latestOrders: OrderLatestList
  userStatistics: UserStatistics
  hotProductData: HotProductList
  channelStatistics: ChannelStatistics
}
