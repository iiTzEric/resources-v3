// ============================================
// REQUEST VALIDATION MIDDLEWARE
//
// WHAT: Validates request body fields before
//       they reach the route handler
// WHEN: Any route that accepts user input
// WHY:  Catch bad data early — before it hits
//       the database or causes errors
//
// USAGE:
// const { validate, rules } = require('./middleware/validation')
//
// router.post('/signup',
//   validate([
//     rules.required('name'),
//     rules.required('email'),
//     rules.email('email'),
//     rules.minLength('password', 8),
//   ]),
//   handleSignup
// )
//
// router.post('/listing',
//   validate([
//     rules.required('title'),
//     rules.maxLength('title', 100),
//     rules.required('category'),
//     rules.oneOf('category', ['Tech', 'Music', 'Art']),
//   ]),
//   handleCreateListing
// )
// ============================================

// Main validate middleware — takes array of rules
function validate(validations) {
  return (req, res, next) => {
    const errors = []

    for (const validation of validations) {
      const error = validation(req.body)
      if (error) errors.push(error)
    }

    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors
      })
    }

    next()
  }
}

// Validation rules — each returns null (pass) or error string (fail)
const rules = {
  // Field is required and not empty
  required(field) {
    return (body) => {
      const value = body[field]
      if (value === undefined || value === null || (typeof value === 'string' && value.trim() === '')) {
        return `${field} is required`
      }
      return null
    }
  },

  // Must be valid email
  email(field) {
    return (body) => {
      const value = body[field]
      if (!value) return null  // use required() separately
      if (typeof value !== 'string') return `${field} must be a valid email`
      const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
      return valid ? null : `${field} must be a valid email`
    }
  },

  // Minimum string length
  minLength(field, min) {
    return (body) => {
      const value = body[field]
      if (!value) return null
      if (typeof value !== 'string') return `${field} must be at least ${min} characters`
      return value.length >= min
        ? null
        : `${field} must be at least ${min} characters`
    }
  },

  // Maximum string length
  maxLength(field, max) {
    return (body) => {
      const value = body[field]
      if (!value) return null
      if (typeof value !== 'string') return `${field} must be at most ${max} characters`
      return value.length <= max
        ? null
        : `${field} must be at most ${max} characters`
    }
  },

  // Must be one of allowed values
  oneOf(field, allowed) {
    return (body) => {
      const value = body[field]
      if (!value) return null
      return allowed.includes(value)
        ? null
        : `${field} must be one of: ${allowed.join(', ')}`
    }
  },

  // Must be a number
  number(field) {
    return (body) => {
      const value = body[field]
      if (value === undefined || value === null) return null
      if (typeof value === 'string' && value.trim() === '') return `${field} must be a number`
      return Number.isFinite(Number(value))
        ? null
        : `${field} must be a number`
    }
  },

  // Number must be in range
  range(field, min, max) {
    return (body) => {
      const value = Number(body[field])
      if (!Number.isFinite(value)) return null
      return value >= min && value <= max
        ? null
        : `${field} must be between ${min} and ${max}`
    }
  },

  // Must be an array
  array(field) {
    return (body) => {
      const value = body[field]
      if (!value) return null
      return Array.isArray(value)
        ? null
        : `${field} must be an array`
    }
  },

  // Array must not be empty
  nonEmptyArray(field) {
    return (body) => {
      const value = body[field]
      if (!value) return null
      return Array.isArray(value) && value.length > 0
        ? null
        : `${field} must be a non-empty array`
    }
  },

  // Must match regex
  matches(field, regex, message) {
    return (body) => {
      const value = body[field]
      if (!value) return null
      if (typeof value !== 'string') return `${field} format is invalid`
      return regex.test(value)
        ? null
        : message || `${field} format is invalid`
    }
  },

  // Custom rule
  custom(field, fn, message) {
    return (body) => {
      const value = body[field]
      return fn(value, body) ? null : message || `${field} is invalid`
    }
  }
}

module.exports = { validate, rules }