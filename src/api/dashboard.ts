import request from '@/utils/request'
import type { DataItem, OrderRencentItem } from '../../shared/types/dashboard'

// 可删，当独立模块设置好之后
import type { DashboardData } from '../../shared/types/dashboard'
// 这个获取的是一个 cityId 对应的各个模块，当独立模块设置好了，可删
export const getDashboardData = async (cityId: string): Promise<DashboardData> => {
  const response = await request.get<DashboardData>(`/dashboard/${cityId}`)
  return response.data
}

// 核心指标
export const getKeyData = async (cityId: string): Promise<DataItem[]> => {
  const response = await request.get<DataItem[]>(`/key-data/${cityId}`)
  return response.data
}

// 销售趋势
export const getSalesTrend = async (cityId: string) => {
  const response = await request.get(`/sales-trend/${cityId}`)
  return response.data
}

// 订单趋趋势
export const getOrderTrend = async (cityId: string) => {
  const response = await request.get(`/order-trend/${cityId}`)
  return response.data
}

// 今日数据
export const getTodayData = async (cityId: string): Promise<DataItem[]> => {
  const response = await request.get<DataItem[]>(`/today-data/${cityId}`)
  return response.data
}

// 最新订单
export const getLatestOrder = async (cityId: string): Promise<OrderRencentItem[]> => {
  const response = await request.get<OrderRencentItem[]>(`/latest-order/${cityId}`)
  return response.data
}
