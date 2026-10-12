import { prisma } from '../lib/prisma.js'

export const getChannelStatisticsByCityId = async (cityId: string) => {
  return await prisma.channelStatistics.findMany({
    where: { cityId },
    orderBy: { id: 'asc' },
  })
}
