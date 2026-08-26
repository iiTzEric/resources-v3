const jwt = require('jsonwebtoken')

function getSecret() {
  if (!process.env.JWT_SECRET) throw new Error('JWT_SECRET is required')
  return process.env.JWT_SECRET
}

function generateToken(payload, expiresIn = '7d') {
  return jwt.sign(payload, getSecret(), { expiresIn })
}

function verifyToken(token) {
  return jwt.verify(token, getSecret())
}

module.exports = { generateToken, verifyToken }
