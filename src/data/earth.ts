export interface CityPoint {
  id?: string
  name: string
  longitude?: number
  latitude?: number
  value?: number
}

export const cityList: CityPoint[] = [
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
  // {
  //   id: 'guangzhou',
  //   name: '广州',
  //   longitude: 113.3,
  //   latitude: 23.1,
  //   value: 7245,
  // },
  // {
  //   id: 'chengdu',
  //   name: '成都',
  //   longitude: 104.1,
  //   latitude: 30.7,
  //   value: 5687,
  // },
  {
    id: 'shenzhen',
    name: '深圳',
    longitude: 114.1,
    latitude: 22.5,
    value: 5321,
  },
]

// export interface CityPoint {
//   name: string
//   longitude: number
//   latitude: number
//   value: number
// }

// export const cityList: CityPoint[] = [
//   {
//     name: '北京',
//     longitude: 130, // ✅ 从 116.4 → 130
//     latitude: 60, // ✅ 从 39.9 → 60
//     value: 12568,
//   },
//   {
//     name: '上海',
//     longitude: 140, // ✅ 从 121.5 → 140
//     latitude: 50, // ✅ 从 31.2 → 50
//     value: 9845,
//   },
//   {
//     name: '广州',
//     longitude: 110, // ✅ 从 113.3 → 110
//     latitude: 35, // ✅ 从 23.1 → 35
//     value: 7245,
//   },
//   {
//     name: '成都',
//     longitude: 90, // ✅ 从 104.1 → 90
//     latitude: 45, // ✅ 从 30.7 → 45
//     value: 5687,
//   },
//   {
//     name: '深圳',
//     longitude: 120, // ✅ 从 114.1 → 120
//     latitude: 25, // ✅ 从 22.5 → 25
//     value: 5321,
//   },
// ]
