// ============================================
// JWT UTILITIES
//
// WHAT: Helper functions for creating and
//       verifying JWT tokens
// WHEN: Auth routes — login, signup, verify
// ============================================

const jwt = require('jsonwebtoken')

function generateToken(payload, expiresIn = '7d') {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn })
}

function verifyToken(token) {
  return jwt.verify(token, process.env.JWT_SECRET)
}

function generateRefreshToken(payload) {
  return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
    expiresIn: '30d'
  })
}

module.exports = { generateToken, verifyToken, generateRefreshToken }