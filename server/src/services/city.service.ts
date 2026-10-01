import { prisma } from '../lib/prisma.js'

// 获取所有城市
export async function getCityList() {
  return await prisma.city.findMany()
}

// 根据 id 查询城市
export async function getCityById(cityId: string) {
  return await prisma.city.findUnique({
    where: {
      cityId,
    },
  })
}
