import { Router } from 'express'
import { getTodayDataByCityId } from '../services/todayData.service.js'

const todayDataRouter = Router()

todayDataRouter.get('/:cityId', async (req, res) => {
  try {
    const data = await getTodayDataByCityId(req.params.cityId)
    res.json(data)
  } catch (error) {
    console.error(error)
    res.status(500).json('获取今日数据失败')
  }
})

export default todayDataRouter
