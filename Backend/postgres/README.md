# Backend

Two data-layer options are covered here, as two separate, parallel tracks — pick one per project rather than mixing them.

## Files

- [`../mongodb/mongodb.md`](../mongodb/mongodb.md) — MongoDB + Mongoose (flexible, document-shaped data)
- [`Prisma-postgres.md`](./Prisma-postgres.md) — PostgreSQL + Prisma (structured, relational data)
- [`schema.prisma`](./schema.prisma) — the schema used by the PostgreSQL examples

The repository does not currently include separate Node.js or Express guides. Start with the database guide you need, and learn the basics of Express routing and middleware before using the route files.

## Code

The files under `middleware/`, `routes/`, and `utils/` are focused examples. They assume an Express app, body parsing, environment variables, and the dependencies listed in each guide.

- `middleware/auth.js` + `models/User.js` + `routes/crud.js` → the **Mongoose** track
- `middleware/auth-prisma.js` + `schema.prisma` + `utils/prisma.js` + `routes/crud-postgres.js` → the **Prisma** track

Both tracks implement the same thing (a `User` who owns many `Task`s, JWT auth, a full CRUD route) so you can compare them side by side rather than learning two unrelated examples.
