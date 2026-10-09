import { prisma } from '../lib/prisma.js'

export const getLatestOderByCityId = async (cityId: string) => {
  return prisma.latestOrder.findMany({
    where: { cityId },
    orderBy: {
      createdAt: 'desc',
    },
    take: 5,
  })
}
