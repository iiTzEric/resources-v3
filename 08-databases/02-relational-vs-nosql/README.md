# Relational vs NoSQL

**Module:** Databases
**Prerequisites:** [`01-what-is-a-database`](../01-what-is-a-database)

## What is it?

**Relational databases** (SQL) organize data into rigid tables with predefined columns, with
explicit relationships between tables. **NoSQL databases** (commonly document databases, like
MongoDB) store more flexible, varied structures, often as JSON-like documents.

## Why does it matter?

This is one of the first genuine architectural decisions in building a real backend, and it
meaningfully affects how you model data, query it, and evolve your schema over time. Understanding
the real tradeoffs — not just "SQL is old, NoSQL is new" — leads to better decisions.

## How does it work?

### Relational — data in strict, related tables

```
users table:
| id | name  | email          |
|----|-------|----------------|
| 1  | Alice | alice@x.com    |

orders table:
| id | user_id | total |
|----|---------|-------|
| 1  | 1       | 49.99 |
```

Every row in `users` has the exact same columns. `orders.user_id` references `users.id` — an
explicit relationship (a **foreign key**, covered fully in a later topic), enforced by the database
itself.

### NoSQL (document) — flexible, self-contained documents

```javascript
{
  _id: "abc123",
  name: "Alice",
  email: "alice@x.com",
  orders: [
    { total: 49.99, items: ["Widget"] }
  ]
}
```

A single document can nest related data directly inside it — no separate `orders` table needed;
each user's orders can live embedded within their own document. Different documents in the same
collection don't need to share an identical structure — one user document could have an extra field
another doesn't.

### The genuine tradeoffs

**Relational strengths**: enforces data consistency rigorously (via schemas and constraints,
covered later); excellent for data with many, complex relationships queried in varied ways;
mature tooling for complex queries (joins across many tables).

**Relational weaknesses**: schema changes can be more involved once a table has significant data;
representing highly variable or deeply nested data can require many related tables.

**NoSQL strengths**: flexible schema, well-suited to data that's naturally hierarchical/nested or
varies in shape; often simpler to start with for rapidly evolving applications.

**NoSQL weaknesses**: less rigorous enforcement of data consistency by default (more responsibility
falls on your application code); complex relationships across many document types can become
awkward compared to relational joins.

### A concrete example of the actual decision

**E-commerce order data**: an order has a fixed, well-defined relationship to a specific customer,
specific products, and payment records — relationships that benefit from relational structure and
strict consistency (you really don't want an order that references a customer who doesn't exist).

**A blog post with comments, tags, and flexible metadata**: content that varies in shape post to
post, with data that's naturally nested (a post "contains" its comments conceptually) — often
well-suited to a document-based approach.

Neither example is a rigid rule — experienced teams build both kinds of applications successfully
with either type of database. The point is developing the judgment to reason about the actual shape
and needs of *your* specific data, rather than picking based on trend or habit.

## Simple Example

The same "team" data, modeled both ways:

```sql
-- Relational
CREATE TABLE members (id INT, name TEXT, team_id INT);
CREATE TABLE teams (id INT, name TEXT);
```

```javascript
// Document (NoSQL)
{
  name: "Engineering",
  members: [
    { name: "Alice", role: "Lead" },
    { name: "Ben", role: "Engineer" }
  ]
}
```

## Let's Break It Down

- The relational version separates members and teams into distinct tables, linked by `team_id` —
  querying "all members of team X" requires a join between the two tables.
- The document version embeds members directly inside their team's document — retrieving a team
  and all its members is a single, simple lookup, with no join needed, since the data is
  co-located.
- Both represent the exact same real-world relationship — the difference is purely in how it's
  physically organized and queried.

## Common Mistakes

- **Choosing a database type based on trend rather than the actual shape of your data** and how
  you'll realistically query it.
- **Assuming NoSQL means "no rules/structure at all"** — thoughtful document design (even in
  MongoDB) still matters greatly for a maintainable application.
- **Forcing deeply relational data into a document model without considering the resulting
  complexity**, or vice versa — forcing highly variable, nested data into a rigid relational
  schema.

## When Should I Use It?

Choose relational when data has many well-defined, strict relationships and consistency is
paramount (financial data, inventory systems). Choose document/NoSQL when data is naturally nested,
varies in shape, or your application's needs are still evolving rapidly. Many real, larger
applications reasonably use both, for different parts of their data.

## Exercises

1. **(Recall)** What's the core structural difference between how relational and document
   databases organize data?
2. **(Understanding)** Explain, using an e-commerce example, why order/payment data often favors a
   relational approach.
3. **(Application)** For a note-taking app where each note can have a completely different set of
   custom fields, which approach seems better suited, and why?

## What Should I Learn Next?

Continue to [`03-tables-and-documents`](../03-tables-and-documents) — a closer, more concrete look
at how data is actually structured within each approach.
