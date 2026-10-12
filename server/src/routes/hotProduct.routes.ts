import { Router } from 'express'
import { getHotProductByCityId } from '../services/hotProduct.service.js'

const hotProductRouter = Router()

hotProductRouter.get('/:cityId', async (req, res) => {
  try {
    const data = await getHotProductByCityId(req.params.cityId)
    res.json(data)
  } catch (error) {
    console.error(error)
    res.status(500).json('获取热门商品失败')
  }
})

export default hotProductRouter
