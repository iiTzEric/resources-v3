// ============================================
// RATE LIMITER
//
// WHAT: Limits how many requests a client can
//       make in a given time window
// WHEN: All public APIs — especially auth routes
// WHY:  Prevents brute force attacks, abuse,
//       and protects server from overload
//
// USAGE:
// const { globalLimiter, authLimiter } = require('./middleware/rateLimiter')
//
// // Apply to all routes
// app.use(globalLimiter)
//
// // Stricter limit for auth routes
// router.post('/login', authLimiter, handleLogin)
// router.post('/signup', authLimiter, handleSignup)
//
// REQUIRES:
// npm install express-rate-limit
// ============================================

const rateLimit = require('express-rate-limit')

// General API limit — 100 requests per 15 minutes
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,  // 15 minutes
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many requests — please try again later'
  }
})

// Auth limit — 10 attempts per 15 minutes
// Prevents brute force on login
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many login attempts — please try again in 15 minutes'
  },
  skipSuccessfulRequests: true  // don't count successful logins
})

// Strict limit — 5 per hour (password reset, etc)
const strictLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,  // 1 hour
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many attempts — please try again in an hour'
  }
})

// Create custom limiter
function createLimiter(max, windowMinutes = 15) {
  return rateLimit({
    windowMs: windowMinutes * 60 * 1000,
    max,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
      success: false,
      message: 'Too many requests — please try again later'
    }
  })
}

module.exports = { globalLimiter, authLimiter, strictLimiter, createLimiter }