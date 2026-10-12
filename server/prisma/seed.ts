import process from 'process'
import { prisma } from '../src/lib/prisma.js'
import { cities } from '../src/data/cities.js'
import { generateKeyData } from '../src/generators/keyData.generator.js'
import { generateSalesTrend, generateOrderTrend } from '../src/generators/trend.generator.js'
import { generateLatestOrder } from '../src/generators/latestOrder.generator.js'
import { generateUserStatistics } from '../src/generators/userStatistics.generator.js'
import { generateHotProduct } from '../src/generators/hotProduct.generator.js'
import { generateChannelStatistics } from '../src/generators/channelStatistics.generator.js'

/**
改了 schema.prisma 之后执行
npx prisma migrate dev --name add-xxx
单独改 seed.ts 之后执行
npx prisma db seed

如果报了感觉不应该的错误，尝试删除数据库重新执行
rm -rf generated/prisma
npx prisma migrate reset

# 1. 重置数据库
npx prisma migrate reset

# 2. 清掉旧 Client
rm -rf generated/prisma

# 3. 重新生成
npx prisma generate

# 4. 重新灌种子数据
npx prisma db seed

# 5. 重启服务
npm run dev
 */

async function main() {
  for (const city of cities) {
    // 城市
    await prisma.city.upsert({
      where: { cityId: city.cityId },

      update: {
        // name: city.name,
        // cfg: city.cfg,
        longitude: city.longitude,
        latitude: city.latitude,
        scale: city.scale,
      },

      create: {
        cityId: city.cityId,
        name: city.name,
        cfg: city.cfg,
        longitude: city.longitude,
        latitude: city.latitude,
        scale: city.scale,
      },
    })

    // 核心指标
    const keyData = generateKeyData('keyData', city)
    await prisma.keyData.deleteMany({
      where: { cityId: city.cityId },
    })
    await prisma.keyData.createMany({
      data: keyData,
    })

    // 销售趋势
    const salesTrend = generateSalesTrend(city)
    await prisma.salesTrend.deleteMany({
      where: { cityId: city.cityId },
    })
    await prisma.salesTrend.createMany({
      data: salesTrend,
    })

    // 订单趋势
    const orderTrend = generateOrderTrend(city)
    await prisma.orderTrend.deleteMany({
      where: { cityId: city.cityId },
    })
    await prisma.orderTrend.createMany({
      data: orderTrend,
    })

    // 今日数据
    const todayData = generateKeyData('todayData', city)
    await prisma.todayData.deleteMany({
      where: { cityId: city.cityId },
    })
    await prisma.todayData.createMany({
      data: todayData,
    })

    // 最新订单
    const latestOrder = generateLatestOrder(city)
    await prisma.latestOrder.deleteMany({
      where: { cityId: city.cityId },
    })
    await prisma.latestOrder.createMany({
      data: latestOrder,
    })

    // 用户统计
    const userStatisics = generateUserStatistics(city)
    await prisma.userStatistics.deleteMany({
      where: { cityId: city.cityId },
    })
    await prisma.userStatistics.createMany({
      data: userStatisics,
    })

    // 热门商品
    const hotProduct = generateHotProduct(city)
    await prisma.hotProduct.deleteMany({
      where: { cityId: city.cityId },
    })
    await prisma.hotProduct.createMany({
      data: hotProduct,
    })

    // 渠道来源
    const channelStatistics = generateChannelStatistics(city)
    await prisma.channelStatistics.deleteMany({
      where: { cityId: city.cityId },
    })
    await prisma.channelStatistics.createMany({
      data: channelStatistics,
    })
  }
}

main()
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
