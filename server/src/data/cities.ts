import type { City, CityConnection } from '../../../shared/types/city.js'

// 城市模板
export const cities: City[] = [
  {
    cityId: 'beijing',
    name: '北京',
    cfg: 'BG',
    longitude: 116.405285,
    latitude: 39.904989,
    scale: 1.2,
  },
  { cityId: 'shanghai', name: '上海', cfg: 'SH', longitude: 121.5, latitude: 31.2, scale: 1.35 },
  { cityId: 'guangzhou', name: '广州', cfg: 'GZ', longitude: 113.3, latitude: 23.1, scale: 0.95 },
  { cityId: 'chengdu', name: '成都', cfg: 'CD', longitude: 104.1, latitude: 30.7, scale: 0.8 },
  { cityId: 'shenzhen', name: '深圳', cfg: 'SZ', longitude: 114.1, latitude: 22.5, scale: 1.3 },
  { cityId: 'hangzhou', name: '杭州', cfg: 'HZ', longitude: 120.15, latitude: 30.28, scale: 1.05 },
]

// 城市链接
export const getCityConnections = (cites: City[]): CityConnection[] => {
  const origin = cities[0]

  if (!origin) {
    return []
  }

  return cities
    .filter((city) => city.cityId !== origin.cityId)
    .map((city) => ({
      from: origin,
      to: city,
    }))
}
