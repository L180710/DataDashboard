import request from '@/utils/request'
import type { City, CityConnection } from '../../shared/types/city'

export const getCities = async (): Promise<City[]> => {
  const response = await request.get<City[]>('/cities')
  return response.data
}

export const getCityConnections = async (): Promise<CityConnection[]> => {
  const response = await request.get<CityConnection[]>('/cities/connections')
  return response.data
}
