import { Router } from 'express'
import { getOrderTrendByCityId } from '../services/orderTrend.service.js'

const orderTrendRouter = Router()

orderTrendRouter.get('/:cityId', async (req, res) => {
  try {
    const data = await getOrderTrendByCityId(req.params.cityId)
    res.json(data)
  } catch (error) {
    console.error(error)
    res.status(500).json({
      message: '获取订单趋势数据失败',
    })
  }
})

export default orderTrendRouter
