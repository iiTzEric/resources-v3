# Indexes

**Module:** Databases
**Prerequisites:** [`04-keys-and-relationships`](../04-keys-and-relationships)

## What is it?

An **index** is a separate data structure a database maintains to find matching rows/documents
quickly, without scanning every single record — directly analogous to a book's index, letting you
jump straight to relevant pages instead of reading the entire book to find a topic.

## Why does it matter?

Without appropriate indexes, queries against a large table/collection require checking every single
record — this connects directly back to the Fundamentals Algorithms & Complexity lesson: an
unindexed search is roughly O(n), scaling linearly (and eventually painfully) with data size, while
a well-indexed search can be dramatically faster, closer to O(log n) in many common cases.

## Mental Model

Recall the phone book analogy from Fundamentals: finding a name by flipping through every single
page is O(n); using the book's inherent alphabetical order to jump straight to roughly the right
section is O(log n). An index is the database's equivalent of that alphabetical ordering — a
pre-built shortcut for finding matching data quickly, specifically for the columns/fields it
covers.

## How does it work?

### Creating an index

```sql
CREATE INDEX idx_users_email ON users(email);
```

This tells the database to maintain a fast lookup structure specifically for the `email` column —
queries filtering or searching by `email` can now use this index instead of scanning the entire
table.

```javascript
// MongoDB equivalent
db.users.createIndex({ email: 1 });
```

### Primary keys are automatically indexed

Most databases automatically create an index on a table's primary key, since looking up a specific
record by its unique id is such a fundamental, common operation.

### The genuine tradeoff: indexes aren't free

Indexes speed up **reads** (queries filtering/sorting by the indexed column), but they add overhead
to **writes** (every insert/update/delete must also update the index itself) and consume additional
storage. This is a real tradeoff, not a pure win — indexing every single column "just in case" is
not automatically the right choice.

### Deciding what to index

Good candidates for indexing: columns frequently used in `WHERE` clauses (filtering), columns used
for sorting, and foreign keys (since they're commonly joined on). Poor candidates: columns rarely
queried directly, or tables that are written to far more often than they're read from, where the
write overhead would outweigh the read benefit.

### Composite indexes — covering multiple columns together

```sql
CREATE INDEX idx_orders_user_status ON orders(user_id, status);
```

A composite index covers queries filtering on *both* `user_id` and `status` together efficiently —
genuinely useful when your application commonly queries by that specific combination, though it's
less helpful for queries filtering on `status` alone without also filtering on `user_id`.

### Observing the real effect of an index

```sql
EXPLAIN SELECT * FROM users WHERE email = 'alice@example.com';
```

`EXPLAIN` (available in most relational databases, with equivalents in MongoDB) shows the actual
strategy the database plans to use for a given query — revealing whether it's using an available
index efficiently, or falling back to a full table scan, which is genuinely useful for diagnosing
real, slow queries rather than guessing.

## Simple Example

Conceptually, the practical difference an index makes:

```
Without an index on `email`:
"Find the user with email = 'alice@x.com'" -> check every single row until found (or reach the end)

With an index on `email`:
"Find the user with email = 'alice@x.com'" -> use the index's fast lookup structure directly,
typically far fewer actual comparisons needed, especially as the table grows large
```

## Let's Break It Down

- The *query itself* (`WHERE email = '...'`) doesn't change at all whether or not an index exists —
  the difference is entirely in *how* the database internally finds matching rows.
- This is exactly why indexing is often described as a performance concern separate from
  correctness: an unindexed query still returns the correct result, just potentially far more
  slowly as the table grows.

## Common Mistakes

- **Not indexing columns that are frequently queried/filtered on**, leading to genuinely slow
  queries as data grows, even though the query logic itself is correct.
- **Indexing every column indiscriately**, adding unnecessary write overhead and storage cost for
  columns that are rarely, if ever, queried directly.
- **Assuming an index automatically helps every possible query** — a composite index on `(a, b)`
  doesn't necessarily help a query filtering only on `b` alone, depending on the specific database's
  indexing behavior.

## When Should I Use It?

Add indexes to columns you know will be frequently filtered, sorted, or joined on — informed by
your application's actual, real query patterns, not applied blindly to every column. Use
`EXPLAIN` (or the equivalent) to diagnose genuinely slow queries before deciding what to index.

## Exercises

1. **(Recall)** What's the fundamental tradeoff an index introduces — what does it speed up, and
   what does it add overhead to?
2. **(Understanding)** Using the phone book analogy, explain why an indexed lookup can be
   dramatically faster than an unindexed one as a table grows large.
3. **(Application)** For a `products` table frequently queried by `category` and sorted by `price`,
   what index(es) might be worth adding?

## What Should I Learn Next?

Continue to [`06-queries-and-crud`](../06-queries-and-crud) — the actual operations (Create, Read,
Update, Delete) every application performs against its data.
