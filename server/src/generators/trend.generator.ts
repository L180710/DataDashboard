// 销售趋势数据
import {
  moduleScale,
  randomVariation,
  salesTrendTemplate,
  orderTrendTemplate,
} from '../data/dashboard-templates.js'
import { City } from '../../../shared/types/city.js'

// 生成最近七天
const getRecentSevenDays = () => {
  const result: Date[] = []
  const today = new Date()

  for (let i = 6; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(today.getDate() - i)
    result.push(date)
  }

  return result
}

// 生成销售趋势七天数据
export const generateSalesTrend = (city: City) => {
  const dates = getRecentSevenDays()

  return dates.map((date, index) => {
    return {
      cityId: city.cityId,
      date,
      value: Math.round(
        salesTrendTemplate[index] * city.scale * moduleScale.sales * randomVariation(),
      ),
    }
  })
}

// 生成订单趋势七天数据
export const generateOrderTrend = (city: City) => {
  const dates = getRecentSevenDays()

  return dates.map((date, index) => {
    return {
      cityId: city.cityId,
      date,
      value: Math.round(
        orderTrendTemplate[index] * city.scale * moduleScale.orders * randomVariation(),
      ),
    }
  })
}
