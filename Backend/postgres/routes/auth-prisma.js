const express = require('express')
const bcrypt = require('bcryptjs')
const router = express.Router()
const prisma = require('../utils/prisma')
const { generateToken } = require('../utils/jwt')
const { auth } = require('../middleware/auth-prisma')
const { authLimiter } = require('../middleware/rateLimiter')

function validateCredentials(req, res, next) {
  const { name, email, password } = req.body
  const errors = []
  if (req.path === '/signup' && (typeof name !== 'string' || name.trim().length < 2 || name.length > 50)) {
    errors.push('name must be between 2 and 50 characters')
  }
  if (typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push('email must be valid')
  }
  if (typeof password !== 'string' || password.length < 8) {
    errors.push('password must be at least 8 characters')
  }
  if (errors.length) return res.status(400).json({ success: false, message: 'Validation failed', errors })
  next()
}

function publicUser(user) {
  return { id: user.id, name: user.name, email: user.email, role: user.role }
}

router.post('/signup', authLimiter, validateCredentials, async (req, res, next) => {
  try {
    const { name, email, password } = req.body
    const passwordHash = await bcrypt.hash(password, 12)
    const user = await prisma.user.create({
      data: { name: name.trim(), email: email.trim().toLowerCase(), password: passwordHash },
      select: { id: true, name: true, email: true, role: true }
    })
    res.status(201).json({ success: true, token: generateToken({ id: user.id }), user: publicUser(user) })
  } catch (error) {
    next(error)
  }
})

router.post('/login', authLimiter, validateCredentials, async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({ where: { email: req.body.email.trim().toLowerCase() } })
    if (!user || !user.isActive || !(await bcrypt.compare(req.body.password, user.password))) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' })
    }
    res.json({ success: true, token: generateToken({ id: user.id }), user: publicUser(user) })
  } catch (error) {
    next(error)
  }
})

router.get('/me', auth, (req, res) => res.json({ success: true, user: req.user }))

module.exports = router
