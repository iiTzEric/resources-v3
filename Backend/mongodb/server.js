require('dotenv').config()

const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const { globalLimiter } = require('./middleware/rateLimiter')
const authRoutes = require('./routes/auth')
const taskRoutes = require('./routes/crud')
const { errorHandler } = require('./middleware/errorHandler')

const app = express()
app.use(express.json())
app.use(cors({ origin: process.env.FRONTEND_ORIGIN || 'http://localhost:5173' }))
app.use(globalLimiter)
app.get('/health', (req, res) => res.json({ success: true, message: 'API is running' }))
app.use('/api/auth', authRoutes)
app.use('/api/tasks', taskRoutes)
app.use(errorHandler)

async function start() {
  if (!process.env.MONGO_URI || !process.env.JWT_SECRET) {
    throw new Error('MONGO_URI and JWT_SECRET are required')
  }

  await mongoose.connect(process.env.MONGO_URI)
  const server = app.listen(process.env.PORT || 3000, () => {
    console.log(`MongoDB API listening on port ${process.env.PORT || 3000}`)
  })

  const shutdown = async () => {
    await mongoose.disconnect()
    server.close(() => process.exit(0))
  }
  process.once('SIGINT', shutdown)
  process.once('SIGTERM', shutdown)
}

start().catch(error => {
  console.error(error.message)
  process.exit(1)
})
