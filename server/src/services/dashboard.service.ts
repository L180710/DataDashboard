// import { prisma } from '../lib/prisma.js'

// export async function getDashboardByCity(cityId: string) {
//   return await prisma.dashboard.findUnique({
//     where: {
//       cityId,
//     },
//     include: {
//       keyData: true,
//       salesTrend: true,
//       orderTrend: true,
//       todayData: true,
//       latestOrders: true,
//       userStatistics: true,
//       hotProducts: true,
//       channelStatistics: true,
//     },
//   })
// }
