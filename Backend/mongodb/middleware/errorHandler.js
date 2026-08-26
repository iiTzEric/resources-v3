// ============================================
// GLOBAL ERROR HANDLER
//
// WHAT: Catches all unhandled errors and sends
//       consistent JSON error responses
// WHEN: Add ONCE at the bottom of server.js
//       after all routes
// WHY:  Without this — unhandled errors crash
//       the server or leak stack traces
//
// USAGE:
// // In server.js — MUST be after all routes
// const errorHandler = require('./middleware/errorHandler')
// app.use(errorHandler)
//
// // In any route — pass error to next()
// router.get('/', async (req, res, next) => {
//   try {
//     const data = await getData()
//     res.json(data)
//   } catch (err) {
//     next(err)  // goes to errorHandler
//   }
// })
//
// // Or throw directly
// if (!user) {
//   const err = new Error('User not found')
//   err.status = 404
//   throw err
// }
// ============================================

function errorHandler(err, req, res, next) {
  // Log in development
  if (process.env.NODE_ENV !== 'production') {
    console.error('\n--- ERROR ---')
    console.error(`${req.method} ${req.path}`)
    console.error(err.stack)
    console.error('-------------\n')
  } else {
    // Log minimally in production
    console.error(`${req.method} ${req.path} — ${err.message}`)
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      errors: Object.values(err.errors).map(e => ({
        field: e.path,
        message: e.message
      }))
    })
  }

  // Mongoose duplicate key (unique constraint violated)
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue || {})[0] || 'field'
    return res.status(400).json({
      success: false,
      message: `${field} already exists`
    })
  }

  // Mongoose CastError (invalid ObjectId)
  if (err.name === 'CastError') {
    return res.status(400).json({
      success: false,
      message: `Invalid ${err.path}: ${err.value}`
    })
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      success: false,
      message: 'Invalid token'
    })
  }

  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({
      success: false,
      message: 'Token expired'
    })
  }

  // Custom app errors
  if (Number.isInteger(err.status) && err.status >= 400 && err.status <= 599) {
    return res.status(err.status).json({
      success: false,
      message: err.message
    })
  }

  // Default — 500 internal server error
  res.status(500).json({
    success: false,
    message: process.env.NODE_ENV === 'production'
      ? 'Internal server error'
      : err.message
  })
}

// Helper — create app errors consistently
function createError(message, status = 400) {
  const err = new Error(message)
  err.status = status
  return err
}

module.exports = { errorHandler, createError }