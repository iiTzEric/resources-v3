// ============================================
// CRUD ROUTE TEMPLATE
//
// WHAT: Complete CRUD routes for any resource
// WHEN: Any new resource in your app
// HOW TO USE:
// 1. Copy this file
// 2. Rename to your resource (e.g. listings.js)
// 3. Replace 'Item' with your model name
// 4. Replace fields in POST and PUT routes
// 5. Register in server.js:
//    app.use('/api/items', require('./routes/items'))
//
// ENDPOINTS:
// GET    /api/items           — get all (with filter)
// GET    /api/items/:id       — get one
// POST   /api/items           — create (protected)
// PUT    /api/items/:id       — update (protected + ownership)
// DELETE /api/items/:id       — delete (protected + ownership)
// ============================================

const express = require('express')
const router = express.Router()
const Item = require('../models/Item')
const { auth } = require('../middleware/auth')
const { validate, rules } = require('../middleware/validate')

// ── GET /api/items ──────────────────────────
router.get('/', async (req, res, next) => {
  try {
    const {
      owner,      // filter by owner id
      category,   // filter by category
      search,     // text search
      page = 1,   // pagination
      limit = 20, // items per page
      sort = '-createdAt'  // sort field
    } = req.query

    // Build filter
    const filter = {}
    if (owner) filter.owner = owner
    if (category) filter.category = category
    if (search) filter.$text = { $search: search }

    // Count total for pagination
    const total = await Item.countDocuments(filter)

    // Query with pagination
    const items = await Item.find(filter)
      .populate('owner', 'name avatar')
      .sort(sort)
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit))

    res.json({
      success: true,
      data: items,
      pagination: {
        total,
        page: Number(page),
        pages: Math.ceil(total / limit),
        limit: Number(limit)
      }
    })
  } catch (err) {
    next(err)
  }
})

// ── GET /api/items/:id ──────────────────────
router.get('/:id', async (req, res, next) => {
  try {
    const item = await Item.findById(req.params.id)
      .populate('owner', 'name avatar')

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item not found'
      })
    }

    res.json({ success: true, data: item })
  } catch (err) {
    next(err)
  }
})

// ── POST /api/items ─────────────────────────
router.post('/',
  auth,
  validate([
    rules.required('title'),
    rules.required('description'),
    rules.required('category'),
    rules.oneOf('category', ['Tech', 'Music', 'Art', 'Cooking', 'Fitness', 'Language'])
  ]),
  async (req, res, next) => {
    try {
      // ── Pick allowed fields ──────────────
      const item = await Item.create({
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
        tags: req.body.tags,
        price: req.body.price,
        owner: req.user._id   // always from token — never trust body
      })

      await item.populate('owner', 'name avatar')

      res.status(201).json({
        success: true,
        data: item
      })
    } catch (err) {
      next(err)
    }
  }
)

// ── PUT /api/items/:id ──────────────────────
router.put('/:id', auth, async (req, res, next) => {
  try {
    const item = await Item.findById(req.params.id)

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item not found'
      })
    }

    // Ownership check — only owner can update
    if (item.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this item'
      })
    }

    // Only update allowed fields
    const allowed = ['title', 'description', 'category', 'tags', 'price', 'isPublished']
    for (const field of allowed) {
      if (req.body[field] !== undefined) {
        item[field] = req.body[field]
      }
    }

    await item.save()
    await item.populate('owner', 'name avatar')

    res.json({ success: true, data: item })
  } catch (err) {
    next(err)
  }
})

// ── DELETE /api/items/:id ───────────────────
router.delete('/:id', auth, async (req, res, next) => {
  try {
    const item = await Item.findById(req.params.id)

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item not found'
      })
    }

    // Ownership check
    if (item.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this item'
      })
    }

    await item.deleteOne()

    res.json({
      success: true,
      message: 'Item deleted successfully'
    })
  } catch (err) {
    next(err)
  }
})

module.exports = router