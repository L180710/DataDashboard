import request from '@/utils/request'
import type { DashboardData } from '../../shared/types/dashboard'

export const getDashboardData = async (cityId: string): Promise<DashboardData> => {
  const response = await request.get<DashboardData>(`/dashboard/${cityId}`)
  return response.data
}
