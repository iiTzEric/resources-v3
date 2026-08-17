# Backend

Two data-layer options are covered here, as two separate, parallel tracks — pick one per project rather than mixing them.

## Files

- [`node.md`](./node.md) — the JS runtime everything else sits on top of
- [`express.md`](./express.md) — routing, middleware, error handling
- [`mongodb.md`](./mongodb.md) — MongoDB + Mongoose (flexible, document-shaped data)
- [`prisma-postgres.md`](./prisma-postgres.md) — PostgreSQL + Prisma (structured, relational data)

**New to backend dev?** Read `node.md` → `express.md` first — those apply regardless of which database you pick. Then read `mongodb.md` and `prisma-postgres.md` and use the comparison table at the bottom of `prisma-postgres.md` to decide which fits your project.

## Code

Everything under `middleware/`, `models/`, `routes/`, and `utils/` is a working example, not pseudocode — copy, rename, and adapt.

- `middleware/auth.js` + `models/User.js` + `routes/crud.js` → the **Mongoose** track
- `middleware/auth-prisma.js` + `prisma/schema.prisma` + `utils/prisma.js` + `routes/crud-postgres.js` → the **Prisma** track

Both tracks implement the same thing (a `User` who owns many `Task`s, JWT auth, a full CRUD route) so you can compare them side by side rather than learning two unrelated examples.