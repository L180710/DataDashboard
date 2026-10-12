import { Router } from 'express'
import { getUserStatisticsByCityId } from '../services/userStatistics.service.js'

const userStatisticsRouter = Router()

userStatisticsRouter.get('/:cityId', async (req, res) => {
  try {
    const data = await getUserStatisticsByCityId(req.params.cityId)
    res.json(data)
  } catch (error) {
    console.error(error)
    res.status(500).json('获取用户统计数据失败')
  }
})

export default userStatisticsRouter
