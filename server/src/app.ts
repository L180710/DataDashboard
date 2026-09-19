import express from 'express'
import cors from 'cors'

const app = express()

app.use(cors())
app.use(express.json())

app.get('/api/test', (_req, res) => {
  res.json({
    message: 'Node API works',
  })
})

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000')
})
