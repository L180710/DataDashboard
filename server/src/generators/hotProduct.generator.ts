import { hotProductTemplate } from '../data/dashboard-templates.js'
import type { City } from '../../../shared/types/city.js'

export const generateHotProduct = (city: City) => {
  return hotProductTemplate.map((item) => ({
    cityId: city.cityId,
    productName: item.name,
    ratio: item.ratio,
    amount: Math.round(item.baseAmount * city.scale),
  }))
}
