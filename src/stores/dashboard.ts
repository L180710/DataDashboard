import { defineStore } from 'pinia'
import { getDashboardData } from '@/api/dashboard'
import type { DashboardData } from '../../shared/types/dashboard'

interface DashboardState {
  selectedCityId: string
  dashboardData: DashboardData | null
  loading: boolean
  error: string | null
}

export const useDashboardStore = defineStore('dashboard', {
  state: (): DashboardState => ({
    selectedCityId: 'national',
    dashboardData: null,
    loading: false,
    error: null,
  }),

  actions: {
    async fetchDashboard(cityId: string) {
      this.selectedCityId = cityId
      this.loading = true
      this.error = null

      try {
        this.dashboardData = await getDashboardData(cityId)
      } catch (error) {
        this.error = error instanceof Error ? error.message : '获取大屏数据失败'
        this.dashboardData = null
      } finally {
        this.loading = false
      }
    },
  },
})
