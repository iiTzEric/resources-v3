# Databases

**Prerequisites:** 07-backend (helpful in parallel)

Databases taught conceptually first — what they are and why you'd choose one kind over another — then concretely in SQL and MongoDB.

## Topics In This Module

- [`01-what-is-a-database/`](./01-what-is-a-database) — **What Is A Database?**: Why applications need persistent storage, and what a database actually provides.
- [`02-relational-vs-nosql/`](./02-relational-vs-nosql) — **Relational vs NoSQL**: Tables vs documents, and the real tradeoffs between the two models.
- [`03-tables-and-documents/`](./03-tables-and-documents) — **Tables & Documents**: Rows/columns vs flexible documents, and how each represents data.
- [`04-keys-and-relationships/`](./04-keys-and-relationships) — **Keys & Relationships**: Primary keys, foreign keys, and modeling relationships between data.
- [`05-indexes/`](./05-indexes) — **Indexes**: How databases find data fast, and the cost/benefit of indexing.
- [`06-queries-and-crud/`](./06-queries-and-crud) — **Queries & CRUD**: Create, Read, Update, Delete — the four operations every app relies on.
- [`07-transactions-and-constraints/`](./07-transactions-and-constraints) — **Transactions & Constraints**: Ensuring data integrity, atomicity, and enforcing rules at the database level.
- [`08-normalization-and-data-modeling/`](./08-normalization-and-data-modeling) — **Normalization & Data Modeling**: Structuring data to avoid duplication and inconsistency — and when to break the rules.
- [`09-performance/`](./09-performance) — **Query Performance**: Why some queries are slow, the N+1 problem, and how to reason about it.
- [`10-migrations-and-backups/`](./10-migrations-and-backups) — **Migrations & Backups**: Evolving a schema safely over time, and not losing data.
- [`11-sql-deep-dive/`](./11-sql-deep-dive) — **SQL Deep Dive**: SELECT/JOIN/WHERE/GROUP BY and writing real, non-trivial queries.
- [`12-mongodb-deep-dive/`](./12-mongodb-deep-dive) — **MongoDB Deep Dive**: Schemas with Mongoose, embedding vs referencing, and MongoDB-specific querying.

> Each topic folder contains a `README.md` lesson. Work through them in order — later topics assume earlier ones.