# Backend Guide

This folder contains two interchangeable database tracks for an Express API. Choose one track for a project; do not register both route sets against the same resource unless you intentionally support both databases.

## Start here

1. Read [Node.js and Express](./node-express.md).
2. Choose [MongoDB + Mongoose](./mongodb/mongodb.md) or [PostgreSQL + Prisma](./postgres/Prisma-postgres.md).
3. Copy the matching server example and create a `.env` file from `.env.example`.
4. Run the database setup command, then start the server.
5. Connect a frontend using the API client in `../Frontend/api-client.js`.
6. Run `npm test` to check the validation helpers before adding a database integration test.

From `Backend/`, install dependencies with `npm install`. The MongoDB server listens on `PORT` and uses `MONGO_URI`; the PostgreSQL server uses `DATABASE_URL` and the Prisma schema at `postgres/schema.prisma`.

## Shared concepts

- The server parses JSON request bodies before routes read `req.body`.
- Authentication verifies a signed JWT on the server; hiding a page in the frontend is not authorization.
- Create and update routes validate input and only copy allowed fields.
- Ownership checks compare the authenticated user's ID with the resource owner.
- The error handler must be registered after all routes.

These examples are educational starting points. Add tests, HTTPS, secret management, database backups, structured logging, and deployment-specific configuration before production use.

The frontend track in `../Frontend/` explains browser JavaScript, HTML/CSS, HTTP, API state, authentication, and CORS in the order needed to consume these routes.
