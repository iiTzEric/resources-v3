# What Is A Database?

**Module:** Databases
**Prerequisites:** [`07-backend`](../../07-backend) (helpful in parallel)

## What is it?

A **database** is dedicated software for storing, organizing, and retrieving data reliably and
efficiently — designed specifically to handle the concerns that a plain file (from the Fundamentals
Input/Output lesson) doesn't solve well at any real scale: concurrent access, complex querying, and
data integrity guarantees.

## Why does it matter?

Every backend route you built in the previous module needs somewhere real to persist data, that
survives server restarts, and can be queried efficiently as it grows — exactly the gap a database
fills.

## Mental Model

Think of a plain file as a single notebook — fine for one person jotting things down, but chaotic
if many people tried writing in it simultaneously, or if you needed to instantly find "every entry
mentioning oranges" without reading the whole thing. A database is like a professionally organized
filing system with a dedicated librarian: multiple people can request information at once safely,
and finding specific information efficiently is the system's whole purpose, not an afterthought.

## How does it work?

### What a database actually provides, beyond a plain file

- **Structured storage** — data organized in a predictable way (tables, or documents), not just raw
  text.
- **Efficient querying** — finding specific data quickly, even among millions of records, using
  indexes (covered in a later topic) rather than reading everything sequentially.
- **Concurrent access** — many clients (your application's many simultaneous users) reading and
  writing safely at the same time, without corrupting each other's data.
- **Data integrity guarantees** — rules ensuring data stays consistent and valid (covered in the
  Transactions & Constraints topic).

### The two major categories, previewed here

- **Relational (SQL) databases** — data organized into tables with a fixed structure (rows and
  columns), with explicit relationships between tables (PostgreSQL, MySQL).
- **NoSQL databases** — more flexible, varied structures — commonly **document databases**
  (MongoDB) storing JSON-like documents, though other NoSQL types exist too (key-value stores,
  graph databases).

Both categories are covered in genuine depth in the next topic and beyond — this lesson is just
establishing that a real, deliberate choice exists here, not that one is simply "better."

### Where a database actually lives, relative to your backend

```
Client (React) <-> Your Backend (Express) <-> Database
```

Critically: **clients never talk to a database directly.** Your backend sits in between, handling
authentication, authorization, and validation before ever touching the database — this is precisely
why everything from the Backend module (validation, auth) matters so much: the database itself
generally trusts whatever your backend sends it, so your backend is the actual gatekeeper protecting
real data integrity and security.

### Connecting this to what you've already built

If you completed the earlier MongoDB work in this curriculum's practical project sections, you've
already experienced this firsthand: your Express server connected to MongoDB via Mongoose, and data
persisted across server restarts — the exact capability a plain in-memory array could never
provide, and the concrete motivation for this entire module.

## Simple Example

A conceptual comparison of the same data, two ways:

```
Plain file approach:
users.json containing: [{"id":1,"name":"Alice"}, {"id":2,"name":"Ben"}]
- Every read/write means reading/rewriting the ENTIRE file
- No way to efficiently find "just user 500,000" without scanning everything
- Two simultaneous writes could corrupt the file

Database approach:
A users table/collection, queried directly: "find user where id = 500000"
- The database finds this efficiently, often without scanning every record
- Multiple simultaneous requests are handled safely by the database itself
```

## Let's Break It Down

- Both approaches can technically store the same data — the difference is in what happens as the
  amount of data and the number of simultaneous users grows.
- A plain file's simplicity works for genuinely small, single-user, low-concurrency scenarios (like
  a personal script) — a database becomes necessary the moment real concurrent access, real query
  complexity, or real data integrity guarantees matter.

## Common Mistakes

- **Using a plain file for genuine multi-user application data**, running into concurrency and
  performance problems as usage grows.
- **Letting a frontend client connect directly to a database**, bypassing the backend's
  authentication/authorization/validation entirely — a serious security gap.
- **Assuming one database type (relational or NoSQL) is universally "better"** without considering
  the actual shape and needs of the specific data involved.

## When Should I Use It?

Use a real database for any application with genuine multi-user access, a meaningful amount of
data, or real requirements around data integrity and complex querying — which describes the large
majority of real backend applications beyond small personal scripts.

## Exercises

1. **(Recall)** Name three things a real database provides that a plain file generally doesn't
   handle well.
2. **(Understanding)** Explain why a client should never connect directly to a database, bypassing
   the backend entirely.
3. **(Application)** Describe, in plain language, what would likely go wrong if a moderately
   popular web application tried to store all its user data in a single JSON file on disk.

## What Should I Learn Next?

Continue to [`02-relational-vs-nosql`](../02-relational-vs-nosql) — the two major categories of
databases, and the genuine tradeoffs between them.
