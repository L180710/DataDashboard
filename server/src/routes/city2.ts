import { Router } from 'express'
import { prisma } from '../lib/prisma.js'

const router = Router()

router.get('/', async (_req, res) => {
  try {
    const cities = await prisma.city.findMany()
    res.json(cities)
  } catch (error) {
    console.log(error)

    res.status(500).json({
      message: '获取城市数据失败',
    })
  }
})

export default router
