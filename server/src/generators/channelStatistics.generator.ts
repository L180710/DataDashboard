import { moduleScale, channelTemplate } from '../data/dashboard-templates.js'
import type { City } from '../../../shared/types/city.js'

export const generateChannelStatistics = (city: City) => {
  // 汇总总和
  const sum = channelTemplate.reduce((sum, item) => sum + item.baseValue, 0)

  return channelTemplate.map((item) => {
    return {
      cityId: city.cityId,
      name: item.name,
      ratio: Math.round((item.baseValue / sum) * 100),
      value: Math.round(item.baseValue * city.scale * moduleScale.channel),
    }
  })
}
