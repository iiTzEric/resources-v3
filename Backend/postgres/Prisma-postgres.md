# PostgreSQL + Prisma

See also: [`../mongodb/mongodb.md`](../mongodb/mongodb.md) — the other data-layer option in this repo. Read both before picking one for a new project; the "Which one, when" section at the bottom compares them directly.

## What PostgreSQL actually is

**What:** A relational (SQL) database — data lives in fixed tables with typed columns, and relationships between tables are enforced by the database itself via foreign keys.

**Why:** When data has a clear, fixed shape and relationships genuinely matter (a task belongs to exactly one user; deleting a user shouldn't silently orphan their tasks), the database enforcing that for you beats hoping your application code always gets it right.

**When:** Data with real structure and cross-references — users, orders, payments, permissions, anything where "this row must point to a real row over there" is a rule you don't want to be able to break.

---

## Prisma

**What:** A type-safe ORM (Object-Relational Mapper) for SQL databases. You define your schema once in a `.prisma` file, and Prisma generates a fully-typed client from it.

**Why:** Writing raw SQL works, but you lose autocomplete and get no compile-time warning when a query no longer matches your actual table shape. Prisma's generated client knows your schema, so your editor flags a typo'd field name or a wrong type before you ever run the code.

---

## Setup

```bash
cd Backend/postgres
npm install prisma @prisma/client
npx prisma init --datasource-provider postgresql
```

The checked-in examples use `Backend/postgres/schema.prisma`. From the repository root, pass that path to Prisma commands.

```
// .env — never commit this file
DATABASE_URL="postgresql://username:password@localhost:5432/taskflow"
```

---

## Schema and migrations

**What:** The schema file is the single source of truth for your database structure. A migration is a tracked, versioned change to that structure (e.g., "add a `priority` column").

**Why:** Unlike Mongoose (where the schema lives in your app code), Prisma's schema changes can be applied to the database through tracked migrations. This makes structural changes visible and reviewable, but you still need to run migrations in each environment.

**How:**

```prisma
// Backend/postgres/schema.prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id        Int      @id @default(autoincrement())
  name      String
  email     String   @unique
  password  String
  role      Role     @default(USER)
  isActive  Boolean  @default(true)
  tasks     Task[]
  createdAt DateTime @default(now())
}

model Task {
  id          Int      @id @default(autoincrement())
  title       String
  description String?
  completed   Boolean  @default(false)
  priority    Priority @default(MEDIUM)
  userId      Int
  user        User     @relation(fields: [userId], references: [id])
  createdAt   DateTime @default(now())
}

enum Role {
  USER
  ADMIN
}

enum Priority {
  LOW
  MEDIUM
  HIGH
}
```

```bash
npx prisma migrate dev --schema Backend/postgres/schema.prisma --name init   # creates the tables + a migration file, and regenerates the client
```

**Common mistake:** Editing `schema.prisma` and forgetting to run `prisma migrate dev` afterward — the database itself hasn't changed, so your app throws errors about columns that "should" exist but don't yet.

---

## The Prisma Client (connecting)

```js
// utils/prisma.js
const { PrismaClient } = require("@prisma/client");

// Reuse one instance across the whole app — don't create a new
// PrismaClient per request, it opens its own connection pool
const prisma = new PrismaClient();

module.exports = prisma;
```

---

## CRUD operations

```js
const prisma = require("../utils/prisma");

async function runExamples() {
  // Create
  const task = await prisma.task.create({
    data: { title: "Buy milk", userId: someUserId },
  });

  // Read — all, for a given user
  const tasks = await prisma.task.findMany({
    where: { userId: someUserId },
  });

  // Read — one
  const oneTask = await prisma.task.findUnique({
    where: { id: taskId },
  });

  // Read — with a filter
  const incomplete = await prisma.task.findMany({
    where: { userId: someUserId, completed: false },
  });

  // Update
  const updated = await prisma.task.update({
    where: { id: taskId },
    data: { completed: true },
  });

  // Delete
  await prisma.task.delete({ where: { id: taskId } });
}
```

**Common mistake:** Using `findUnique` on a field that isn't marked `@unique` or `@id` in the schema — Prisma will throw a type error at compile time (TypeScript) or a runtime error (JS), because it can't guarantee the query returns at most one row.

---

## Relationships (`include`)

**What:** Prisma's typed equivalent of Mongoose's `.populate()` — fetches related rows from another table in the same query.

**Why:** A task belongs to a user; you often want the user's info alongside the task without a second round-trip query.

**How:**

```js
async function loadRelationships() {
  // Fetch a task with its full user object attached
  const task = await prisma.task.findUnique({
    where: { id: taskId },
    include: { user: true },
  });
  // task.user is now the full User row, not just userId

  // Fetch a user with all their tasks
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { tasks: true },
  });
}
```

**Common mistake:** Forgetting `include` and being confused why `task.user` is `undefined` — by default Prisma only returns the columns on the row you queried, not related rows. `include` is a separate, explicit step, same as `.populate()` in Mongoose.

---

## Validation and error handling

Prisma enforces types and required fields at the schema level (a missing `title` on `Task` fails before it reaches the database), but application-level rules (password length, email format) still belong in your own validation layer — see [`./middleware/validation.js`](./middleware/validation.js).

```js
async function createTask() {
  try {
    const task = await prisma.task.create({ data: { userId: someUserId } }); // missing required title
  } catch (err) {
    if (err.code === "P2002") {
      // Prisma's code for "unique constraint violation" (e.g. duplicate email)
    }
    next(err);
  }
}
```

---

## Which one, when — Prisma/PostgreSQL vs. Mongoose/MongoDB

|                | PostgreSQL + Prisma                                                   | MongoDB + Mongoose                                                         |
| -------------- | --------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| Schema lives   | `Backend/postgres/schema.prisma` — applied through tracked migrations | A `.js` model file — enforced by Mongoose in app code, not by the database |
| Relationships  | Foreign keys, enforced by the database; `include` for typed joins     | Manual `ObjectId` references; `.populate()` to resolve them                |
| Schema changes | Require a migration (`prisma migrate dev`) — tracked, reversible      | Just edit the schema file — faster, but no safety net                      |
| Best for       | Structured data with real relationships (users, orders, payments)     | Flexible/variable-shaped data (content, logs, arbitrary fields)            |
| Type-safety    | Generated directly from your schema                                   | Only as strong as the TypeScript interfaces you write yourself             |

**Rule of thumb:** if you can sketch your data as tables with clear relationships before writing any code, use Prisma/PostgreSQL. If your data's shape varies record-to-record or you're not sure of it yet, use Mongoose/MongoDB.
