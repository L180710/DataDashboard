import { Router } from 'express'
import { getSalesTrendByCityId } from '../services/salesTrend.service.js'

const salesTrendRoute = Router()

salesTrendRoute.get('/:cityId', async (req, res) => {
  try {
    const data = await getSalesTrendByCityId(req.params.cityId)
    res.json(data)
  } catch (error) {
    console.error(error)
    res.status(500).json({
      message: '获取销售趋势数据失败',
    })
  }
})

export default salesTrendRoute
