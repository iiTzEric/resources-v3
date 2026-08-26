// ============================================
// CRUD ROUTE TEMPLATE (Prisma / Postgres version)
//
// WHAT: Complete CRUD routes for the Task model,
//       using Prisma instead of Mongoose
// WHEN: Any new resource in a Prisma/Postgres project
// HOW TO USE:
// 1. Copy this file
// 2. Rename to your resource (e.g. tasks.js)
// 3. Add/adjust the matching model in schema.prisma
// 4. Register in server.js:
//    app.use('/api/tasks', require('./routes/tasks'))
//
// ENDPOINTS:
// GET    /api/tasks           — get all (with filter)
// GET    /api/tasks/:id       — get one
// POST   /api/tasks           — create (protected)
// PUT    /api/tasks/:id       — update (protected + ownership)
// DELETE /api/tasks/:id       — delete (protected + ownership)
//
// DIFFERENCE FROM routes/crud.js:
// Same shape and behavior as the Mongoose version,
// but using prisma.task.* calls instead of Item.*,
// and integer ids (from Postgres) instead of
// MongoDB ObjectIds.
// ============================================

const express = require('express')
const router = express.Router()
const prisma = require('../utils/prisma')
const { auth } = require('../middleware/auth-prisma')
const { validateTask } = require('../middleware/validation')

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

function parseId(value, name) {
  const id = Number(value)
  if (!Number.isInteger(id) || id < 1) {
    const error = new Error(`${name} must be a positive integer`)
    error.status = 400
    throw error
  }
  return id
}

// ── GET /api/tasks ──────────────────────────
router.get('/', async (req, res, next) => {
  try {
    const {
      userId,       // filter by owner id
      completed,    // filter by completion status
      page = 1,     // pagination
      limit = 20    // items per page
    } = req.query

    const pagination = parsePagination({ page, limit })
    const where = {}
    if (userId) where.userId = parseId(userId, 'userId')
    if (completed !== undefined) {
      if (completed !== 'true' && completed !== 'false') {
        const error = new Error('completed must be true or false')
        error.status = 400
        throw error
      }
      where.completed = completed === 'true'
    }

    const [total, tasks] = await Promise.all([
      prisma.task.count({ where }),
      prisma.task.findMany({
        where,
        include: { user: { select: { name: true } } },
        orderBy: { createdAt: 'desc' },
        take: pagination.limit,
        skip: (pagination.page - 1) * pagination.limit
      })
    ])

    res.json({
      success: true,
      data: tasks,
      pagination: {
        total,
        page: pagination.page,
        pages: Math.ceil(total / pagination.limit),
        limit: pagination.limit
      }
    })
  } catch (err) {
    next(err)
  }
})

// ── GET /api/tasks/:id ──────────────────────
router.get('/:id', async (req, res, next) => {
  try {
    const taskId = parseId(req.params.id, 'id')
    const task = await prisma.task.findUnique({
      where: { id: taskId },
      include: { user: { select: { name: true } } }
    })

    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found' })
    }

    res.json({ success: true, data: task })
  } catch (err) {
    next(err)
  }
})

// ── POST /api/tasks ─────────────────────────
router.post('/', auth, validateTask, async (req, res, next) => {
  try {
    // ── Pick allowed fields — never trust the whole body ──
    const task = await prisma.task.create({
      data: {
        title: req.body.title,
        description: req.body.description,
        priority: req.body.priority,
        userId: req.user.id   // always from the token — never from the body
      },
      include: { user: { select: { name: true } } }
    })

    res.status(201).json({ success: true, data: task })
  } catch (err) {
    next(err)
  }
})

// ── PUT /api/tasks/:id ──────────────────────
router.put('/:id', auth, validateTask, async (req, res, next) => {
  try {
    const taskId = parseId(req.params.id, 'id')
    const existing = await prisma.task.findUnique({
      where: { id: taskId }
    })

    if (!existing) {
      return res.status(404).json({ success: false, message: 'Task not found' })
    }

    // Ownership check — only the owner can update
    if (existing.userId !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Not authorized to update this task' })
    }

    // Only update allowed fields
    const allowed = ['title', 'description', 'priority', 'completed']
    const data = {}
    for (const field of allowed) {
      if (req.body[field] !== undefined) data[field] = req.body[field]
    }

    const task = await prisma.task.update({
      where: { id: taskId },
      data,
      include: { user: { select: { name: true } } }
    })

    res.json({ success: true, data: task })
  } catch (err) {
    next(err)
  }
})

// ── DELETE /api/tasks/:id ───────────────────
router.delete('/:id', auth, async (req, res, next) => {
  try {
    const taskId = parseId(req.params.id, 'id')
    const existing = await prisma.task.findUnique({
      where: { id: taskId }
    })

    if (!existing) {
      return res.status(404).json({ success: false, message: 'Task not found' })
    }

    // Ownership check
    if (existing.userId !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Not authorized to delete this task' })
    }

    await prisma.task.delete({ where: { id: taskId } })

    res.json({ success: true, message: 'Task deleted successfully' })
  } catch (err) {
    next(err)
  }
})

module.exports = router
