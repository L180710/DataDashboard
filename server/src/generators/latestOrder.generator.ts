import { latestOrdersTemplate, customerNamePool } from '../data/dashboard-templates.js'
import type { City } from '../../../shared/types/city.js'

const formatDate = (date: Date): string => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}${month}${day}`
}

export const generateLatestOrder = (city: City) => {
  const now = new Date()

  return latestOrdersTemplate.map((template, index) => {
    // 让每条订单的日期略有区别，第一条最新
    const createdAt = new Date(now)
    createdAt.setDate(now.getDate() - index)

    // 订单号：城市代码+日期+三位序号
    const orderId = `${city.cfg}${formatDate(createdAt)}` + `${String(index + 1).padStart(3, '0')}`

    // 根据城市代码和订单号，确定客户姓名
    const cityCodeNumber = city.cfg.split('').reduce((total, char) => total + char.charCodeAt(0), 0)

    const nameIndex = (cityCodeNumber + index * 3) % customerNamePool.length

    return {
      orderId,
      cityId: city.cityId,
      userName: customerNamePool[nameIndex],
      productName: template.productName,
      amount: Math.round(template.amount * city.scale * 100) / 100,
      status: template.status,
      createdAt,
    }
  })
}
