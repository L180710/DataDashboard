import express from 'express'
import cors from 'cors'
import cityRouter from './routes/city.js'
import keyDataRouter from './routes/keyData.routes.js'
import salesTrendRouter from './routes/salesTrend.routes.js'
import orderTrendRouter from './routes/orderTrend.routes.js'
import todayDataRouter from './routes/todayData.routes.js'
import latestOrderRouter from './routes/latestOrder.routes.js'

// 后续各模块数据处理完了可删除
import dashboardRouter from './routes/dashboard.js'

const app = express()

app.use(cors())
app.use(express.json())
app.use('/api/cities', cityRouter)
app.use('/api/key-data', keyDataRouter)
app.use('/api/sales-trend', salesTrendRouter)
app.use('/api/order-trend', orderTrendRouter)
app.use('/api/today-data', todayDataRouter)
app.use('/api/latest-order', latestOrderRouter)

// 后续各模块数据处理完了可删除
app.use('/api/dashboard', dashboardRouter)

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000')
})
