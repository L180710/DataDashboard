import { Router } from 'express'
import { getLatestOderByCityId } from '../services/latestOder.service.js'

const latestOrderRouter = Router()

latestOrderRouter.get('/:cityId', async (req, res) => {
  try {
    const data = await getLatestOderByCityId(req.params.cityId)
    res.json(data)
  } catch (error) {
    console.error(error)
    res.status(500).json('获取最新订单数据失败')
  }
})

export default latestOrderRouter
