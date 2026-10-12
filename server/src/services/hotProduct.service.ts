import { prisma } from '../lib/prisma.js'

export const getHotProductByCityId = async (cityId: string) => {
  return await prisma.hotProduct.findMany({
    where: { cityId },
    orderBy: { id: 'asc' },
  })
}
