import process from 'process'
import { prisma } from '../src/lib/prisma.js'

async function main() {
  const cities = [
    { cityId: 'beijing', name: '北京', longitude: 116.405285, latitude: 39.904989 },
    { cityId: 'shanghai', name: '上海', longitude: 121.5, latitude: 31.2 },
    { cityId: 'guangzhou', name: '广州', longitude: 113.3, latitude: 23.1 },
    { cityId: 'chengdu', name: '成都', longitude: 104.1, latitude: 30.7 },
    { cityId: 'shenzhen', name: '深圳', longitude: 114.1, latitude: 22.5 },
  ]

  for (const city of cities) {
    await prisma.city.upsert({
      where: { cityId: city.cityId },
      update: {
        name: city.name,
        longitude: city.longitude,
        latitude: city.latitude,
      },
      create: {
        cityId: city.cityId,
        name: city.name,
        longitude: city.longitude,
        latitude: city.latitude,
      },
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
