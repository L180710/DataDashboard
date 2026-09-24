import { prisma } from './lib/prisma.js'

async function main() {
  const cities = await prisma.city.findMany()

  console.log(cities)
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect()
  })
