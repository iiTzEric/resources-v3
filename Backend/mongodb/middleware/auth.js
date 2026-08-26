// ============================================
// AUTH MIDDLEWARE
//
// WHAT: Verifies JWT token on every protected
//       route — blocks unauthorized requests
// WHEN: Add to any route that requires login
// WHY:  Frontend protection can be bypassed —
//       backend must always verify independently
//
// USAGE:
// const auth = require('../middleware/auth')
//
// // Protect single route
// router.get('/profile', auth, (req, res) => {
//   res.json(req.user)  // user available here
// })
//
// // Protect all routes in a file
// router.use(auth)
//
// // Optional auth — user may or may not be logged in
// router.get('/posts', optionalAuth, (req, res) => {
//   if (req.user) { /* logged in */ }
//   else { /* not logged in */ }
// })
// ============================================

const jwt = require('jsonwebtoken')
const User = require('../models/User')

// Required auth — user must be logged in
const auth = async (req, res, next) => {
  try {
    // Get token from authorization header
    const authorization = req.header('Authorization')
    if (!authorization || !authorization.startsWith('Bearer ')) {
      throw new Error()
    }
    const token = authorization.slice('Bearer '.length)
    if (!token) throw new Error()
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    // Find user by ID and ensure token is still valid
    const user = await User.findOne({ _id: decoded.id, isActive: true })
    if (!user) {
      throw new Error()
    }
    // Attach user and token to request object for downstream use
    req.user = user
    req.token = token
    next()
  } catch (err) {
    res.status(401).json({ error: 'Please authenticate.' })
  }
}

// Optional auth — user may or may not be logged in
const optionalAuth = async (req, res, next) => {
  try {
    const authorization = req.header('Authorization')
    if (!authorization || !authorization.startsWith('Bearer ')) return next()
    const token = authorization.slice('Bearer '.length)
    if (!token) return next()
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findOne({ _id: decoded.id, isActive: true })
    if (user) {
      req.user = user
      req.token = token
    }
  } catch (err) {
    // No action needed — user is not logged in
  }
  next()
}

// Role-based access control — restrict access to certain roles
function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Not authenticated'
      })
    }
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Requires role: ${roles.join(' or ')}`
      })
    }
    next()
  }
}

module.exports = { auth, optionalAuth, requireRole }