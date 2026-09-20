import type { City, CityConnection } from '../types/city.js'

export const cities: City[] = [
  {
    id: 'beijing',
    name: '北京',
    longitude: 116.405285,
    latitude: 39.904989,
    value: 12568,
  },
  {
    id: 'shanghai',
    name: '上海',
    longitude: 121.5,
    latitude: 31.2,
    value: 9845,
  },
  {
    id: 'guangzhou',
    name: '广州',
    longitude: 113.3,
    latitude: 23.1,
    value: 7245,
  },
  {
    id: 'chengdu',
    name: '成都',
    longitude: 104.1,
    latitude: 30.7,
    value: 5687,
  },
  {
    id: 'shenzhen',
    name: '深圳',
    longitude: 114.1,
    latitude: 22.5,
    value: 5321,
  },
]

export const cityConnections: CityConnection[] = [
  {
    from: 'beijing',
    to: 'shanghai',
  },
  {
    from: 'beijing',
    to: 'shenzhen',
  },
  {
    from: 'beijing',
    to: 'guangzhou',
  },
  {
    from: 'beijing',
    to: 'chengdu',
  },
]
