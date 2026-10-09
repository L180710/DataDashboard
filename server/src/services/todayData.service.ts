import { prisma } from '../lib/prisma.js'

// 根据城市 ID 查询数据库今日数据
export const getTodayDataByCityId = async (cityId: string) => {
  return await prisma.todayData.findMany({
    where: { cityId },
    orderBy: { id: 'asc' },
  })
}
