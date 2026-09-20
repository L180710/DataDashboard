import express from 'express'
import cors from 'cors'
import cityRouter from './routes/city.js'
import dashboardRouter from './routes/dashboard.js'

const app = express()

app.use(cors())
app.use(express.json())
app.use('/api/cities', cityRouter)
app.use('/api/dashboard', dashboardRouter)

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000')
})
