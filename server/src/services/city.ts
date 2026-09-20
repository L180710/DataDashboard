import type { City, CityConnection } from '../types/city.js'
import { cities, cityConnections } from '../data/cities.js'

// 获取所有城市
export const getCities = (): City[] => {
  return cities
}

// 根据 id 获取对应城市
export const getCityById = (cityId: string): City | null => {
  return cities.find((city) => city.id === cityId) ?? null
}

// 获取城市连接
export const getCityConnections = (): CityConnection[] => {
  return cityConnections
}
