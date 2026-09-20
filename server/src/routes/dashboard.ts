import { Router } from 'express'
import { getDashboardByCityId } from '../services/dashboard.js'

const router = Router()

router.get('/:cityId', (req, res) => {
  const { cityId } = req.params

  const dashboard = getDashboardByCityId(cityId)

  if (!dashboard) {
    res.status(404).json({
      message: 'Dashboard not found',
    })
    return
  }

  res.json(dashboard)
})

export default router
