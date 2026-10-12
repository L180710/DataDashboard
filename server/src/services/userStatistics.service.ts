import { prisma } from '../lib/prisma.js'

export const getUserStatisticsByCityId = async (cityId: string) => {
  const rows = await prisma.userStatistics.findMany({
    where: { cityId },
    orderBy: { id: 'asc' },
  })

  return {
    gender: rows
      .filter((item) => item.category === 'gender')
      .map(({ name, value }) => ({ name, value })),

    age: rows.filter((item) => item.category === 'age').map(({ name, value }) => ({ name, value })),
  }
}
