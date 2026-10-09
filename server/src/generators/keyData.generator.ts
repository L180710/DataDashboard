// generators 负责各模块生成逻辑，不用全部塞进 seed.ts
import { keyDataTemplate, TodayDataTemplate } from '../data/dashboard-templates.js'
import { City } from '../../../shared/types/city.js'

const templates = {
  keyData: keyDataTemplate,
  todayData: TodayDataTemplate,
}

export const generateKeyData = (dataType: keyof typeof templates, city: City) => {
  return templates[dataType].map((template) => {
    const account = Math.round(template.baseValue * city.scale)
    const diff = Number((template.baseDiff * city.scale).toFixed(2))
    const status = diff >= 0 ? 1 : 0
    return {
      cityId: city.cityId,
      metricId: template.metricId,
      title: template.title,
      account,
      diff,
      status,
    }
  })
}
