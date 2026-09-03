# Migrations & Backups

**Module:** Databases
**Prerequisites:** [`09-performance`](../09-performance)

## What is it?

A **migration** is a versioned, tracked change to a database's schema (adding a column, creating a
table) applied in a controlled, repeatable way. A **backup** is a saved copy of a database's actual
data, used to recover from data loss or corruption.

## Why does it matter?

A real application's data needs evolve over time — new features need new fields, existing ones need
restructuring. Doing this haphazardly (manually running ad-hoc changes against a production
database) is genuinely risky. Migrations and backups are the disciplined, professional practices
that make evolving a schema and recovering from disasters safe rather than terrifying.

## How does it work?

### The problem migrations solve

Imagine adding a new required column to a table that already has real data in production. Doing
this by hand, directly against the live database, is risky: easy to make a mistake, no clear record
of what changed and when, and no straightforward way to apply the exact same change consistently
across development, staging, and production environments.

### A migration, conceptually

```javascript
// migrations/001_add_phone_to_users.js
module.exports = {
  up: async (db) => {
    await db.collection("users").updateMany({}, { $set: { phone: null } });
  },
  down: async (db) => {
    await db.collection("users").updateMany({}, { $unset: { phone: "" } });
  }
};
```

- **`up`** — applies the change (adding the new field).
- **`down`** — reverses it, if needed (removing the field again) — genuinely useful if a migration
  turns out to have a problem and needs to be rolled back cleanly.

Migration tools (like `knex` for SQL, or various options for MongoDB) track which migrations have
already been applied to a given database, so running migrations is safe and repeatable — applying
the same set of migrations to a fresh development database produces the exact same schema as
production, and re-running already-applied migrations is a safe no-op.

### Why migrations matter specifically for a growing team

Without migrations, keeping every team member's local database, staging, and production all in sync
schema-wise relies entirely on manual discipline and memory — genuinely error-prone. Migrations,
checked into version control alongside your application code (exactly like the git practices from
earlier in this curriculum), provide an explicit, ordered, shared record of every schema change,
applied consistently everywhere.

### Backups — protecting against data loss

Even with careful migrations and constraints, real disasters happen: accidental destructive
queries (recall the "forgot the WHERE clause" mistake from the CRUD topic), hardware failure, or
genuine application bugs that corrupt data. A **backup** is a saved snapshot of your actual data,
taken regularly, that lets you restore to a known-good state if something goes seriously wrong.

```bash
# Conceptual example - actual commands vary by database
pg_dump mydatabase > backup.sql       # PostgreSQL
mongodump --db mydatabase --out ./backup  # MongoDB
```

### A backup strategy, briefly

Real production systems typically maintain automated, regular backups (daily, or more frequently
for critical data), stored separately from the primary database (so a single failure doesn't
destroy both the live data and its backups), and — crucially — **periodically tested** by actually
attempting a restore, since an untested backup that turns out to be corrupted or incomplete when
you actually need it provides false confidence, arguably worse than knowing you have no backup at
all.

## Simple Example

A realistic migration/backup workflow, described conceptually:

```
1. Developer writes a migration adding a `verified` boolean field to `users`, defaulting to false
2. Migration is committed to git, reviewed via pull request (from the Git module)
3. Migration runs automatically as part of deployment, applied consistently to every environment
4. Before any major migration runs against production, an automated backup is taken
5. If the migration causes an unexpected problem, the backup allows restoring to the pre-migration state
```

## Let's Break It Down

- Committing the migration to git (step 2) means it goes through the same review process as any
  other code change — a genuine safeguard against an untested or poorly-considered schema change
  reaching production.
- Taking a backup immediately before a migration (step 4) provides a safety net specifically for
  that risky moment, complementing (not replacing) regular scheduled backups.

## Common Mistakes

- **Making schema changes manually and inconsistently** across environments instead of using
  tracked migrations.
- **Not testing backups by actually attempting a restore**, discovering they're corrupted or
  incomplete only when genuinely needed.
- **Running migrations directly against production without first testing them** in a
  staging/development environment.

## When Should I Use It?

Use migrations for every schema change in any real, evolving application — even solo projects
benefit from having a clear, ordered, version-controlled record of changes. Set up automated,
regularly tested backups for any application holding real, meaningful data.

## Exercises

1. **(Recall)** What problem do migrations solve that manually altering a database schema doesn't?
2. **(Understanding)** Explain why an untested backup can provide false confidence.
3. **(Application)** Describe, in plain steps, the migration for adding a new `discountCode` field
   to an existing `orders` table/collection, including both the "up" and "down" direction.

## What Should I Learn Next?

Continue to [`11-sql-deep-dive`](../11-sql-deep-dive) — writing real, more complex SQL queries.
