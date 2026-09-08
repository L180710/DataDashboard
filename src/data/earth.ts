export interface CityPoint {
  name: string
  longitude: number
  latitude: number
  value: number
}

export const cityList: CityPoint[] = [
  {
    name: '北京',
    longitude: 116.4,
    latitude: 39.9,
    value: 12568,
  },
  {
    name: '上海',
    longitude: 121.5,
    latitude: 31.2,
    value: 9845,
  },
  {
    name: '广州',
    longitude: 113.3,
    latitude: 23.1,
    value: 7245,
  },
  {
    name: '成都',
    longitude: 104.1,
    latitude: 30.7,
    value: 5687,
  },
  {
    name: '深圳',
    longitude: 114.1,
    latitude: 22.5,
    value: 5321,
  },
]
