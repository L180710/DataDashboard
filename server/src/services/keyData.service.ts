import { prisma } from '../lib/prisma.js'

// 根据城市 ID 查询数据库核心指标数据
export const getKeyDataByCityId = async (cityId: string) => {
  return await prisma.keyData.findMany({
    where: { cityId },
    orderBy: { id: 'asc' },
  })
}
