import { userStatisticsTemplate } from '../data/dashboard-templates.js'
import type { City } from '../../../shared/types/city.js'

export const generateUserStatistics = (city: City) => {
  const gender = userStatisticsTemplate.gender.map((item) => ({
    cityId: city.cityId,
    category: 'gender',
    name: item.name,
    value: item.baseValue * city.scale,
  }))

  const age = userStatisticsTemplate.age.map((item) => ({
    cityId: city.cityId,
    category: 'age',
    name: item.name,
    value: item.baseValue * city.scale,
  }))

  return [...gender, ...age]
}
