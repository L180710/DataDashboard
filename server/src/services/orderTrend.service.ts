import { prisma } from '../lib/prisma.js'
import { formatDate } from '../utils/date.js'

// 根据城市 id 查询数据库中对应订单趋势
export const getOrderTrendByCityId = async (cityId: string) => {
  const data = await prisma.orderTrend.findMany({
    where: { cityId },
    orderBy: { date: 'asc' },
  })

  return data.map((item) => ({
    name: formatDate(item.date),
    value: item.value,
  }))
}
