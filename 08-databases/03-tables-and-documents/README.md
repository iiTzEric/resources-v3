# Tables & Documents

**Module:** Databases
**Prerequisites:** [`02-relational-vs-nosql`](../02-relational-vs-nosql)

## What is it?

This topic looks closer at the actual structural units each database type uses: **tables** (rows
and columns) in relational databases, and **documents** (JSON-like structures) in document
databases like MongoDB — the concrete building blocks you'll actually work with.

## Why does it matter?

Understanding these units precisely — what a row/column actually is, what a document actually
looks like — is necessary before you can meaningfully define schemas, write queries, or reason
about performance in either system.

## How does it work?

### Tables — rows and columns

```
products table:
| id | name    | price | category    |
|----|---------|-------|-------------|
| 1  | Widget  | 9.99  | Hardware    |
| 2  | Gadget  | 19.99 | Electronics |
```

- Each **row** represents one record (one product).
- Each **column** represents one attribute, shared by every row in the table (every product has a
  `name`, `price`, `category` — the *structure* is fixed, even though the specific values differ).
- A table's structure (its columns and their types) is defined upfront, via a **schema** — adding a
  genuinely new column later affects every existing row (typically given a default or `null` value
  for that new column).

### Documents — flexible, JSON-like structures

```javascript
// A MongoDB "collection" holds many documents, e.g. in a "products" collection:
{
  _id: ObjectId("..."),
  name: "Widget",
  price: 9.99,
  category: "Hardware",
  tags: ["popular", "on-sale"]  // an array, directly embedded
}
{
  _id: ObjectId("..."),
  name: "Gadget",
  price: 19.99,
  category: "Electronics"
  // no "tags" field here at all -- and that's completely valid
}
```

Each **document** is a self-contained record, and — critically — **different documents in the same
collection aren't required to have identical fields.** The second product simply omits `tags`
entirely, which is perfectly valid; there's no schema enforced by the database itself demanding
every document match exactly (though, as covered in the Data Modeling topic, your *application*
often still benefits from a consistent, intentional shape, even without the database strictly
requiring it).

### Terminology mapping between the two worlds

| Relational | Document (MongoDB) |
|---|---|
| Table | Collection |
| Row | Document |
| Column | Field |

Useful to keep in mind when reading documentation or discussions that mix both worlds' terminology.

### Nested/embedded data — a genuine structural difference

```javascript
// Document database - naturally nested
{
  name: "Alice",
  address: {
    street: "123 Main St",
    city: "Nairobi"
  }
}
```

```
-- Relational - typically a separate related table
addresses table:
| id | user_id | street       | city    |
|----|---------|--------------|---------|
| 1  | 5       | 123 Main St  | Nairobi |
```

A document database lets you nest structured data directly inside a parent document; a relational
database more typically represents this same relationship via a separate table linked by a foreign
key — this structural difference is genuinely central to how you'd model data differently in each
system, covered further in the Data Modeling topic.

## Simple Example

The same blog post, modeled both ways:

```
-- Relational
posts table: id, title, author_id
comments table: id, post_id, text
```

```javascript
// Document
{
  title: "My First Post",
  author: "Alice",
  comments: [
    { text: "Great post!" },
    { text: "Thanks for sharing" }
  ]
}
```

## Let's Break It Down

- The relational version keeps comments in their own table, linked to their post via `post_id` —
  retrieving a post's comments requires a separate query (or a join).
- The document version embeds comments directly as an array within the post document itself —
  retrieving a post and all its comments together is a single, simple document fetch.
- Neither is "wrong" — they represent a genuine, deliberate structural tradeoff, covered further
  once you reach actual query performance considerations.

## Common Mistakes

- **Assuming a document database has literally no structure at all**, and designing documents
  haphazardly, without a consistent intended shape your application code can rely on.
- **Forgetting that relational tables require a defined schema upfront**, and being surprised when
  adding a new column requires an explicit schema change (a migration, covered in a later topic).
- **Confusing terminology between the two systems** (calling a MongoDB document a "row," for
  instance) when discussing or researching either.

## When Should I Use It?

Use this vocabulary precisely once you start actually designing your own database structure —
knowing whether you're deciding on a table's columns or a document's fields shapes how you think
about the data.

## Exercises

1. **(Recall)** What are the relational-database terms for "collection," "document," and "field" in
   MongoDB's vocabulary?
2. **(Understanding)** Explain why two documents in the same MongoDB collection can have different
   fields, while two rows in the same SQL table cannot.
3. **(Application)** Sketch both a relational table structure and a MongoDB document structure for
   representing a simple recipe (name, ingredients list, steps list).

## What Should I Learn Next?

Continue to [`04-keys-and-relationships`](../04-keys-and-relationships) — how relational databases
formally connect data across different tables.
