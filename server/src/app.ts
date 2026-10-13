import express from 'express'
import cors from 'cors'
import cityRouter from './routes/city.js'
import keyDataRouter from './routes/keyData.routes.js'
import salesTrendRouter from './routes/salesTrend.routes.js'
import orderTrendRouter from './routes/orderTrend.routes.js'
import todayDataRouter from './routes/todayData.routes.js'
import latestOrderRouter from './routes/latestOrder.routes.js'
import userStatisticsRouter from './routes/userStatistics.routes.js'
import hotProductRouter from './routes/hotProduct.routes.js'
import channelStatisticsRouter from './routes/channelStatistics.routes.js'

const app = express()

app.use(cors())
app.use(express.json())
app.use('/api/cities', cityRouter)
app.use('/api/key-data', keyDataRouter)
app.use('/api/sales-trend', salesTrendRouter)
app.use('/api/order-trend', orderTrendRouter)
app.use('/api/today-data', todayDataRouter)
app.use('/api/latest-order', latestOrderRouter)
app.use('/api/user-statistics', userStatisticsRouter)
app.use('/api/hot-product', hotProductRouter)
app.use('/api/channel-statistics', channelStatisticsRouter)

const PORT = Number(process.env.PORT) || 3000
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`)
})
