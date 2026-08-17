// ============================================
// AUTH MIDDLEWARE (Prisma / Postgres version)
//
// WHAT: Verifies JWT token on every protected
//       route — blocks unauthorized requests
// WHEN: Add to any route that requires login,
//       in a project using Prisma/Postgres
// WHY:  Frontend protection can be bypassed —
//       backend must always verify independently
//
// DIFFERENCE FROM middleware/auth.js:
// The Mongoose version checks the token against
// a `tokens` array stored on the user document.
// This version just verifies the JWT signature
// and looks the user up by id — simpler, but it
// means a token stays valid until it expires,
// even after "logout" (no server-side token list
// to invalidate against). Fine for most small
// apps; add a token blocklist/table later if you
// need immediate server-side logout.
//
// USAGE:
// const auth = require('../middleware/auth-prisma')
//
// router.get('/profile', auth, (req, res) => {
//   res.json(req.user)  // user available here
// })
// ============================================

const { verifyToken } = require('../utils/jwt')
const prisma = require('../utils/prisma')

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '')
    const decoded = verifyToken(token)

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: { id: true, name: true, email: true, role: true } // never select password
    })

    if (!user) {
      throw new Error()
    }

    req.user = user
    next()
  } catch (err) {
    res.status(401).json({ success: false, message: 'Please authenticate.' })
  }
}

module.exports = { auth }
