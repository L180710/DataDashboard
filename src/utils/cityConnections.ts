import type { City, CityConnection } from '../../shared/types/city'

/**
 * 获取城市之间的连接关系
 *
 * 规则：
 * 1. cities 数组的第一个城市作为起点
 * 2. national 不参与城市连接
 * 3. 起点城市不连接自身
 * 4. 其他城市都连接到起点城市
 */
export const getCityConnections = (cities: City[]): CityConnection[] => {
  // 获取起点城市
  const origin = cities[0]

  // 如果没有城市，返回空数组
  if (!origin) {
    return []
  }

  // 过滤并生成城市连接关系
  return cities
    .filter((city) => {
      // 排除起点城市
      if (city.cityId === origin.cityId) {
        return false
      }

      // 排除全国数据
      if (city.cityId === 'national') {
        return false
      }

      return true
    })
    .map((city) => {
      return {
        from: origin,
        to: city,
      }
    })
}
