// 这个能正常对接了，把 dashboard.ts 去掉
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type {
  DataItem,
  TrendItem,
  OrderRencentItem,
  UserStatistics,
  HotProductItem,
  ChannelStatistics,
} from '../../shared/types/dashboard'
import { createDataList } from '@/utils/data/DataList'
import {
  getKeyData,
  getSalesTrend,
  getOrderTrend,
  getTodayData,
  getLatestOrder,
  getUserStatistics,
  getHotProduct,
  getChannelStatistics,
} from '@/api/dashboard'

export const useDashboardStore = defineStore('dashboard', () => {
  // 当前城市
  const selectedCityId = ref<string | null>(null)

  /**  各模块数据 */
  // 核心指标
  const keyData = ref<DataItem[] | null>(null)
  // 核心指标加工后的数据
  const processedKeyData = computed(() => {
    if (!keyData.value) return []
    return createDataList(keyData.value!, 'key')
  })

  // 销售趋势
  const salesTrend = ref<TrendItem[] | null>(null)

  // 订单趋势
  const orderTrend = ref<TrendItem[] | null>(null)

  // 今日数据
  const todayData = ref<DataItem[] | null>(null)

  // 最新订单
  const latestOrder = ref<OrderRencentItem[] | null>(null)

  // 用户统计
  const userStatistics = ref<UserStatistics | null>(null)

  // 热门商品
  const hotProduct = ref<HotProductItem[] | null>(null)

  // 渠道来源
  const channelStatistics = ref<ChannelStatistics | null>(null)

  // 今日数据加工后数据
  const processedTodayData = computed(() => {
    if (!todayData.value) return []
    return createDataList(todayData.value!, 'today')
  })

  // 请求状态
  const loading = ref(false)
  const error = ref<string | null>(null)

  /**
   * 切换城市
   * @param cityId - 城市 ID
   */
  const selectCity = (cityId?: string) => {
    selectedCityId.value = cityId ? cityId : 'national'
    getDashboardData(selectedCityId?.value)
  }

  /**
   * 根据城市 ID 获取各模块数据
   * @param cityId - 城市 ID
   */
  const getDashboardData = async (cityId: string) => {
    loading.value = true
    error.value = null

    try {
      const [
        keyDataResult,
        salesTrendResult,
        orderTrendResult,
        todayDataResult,
        latestOrderResult,
        userStatisticsResult,
        hotProductResult,
        channelStatisticsResult,
      ] = await Promise.allSettled([
        getKeyData(cityId),
        getSalesTrend(cityId),
        getOrderTrend(cityId),
        getTodayData(cityId),
        getLatestOrder(cityId),
        getUserStatistics(cityId),
        getHotProduct(cityId),
        getChannelStatistics(cityId),
      ])

      // 核心指标
      if (keyDataResult.status === 'fulfilled') {
        keyData.value = keyDataResult.value
      } else {
        keyData.value = null
        console.error('核心指标获取失败：', keyDataResult.reason)
      }

      // 销售趋势
      if (salesTrendResult.status === 'fulfilled') {
        salesTrend.value = salesTrendResult.value
      } else {
        salesTrend.value = null
        console.error('销售趋势获取失败', salesTrendResult.reason)
      }

      // 订单趋势
      if (orderTrendResult.status === 'fulfilled') {
        orderTrend.value = orderTrendResult.value
      } else {
        orderTrend.value = null
        console.error('订单趋势获取失败', orderTrendResult.reason)
      }

      // 今日数据
      if (todayDataResult.status === 'fulfilled') {
        todayData.value = todayDataResult.value
      } else {
        todayData.value = null
        console.error('今日数据获取失败')
      }

      // 最新订单
      if (latestOrderResult.status === 'fulfilled') {
        latestOrder.value = latestOrderResult.value
      } else {
        latestOrder.value = null
        console.error('最新订单数据获取失败')
      }

      // 用户统计
      if (userStatisticsResult.status === 'fulfilled') {
        userStatistics.value = userStatisticsResult.value
      } else {
        userStatistics.value = null
        console.error('用户统计数据获取失败')
      }

      // 热门商品
      if (hotProductResult.status === 'fulfilled') {
        hotProduct.value = hotProductResult.value
      } else {
        hotProduct.value = null
        console.error('热门商品数据获取失败')
      }

      // 渠道来源
      if (channelStatisticsResult.status === 'fulfilled') {
        channelStatistics.value = channelStatisticsResult.value
      } else {
        userStatistics.value = null
        console.error('渠道来源数据获取失败')
      }

      // 如果全部失败，则给全局 error
      const allFailed = keyDataResult.status === 'rejected'
      if (allFailed) {
        error.value = '获取 Dashboard 数据失败'
      }
    } catch (err) {
      console.error(err)
      error.value = err instanceof Error ? err.message : '获取 Dashboard 数据失败'
    } finally {
      loading.value = false
    }
  }
  return {
    // 城市
    selectedCityId,

    // 各模块数据
    keyData,
    processedKeyData,
    salesTrend,
    orderTrend,
    processedTodayData,
    latestOrder,
    userStatistics,
    hotProduct,
    channelStatistics,

    // 状态
    loading,
    error,

    // 方法
    selectCity,
  }
})
