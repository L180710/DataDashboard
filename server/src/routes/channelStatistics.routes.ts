import { Router } from 'express'
import { getChannelStatisticsByCityId } from '../services/channelStatistics.service.js'

const channelStatisticsRouter = Router()

channelStatisticsRouter.get('/:cityId', async (req, res) => {
  try {
    const data = await getChannelStatisticsByCityId(req.params.cityId)
    res.json(data)
  } catch (error) {
    console.error(error)
    res.json('获取渠道数据失败')
  }
})

export default channelStatisticsRouter
