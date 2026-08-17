// ============================================
// PRISMA CLIENT
//
// WHAT: One shared Prisma Client instance for
//       the whole app
// WHEN: Import this anywhere you need to query
//       Postgres — never create a new PrismaClient
//       per request
// WHY:  Each PrismaClient opens its own connection
//       pool — creating many of them exhausts the
//       database's connection limit fast
//
// USAGE:
// const prisma = require('../utils/prisma')
// const tasks = await prisma.task.findMany()
// ============================================

const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

module.exports = prisma
