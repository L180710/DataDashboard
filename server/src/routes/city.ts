import { Router } from 'express'
import { getCityList } from '../services/city.service.js'

const cityRouter = Router()

cityRouter.get('/', async (_req, res) => {
  try {
    const cities = await getCityList()
    res.json(cities)
  } catch (error) {
    console.error(error)

    res.status(500).json({
      message: '获取城市数据失败',
    })
  }
})

export default cityRouter
