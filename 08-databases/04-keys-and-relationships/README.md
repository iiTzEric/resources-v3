# Keys & Relationships

**Module:** Databases
**Prerequisites:** [`03-tables-and-documents`](../03-tables-and-documents)

## What is it?

A **primary key** uniquely identifies each row in a table. A **foreign key** references a primary
key in another table, formally establishing a relationship between them. These are the mechanisms
relational databases use to connect related data stored across separate tables.

## Why does it matter?

Understanding keys precisely is essential for correctly modeling any data with real relationships
— users and their orders, posts and their comments, students and their courses — which describes
the large majority of real application data.

## How does it work?

### Primary keys — uniquely identifying each row

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL
);
```

`id SERIAL PRIMARY KEY` means: `id` auto-increments (1, 2, 3...) and uniquely identifies each row —
no two rows can ever share the same `id`, and the database enforces this automatically.

### Foreign keys — referencing another table's primary key

```sql
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  total DECIMAL
);
```

`user_id INTEGER REFERENCES users(id)` establishes that every value in `orders.user_id` must
correspond to a real, existing `id` in the `users` table — the database itself enforces this
relationship, refusing to let you insert an order referencing a user that doesn't actually exist
(this specific guarantee is called **referential integrity**).

### One-to-many relationships — the most common kind

One user can have many orders; each order belongs to exactly one user. This is modeled exactly as
shown above: the foreign key lives on the "many" side (`orders.user_id`), pointing back to the
"one" side (`users.id`).

### Many-to-many relationships — requiring a join table

```sql
CREATE TABLE students (id SERIAL PRIMARY KEY, name TEXT);
CREATE TABLE courses (id SERIAL PRIMARY KEY, title TEXT);

CREATE TABLE enrollments (
  student_id INTEGER REFERENCES students(id),
  course_id INTEGER REFERENCES courses(id)
);
```

A student can take many courses, and a course can have many students — neither table can hold a
simple single foreign key to the other. A **join table** (`enrollments`) sits between them, with
one row per student-course pairing, representing the many-to-many relationship.

### Relationships in a document database — a different approach

MongoDB doesn't enforce foreign-key relationships the way relational databases do. Two common
approaches:

```javascript
// Embedding - for tightly-coupled, "belongs entirely to" relationships
{
  name: "Alice",
  orders: [{ total: 49.99 }, { total: 19.99 }]
}

// Referencing - for more independent, potentially large or shared relationships
{
  _id: "user123",
  name: "Alice"
}
{
  userId: "user123", // a plain reference, no database-enforced integrity
  total: 49.99
}
```

Referencing in MongoDB is conceptually similar to a foreign key, but **the database itself doesn't
enforce that the referenced `userId` actually exists** — that responsibility falls on your
application code, a genuine tradeoff versus relational databases' built-in enforcement.

## Simple Example

```sql
CREATE TABLE authors (
  id SERIAL PRIMARY KEY,
  name TEXT
);

CREATE TABLE books (
  id SERIAL PRIMARY KEY,
  title TEXT,
  author_id INTEGER REFERENCES authors(id)
);
```

## Let's Break It Down

- `authors.id` is the primary key, uniquely identifying each author.
- `books.author_id` is a foreign key, and the database guarantees every value in this column
  actually corresponds to a real author's `id` — attempting to insert a book with a nonexistent
  `author_id` would be rejected.
- This is a one-to-many relationship: one author can have many books; each book has exactly one
  author.

## Common Mistakes

- **Forgetting to define a primary key**, making it ambiguous how to uniquely identify or reference
  a specific row.
- **Modeling a many-to-many relationship with a single foreign key on either side**, which can't
  actually represent the "many" on both sides — a join table is required.
- **Assuming MongoDB enforces referential integrity the way relational databases do** — referenced
  ids in MongoDB can silently point to nonexistent documents unless your application explicitly
  checks.

## When Should I Use It?

Use primary/foreign keys to model any real relationship in a relational database — the specific
pattern (single foreign key vs. join table) depends on whether the relationship is one-to-many or
many-to-many. In MongoDB, choose between embedding and referencing based on how tightly coupled and
how large the related data is (covered further in Data Modeling).

## Exercises

1. **(Recall)** What's the difference between a primary key and a foreign key?
2. **(Application)** Design tables (with keys) for a many-to-many relationship between `tags` and
   `articles`, where each article can have multiple tags and each tag can apply to multiple
   articles.
3. **(Problem Solving)** A relational database rejects an attempt to insert an order with
   `user_id = 999`, when no user with that id exists. Explain exactly which mechanism is
   responsible for this rejection.

## What Should I Learn Next?

Continue to [`05-indexes`](../05-indexes) — how databases find matching data quickly, even among
millions of rows.
