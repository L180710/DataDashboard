import { prisma } from '../lib/prisma.js'
import { formatDate } from '../utils/date.js'

// 根据城市 id 查询数据库的销售趋势
export const getSalesTrendByCityId = async (cityId: string) => {
  const data = await prisma.salesTrend.findMany({
    where: { cityId },
    orderBy: { date: 'asc' },
  })

  return data.map((item) => ({
    name: formatDate(item.date),
    value: item.value,
  }))
}
