// ============================================
// AUTH ROUTES
//
// WHAT: Complete authentication routes —
//       signup, login, logout, profile, update
// WHEN: Any app with user authentication
// WHY:  Same auth pattern every time —
//       copy and customize field names
//
// ENDPOINTS:
// POST   /api/auth/signup     — create account
// POST   /api/auth/login      — login
// GET    /api/auth/me         — get current user
// PUT    /api/auth/me         — update profile
// PUT    /api/auth/password   — change password
// DELETE /api/auth/me         — delete account
// GET    /api/auth/user/:id   — get public profile
// ============================================

const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const { auth } = require('../middleware/auth')
const { validate, rules } = require('../middleware/validation')
const { authLimiter } = require('../middleware/rateLimiter')

// Generate JWT token
function generateToken(userId) {
  return jwt.sign(
    { id: userId },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  )
}

// ── POST /api/auth/signup ───────────────────
router.post('/signup',
  authLimiter,
  validate([
    rules.required('name'),
    rules.required('email'),
    rules.email('email'),
    rules.required('password'),
    rules.minLength('password', 8)
  ]),
  async (req, res, next) => {
    try {
      const { name, email, password } = req.body

      const existing = await User.findOne({ email })
      if (existing) {
        return res.status(400).json({
          success: false,
          message: 'Email already in use'
        })
      }

      const user = await User.create({ name, email, password })
      const token = generateToken(user._id)

      res.status(201).json({
        success: true,
        message: 'Account created successfully',
        token,
        user: user.toPublicJSON()
      })
    } catch (err) {
      next(err)
    }
  }
)

// ── POST /api/auth/login ────────────────────
router.post('/login',
  authLimiter,
  validate([
    rules.required('email'),
    rules.email('email'),
    rules.required('password')
  ]),
  async (req, res, next) => {
    try {
      const { email, password } = req.body

      // findByCredentials throws if invalid
      const user = await User.findByCredentials(email, password)
      const token = generateToken(user._id)

      res.json({
        success: true,
        token,
        user: user.toPublicJSON()
      })
    } catch (err) {
      // Don't reveal whether email or password is wrong
      res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      })
    }
  }
)

// JWT logout is handled by removing the token on the client.
router.post('/logout', auth, (req, res) => {
  res.json({
    success: true,
    message: 'Logged out successfully. Discard the token on the client.'
  })
})

// ── GET /api/auth/me ────────────────────────
router.get('/me', auth, async (req, res) => {
  res.json({
    success: true,
    user: req.user.toPublicJSON()
  })
})

// ── PUT /api/auth/me ────────────────────────
router.put('/me', auth,
  validate([
    rules.minLength('name', 2),
    rules.email('email'),
  ]),
  async (req, res, next) => {
    try {
      const allowed = ['name', 'email', 'avatar']
      const updates = {}

      for (const field of allowed) {
        if (req.body[field] !== undefined) {
          updates[field] = req.body[field]
        }
      }

      const user = await User.findByIdAndUpdate(
        req.user._id,
        updates,
        { new: true, runValidators: true }
      )

      res.json({
        success: true,
        user: user.toPublicJSON()
      })
    } catch (err) {
      next(err)
    }
  }
)

// ── PUT /api/auth/password ──────────────────
router.put('/password', auth,
  validate([
    rules.required('currentPassword'),
    rules.required('newPassword'),
    rules.minLength('newPassword', 8)
  ]),
  async (req, res, next) => {
    try {
      const { currentPassword, newPassword } = req.body

      // Get user with password field
      const user = await User.findById(req.user._id).select('+password')

      const isMatch = await user.comparePassword(currentPassword)
      if (!isMatch) {
        return res.status(400).json({
          success: false,
          message: 'Current password is incorrect'
        })
      }

      user.password = newPassword
      await user.save()  // triggers bcrypt hash via pre-save hook

      res.json({
        success: true,
        message: 'Password updated successfully'
      })
    } catch (err) {
      next(err)
    }
  }
)

// ── DELETE /api/auth/me ─────────────────────
router.delete('/me', auth, async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.user._id)

    res.json({
      success: true,
      message: 'Account deleted successfully'
    })
  } catch (err) {
    next(err)
  }
})

// ── GET /api/auth/user/:id ──────────────────
router.get('/user/:id', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      })
    }
    res.json({
      success: true,
      user: user.toPublicJSON()
    })
  } catch (err) {
    next(err)
  }
})

module.exports = router