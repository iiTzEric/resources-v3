function validateTask(req, res, next) {
  const { title, description, priority, completed } = req.body
  const errors = []

  if (req.method !== 'PUT' && (title === undefined || typeof title !== 'string' || title.trim() === '')) {
    errors.push('title is required')
  } else if (title !== undefined && (typeof title !== 'string' || title.length > 200)) {
    errors.push('title must be at most 200 characters')
  }

  if (description !== undefined && description !== null && (typeof description !== 'string' || description.length > 2000)) {
    errors.push('description must be a string of at most 2000 characters')
  }

  if (priority !== undefined && !['LOW', 'MEDIUM', 'HIGH'].includes(priority)) {
    errors.push('priority must be one of: LOW, MEDIUM, HIGH')
  }

  if (completed !== undefined && typeof completed !== 'boolean') {
    errors.push('completed must be a boolean')
  }

  if (errors.length > 0) {
    return res.status(400).json({ success: false, message: 'Validation failed', errors })
  }

  next()
}

module.exports = { validateTask }
