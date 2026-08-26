// ============================================
// RESPONSE HELPERS
//
// WHAT: Consistent response format helpers
// WHEN: Any route handler
// WHY:  One place to define response structure
//
// USAGE:
// const { success, error, paginated } = require('../utils/response')
//
// res.json(success(data))
// res.status(404).json(error('Not found', 404))
// res.json(paginated(items, total, page, limit))
// ============================================

const success = (data, message = 'Success') => ({
  success: true,
  message,
  data
})

const error = (message = 'Error', status = 400) => ({
  success: false,
  message,
  status
})

const paginated = (data, total, page, limit) => ({
  success: true,
  data,
  pagination: {
    total,
    page,
    pages: Math.ceil(total / limit),
    limit
  }
})

module.exports = { success, error, paginated }