import type { DashboardData } from '../../../shared/types/dashboard.js'
import { dashboardData } from '../data/dashboard.js'

// 根据 CityId 获取对应城市数据
export const getDashboardByCityId = (cityId: string): DashboardData | null => {
  return dashboardData.find((item) => item.cityId === cityId) ?? null
}
