import type { City, CityConnection } from '../../../shared/types/city.js'

// 城市模板
export const cities: City[] = [
  {
    cityId: 'national',
    name: '全国',
    cfg: 'GL',
    longitude: 104,
    latitude: 35,
    scale: 1,
    value: 1000000,
  },
  {
    cityId: 'beijing',
    name: '北京',
    cfg: 'BG',
    longitude: 116.405285,
    latitude: 39.904989,
    scale: 1.2,
    value: 204000,
  },
  {
    cityId: 'shanghai',
    name: '上海',
    cfg: 'SH',
    longitude: 121.5,
    latitude: 31.2,
    scale: 1.35,
    value: 198889,
  },
  {
    cityId: 'guangzhou',
    name: '广州',
    cfg: 'GZ',
    longitude: 113.3,
    latitude: 23.1,
    scale: 0.95,
    value: 209988,
  },
  {
    cityId: 'chengdu',
    name: '成都',
    cfg: 'CD',
    longitude: 104.1,
    latitude: 30.7,
    scale: 0.8,
    value: 309900,
  },
  {
    cityId: 'shenzhen',
    name: '深圳',
    cfg: 'SZ',
    longitude: 114.1,
    latitude: 22.5,
    scale: 1.3,
    value: 300000,
  },
  {
    cityId: 'hangzhou',
    name: '杭州',
    cfg: 'HZ',
    longitude: 120.15,
    latitude: 30.28,
    scale: 1.05,
    value: 20000,
  },
]

// 城市链接
export const getCityConnections = (cities: City[]): CityConnection[] => {
  const origin = cities[0]

  if (!origin) {
    return []
  }

  return cities
    .filter((city) => city.cityId !== origin.cityId && city.cityId !== 'national')
    .map((city) => ({
      from: origin,
      to: city,
    }))
}
