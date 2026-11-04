import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'
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

  // 核心指标加工后的数据
  const processedKeyData = computed(() => {
    if (!keyData.value) return []
    return createDataList(keyData.value!, 'key')
  })

  // 今日数据加工后数据
  const processedTodayData = computed(() => {
    if (!todayData.value) return []
    return createDataList(todayData.value!, 'today')
  })

  // 请求状态
  const loading = ref(false)
  const error = ref<string | null>(null)

  // 请求标识：解决快速切换城市产生的请求竞态
  let requestId = 0

  /**
   * 统一转换错误信息
   */
  const getErrorMessage = (err: unknown): string => {
    if (axios.isAxiosError(err)) {
      if (!err.response) {
        return '网络连接失败，请求检查网络后重试'
      }

      const status = err.response.status

      if (status >= 500) {
        return '服务器异常，请稍后重试'
      }

      if (status === 404) {
        return '请求的数据不存在'
      }
      return '请求失败，请稍后重试'
    }
    return err instanceof Error ? err.message : '获取 Dashboard 数据失败'
  }

  /**
   *
   * @param cityId - 城市 ID
   */
  const selectCity = async (cityId?: string) => {
    const targetCityId = cityId || 'national'
    selectedCityId.value = targetCityId
    await getDashboardData(targetCityId)
  }

  /**
   * 根据城市 ID 获取各模块数据
   * @param cityId - 城市 ID
   */
  const getDashboardData = async (cityId: string) => {
    // 每次请求生成新的 ID
    const currentRequestId = ++requestId

    loading.value = true
    error.value = null

    try {
      const results = await Promise.allSettled([
        getKeyData(cityId),
        getSalesTrend(cityId),
        getOrderTrend(cityId),
        getTodayData(cityId),
        getLatestOrder(cityId),
        getUserStatistics(cityId),
        getHotProduct(cityId),
        getChannelStatistics(cityId),
      ])

      // 如果不是最新请求，直接放弃处理
      if (currentRequestId !== requestId) return

      const [
        keyResult,
        salesResult,
        orderResult,
        todayResult,
        latestResult,
        userResult,
        hotResult,
        channelResult,
      ] = results

      // 逐个更新模块数据
      keyData.value = keyResult.status === 'fulfilled' ? keyResult.value : null
      salesTrend.value = salesResult.status === 'fulfilled' ? salesResult.value : null
      orderTrend.value = orderResult.status === 'fulfilled' ? orderResult.value : null
      todayData.value = todayResult.status === 'fulfilled' ? todayResult.value : null
      latestOrder.value = latestResult.status === 'fulfilled' ? latestResult.value : null
      userStatistics.value = userResult.status === 'fulfilled' ? userResult.value : null
      hotProduct.value = hotResult.status === 'fulfilled' ? hotResult.value : null
      channelStatistics.value = channelResult.status === 'fulfilled' ? channelResult.value : null

      // 输出各模块失败信息，方便开发阶段排查
      results.forEach((result, index) => {
        if (result.status === 'rejected') {
          console.error(`Dashboard 第几 ${index + 1} 个模块请求失败：`, result.reason)
        }
      })

      // 八个接口全部失败，才触发全局错误
      const allFailed = results.every((result) => result.status === 'rejected')

      if (allFailed) {
        error.value = 'Dashboard 数据获取失败，请检查网络或服务器状态'
      }
    } catch (err) {
      // 处理意外异常
      if (currentRequestId !== requestId) return
      console.error('Dashboard 请求异常：', err)
      error.value = getErrorMessage(err)
    } finally {
      // 只有最新请求可以关闭 loading
      if (currentRequestId === requestId) {
        loading.value = false
      }
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
