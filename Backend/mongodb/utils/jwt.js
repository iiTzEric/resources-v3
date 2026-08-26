// ============================================
// JWT UTILITIES
//
// WHAT: Helper functions for creating and
//       verifying JWT tokens
// WHEN: Auth routes — login, signup, verify
// ============================================

const jwt = require('jsonwebtoken')

function getSecret(name) {
  const secret = process.env[name]
  if (!secret) throw new Error(`${name} is required`)
  return secret
}

function generateToken(payload, expiresIn = '7d') {
  return jwt.sign(payload, getSecret('JWT_SECRET'), { expiresIn })
}

function verifyToken(token) {
  return jwt.verify(token, getSecret('JWT_SECRET'))
}

function generateRefreshToken(payload) {
  return jwt.sign(payload, getSecret('JWT_REFRESH_SECRET'), {
    expiresIn: '30d'
  })
}

module.exports = { generateToken, verifyToken, generateRefreshToken }