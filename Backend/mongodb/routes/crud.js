// ============================================
// CRUD ROUTE TEMPLATE
//
// WHAT: Complete CRUD routes for the Task model
// WHEN: Any new resource in your app
// HOW TO USE:
// 1. Copy this file
// 2. Rename to your resource (e.g. listings.js)
// 3. Update the model and fields in POST and PUT routes
// 5. Register in server.js:
//    app.use('/api/items', require('./routes/items'))
//
// ENDPOINTS:
// GET    /api/tasks           — get all (with filter)
// GET    /api/tasks/:id       — get one
// POST   /api/tasks           — create (protected)
// PUT    /api/tasks/:id       — update (protected + ownership)
// DELETE /api/tasks/:id       — delete (protected + ownership)
// ============================================

const express = require('express')
const router = express.Router()
const Task = require('../models/Task')
const { auth } = require('../middleware/auth')
const { validate, rules } = require('../middleware/validation')

function parsePagination(query) {
  const page = Number(query.page || 1)
  const limit = Number(query.limit || 20)
  if (!Number.isInteger(page) || page < 1 || !Number.isInteger(limit) || limit < 1 || limit > 100) {
    const error = new Error('Page must be a positive integer and limit must be between 1 and 100')
    error.status = 400
    throw error
  }
  return { page, limit }
}

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

// ── GET /api/tasks ─────────────────────────
router.get('/', async (req, res, next) => {
  try {
    const {
      userId,     // filter by owner id
      completed,  // filter by completion status
      search,     // text search
      sort = '-createdAt'  // sort field
    } = req.query

    // Build filter
    const filter = {}
    const { page, limit } = parsePagination(req.query)
    if (userId) filter.userId = userId
    if (completed !== undefined) filter.completed = completed === 'true'
    if (search) filter.title = { $regex: escapeRegex(search), $options: 'i' }

    // Count total for pagination
    const total = await Task.countDocuments(filter)

    // Query with pagination
    const tasks = await Task.find(filter)
      .populate('userId', 'name avatar')
      .sort(sort)
      .limit(limit)
      .skip((page - 1) * limit)

    res.json({
      success: true,
      data: tasks,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit),
        limit
      }
    })
  } catch (err) {
    next(err)
  }
})

// ── GET /api/tasks/:id ─────────────────────
router.get('/:id', async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id)
      .populate('userId', 'name avatar')

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      })
    }

    res.json({ success: true, data: task })
  } catch (err) {
    next(err)
  }
})

// ── POST /api/tasks ─────────────────────────
router.post('/',
  auth,
  validate([
    rules.required('title'),
      rules.minLength('title', 1),
      rules.maxLength('title', 200),
      rules.oneOf('priority', ['low', 'medium', 'high'])
  ]),
  async (req, res, next) => {
    try {
      const task = await Task.create({
        title: req.body.title,
        description: req.body.description,
        completed: req.body.completed,
        priority: req.body.priority,
        userId: req.user._id
      })

      await task.populate('userId', 'name avatar')

      res.status(201).json({
        success: true,
        data: task
      })
    } catch (err) {
      next(err)
    }
  }
)

// ── PUT /api/tasks/:id ──────────────────────
router.put('/:id', auth, async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id)

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      })
    }

    // Ownership check — only owner can update
    if (task.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this task'
      })
    }

    // Only update allowed fields
    const allowed = ['title', 'description', 'completed', 'priority']
    const updates = {}
    for (const field of allowed) {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field]
      }
    }

    const validationErrors = []
    if (updates.title !== undefined) {
      if (typeof updates.title !== 'string' || updates.title.trim() === '') validationErrors.push('title is required')
      else if (updates.title.length > 200) validationErrors.push('title must be at most 200 characters')
    }
    if (updates.priority !== undefined && !['low', 'medium', 'high'].includes(updates.priority)) {
      validationErrors.push('priority must be one of: low, medium, high')
    }
    if (updates.completed !== undefined && typeof updates.completed !== 'boolean') {
      validationErrors.push('completed must be a boolean')
    }
    if (validationErrors.length > 0) {
      return res.status(400).json({ success: false, message: 'Validation failed', errors: validationErrors })
    }

    Object.assign(task, updates)
    await task.save()
    await task.populate('userId', 'name avatar')

    res.json({ success: true, data: task })
  } catch (err) {
    next(err)
  }
})

// ── DELETE /api/tasks/:id ───────────────────
router.delete('/:id', auth, async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id)

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      })
    }

    // Ownership check
    if (task.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this task'
      })
    }

    await task.deleteOne()

    res.json({
      success: true,
      message: 'Task deleted successfully'
    })
  } catch (err) {
    next(err)
  }
})

module.exports = router