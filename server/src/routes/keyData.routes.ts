import { Router } from 'express'
import { getKeyDataByCityId } from '../services/keyData.service.js'

const keyDataRouter = Router()

keyDataRouter.get('/:cityId', async (req, res) => {
  try {
    const data = await getKeyDataByCityId(req.params.cityId)
    res.json(data)
  } catch (error) {
    console.error(error)

    res.status(500).json({
      message: '获取核心指标失败',
    })
  }
})

export default keyDataRouter
