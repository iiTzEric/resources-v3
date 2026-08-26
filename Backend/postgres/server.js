require('dotenv').config()

const express = require('express')
const cors = require('cors')
const prisma = require('./utils/prisma')
const authRoutes = require('./routes/auth-prisma')
const taskRoutes = require('./routes/crud-postgres')
const { errorHandler } = require('./errorHandler')
const { globalLimiter } = require('./middleware/rateLimiter')

const app = express()
app.use(express.json())
app.use(cors({ origin: process.env.FRONTEND_ORIGIN || 'http://localhost:5173' }))
app.use(globalLimiter)
app.get('/health', (req, res) => res.json({ success: true, message: 'API is running' }))
app.use('/api/auth', authRoutes)
app.use('/api/tasks', taskRoutes)
app.use(errorHandler)

async function start() {
  if (!process.env.DATABASE_URL || !process.env.JWT_SECRET) {
    throw new Error('DATABASE_URL and JWT_SECRET are required')
  }

  await prisma.$connect()
  const server = app.listen(process.env.PORT || 3000, () => {
    console.log(`PostgreSQL API listening on port ${process.env.PORT || 3000}`)
  })

  const shutdown = async () => {
    await prisma.$disconnect()
    server.close(() => process.exit(0))
  }
  process.once('SIGINT', shutdown)
  process.once('SIGTERM', shutdown)
}

start().catch(async error => {
  console.error(error.message)
  await prisma.$disconnect()
  process.exit(1)
})
