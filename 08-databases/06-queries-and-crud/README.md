# Queries & CRUD

**Module:** Databases
**Prerequisites:** [`05-indexes`](../05-indexes)

## What is it?

**CRUD** — Create, Read, Update, Delete — represents the four fundamental operations virtually
every application performs against its data. This topic covers these operations concretely in both
SQL and MongoDB, side by side.

## Why does it matter?

Every backend route you build ultimately performs one of these four operations against your
database. Fluency with both SQL and MongoDB's query syntax — and recognizing they map onto the same
underlying CRUD concepts — makes you comfortable working with either.

## How does it work?

### Create

```sql
INSERT INTO users (name, email) VALUES ('Alice', 'alice@x.com');
```

```javascript
await User.create({ name: "Alice", email: "alice@x.com" });
```

### Read

```sql
SELECT * FROM users;                          -- all users
SELECT * FROM users WHERE id = 5;              -- one specific user
SELECT name, email FROM users WHERE age > 18;   -- specific columns, filtered
```

```javascript
await User.find();                     // all users
await User.findById(5);                 // one specific user
await User.find({ age: { $gt: 18 } });    // filtered
```

### Update

```sql
UPDATE users SET email = 'new@x.com' WHERE id = 5;
```

```javascript
await User.findByIdAndUpdate(5, { email: "new@x.com" });
```

### Delete

```sql
DELETE FROM users WHERE id = 5;
```

```javascript
await User.findByIdAndDelete(5);
```

### Filtering with `WHERE` (SQL) and query objects (MongoDB)

```sql
SELECT * FROM products WHERE category = 'Electronics' AND price < 100;
```

```javascript
await Product.find({ category: "Electronics", price: { $lt: 100 } });
```

Both filter on multiple conditions simultaneously — SQL's `WHERE` clause combines conditions with
`AND`/`OR`; MongoDB's query object achieves the same by combining multiple fields (implicitly
`AND`ed together) with operators like `$lt` (less than), `$gt` (greater than), `$in`, and others.

### Sorting and limiting

```sql
SELECT * FROM products ORDER BY price DESC LIMIT 10;
```

```javascript
await Product.find().sort({ price: -1 }).limit(10);
```

### Joins (SQL) vs. population (MongoDB)

```sql
SELECT orders.id, users.name
FROM orders
JOIN users ON orders.user_id = users.id;
```

A **join** combines rows from two related tables into one result set, based on their key
relationship. MongoDB's closer equivalent, when using references (from the Keys & Relationships
topic), is **population**:

```javascript
await Order.find().populate("userId"); // replaces the raw userId reference with the actual user document
```

## Simple Example

```javascript
// Find all orders over $50, sorted by date, newest first, limited to 5
await Order.find({ total: { $gt: 50 } })
  .sort({ createdAt: -1 })
  .limit(5);
```

```sql
SELECT * FROM orders WHERE total > 50 ORDER BY created_at DESC LIMIT 5;
```

## Let's Break It Down

- Both versions express the exact same query: filter, sort, limit — different syntax, identical
  underlying intent.
- `.find()` in MongoDB (Mongoose) returns a query you can chain further methods onto (`.sort()`,
  `.limit()`) before it actually executes — this chaining pattern should feel familiar from your
  JavaScript array methods, even though it's operating on a database query rather than an in-memory
  array.

## Common Mistakes

- **Forgetting `WHERE`/a filter entirely** on an `UPDATE` or `DELETE` — this affects *every* row in
  the table, a genuinely serious, common, and often catastrophic mistake.
- **Confusing MongoDB's query operators** (`$gt`, `$lt`, `$in`) with plain JavaScript comparison
  operators — they look different because they're a different syntax specifically for
  database queries, not regular JS expressions.
- **Not understanding what a join/population actually does**, leading to confusion about why a
  query "isn't returning the related data" without it.

## When Should I Use It?

Use these four operations as the foundation for essentially every database interaction your backend
performs — always double-check filters on `UPDATE`/`DELETE` operations specifically, given the real
risk of an unintentionally broad, destructive change.

## Exercises

1. **(Recall)** What does CRUD stand for, and what's the SQL keyword for each operation?
2. **(Application)** Write both a SQL query and a MongoDB/Mongoose query to find all products
   priced under $20, sorted by name.
3. **(Problem Solving)** A developer runs `DELETE FROM orders;` (no `WHERE` clause) intending to
   delete just one specific order. Explain what actually happens, and how a `WHERE` clause would
   have prevented it.

## What Should I Learn Next?

Continue to
[`07-transactions-and-constraints`](../07-transactions-and-constraints) — ensuring data stays
consistent and valid, especially across multiple related operations.
