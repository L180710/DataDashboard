import { Router } from 'express'
import { getCities, getCityById, getCityConnections } from '../services/city.js'

// 独立路由对象，不用把所有 API 都放在 app.ts 中
const router = Router()

router.get('/', (_req, res) => {
  const cities = getCities()
  res.json(cities)
})

router.get('/connections', (_req, res) => {
  const connections = getCityConnections()
  res.json(connections)
})

router.get('/:cityId', (req, res) => {
  const { cityId } = req.params
  const city = getCityById(cityId)

  if (!city) {
    res.status(404).json({
      message: 'City not found',
    })
    return
  }

  res.json(city)
})

export default router
