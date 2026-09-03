# MongoDB Deep Dive

**Module:** Databases
**Prerequisites:** [`11-sql-deep-dive`](../11-sql-deep-dive)

## What is it?

This topic covers MongoDB-specific concepts in depth: Mongoose schemas beyond the basics,
embedding vs. referencing applied concretely, and the **aggregation pipeline** — MongoDB's
equivalent of SQL's `GROUP BY`/`JOIN` combination.

## Why does it matter?

You've used MongoDB and Mongoose already in this curriculum's practical project work — this topic
deepens that with the patterns you'll actually need for a real, growing application.

## How does it work?

### Mongoose schemas — validation and structure

```javascript
const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  price: { type: Number, required: true, min: 0 },
  category: { type: String, enum: ["Electronics", "Hardware", "Books"] },
  createdAt: { type: Date, default: Date.now }
});
```

- **`required: true`** — enforced by Mongoose before saving.
- **`min: 0`** — a constraint, similar in spirit to SQL's `CHECK`.
- **`enum: [...]`** — restricts a field to one of a specific set of allowed values.
- **`default: Date.now`** — automatically sets a value if none is provided.

### Referencing and population, revisited concretely

```javascript
const orderSchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: "Customer" },
  total: Number
});

const order = await Order.findById(orderId).populate("customer");
console.log(order.customer.name); // the actual customer document, not just its id
```

`ref: "Customer"` tells Mongoose which model a reference points to, enabling `.populate()` to
automatically fetch and substitute the real, referenced document in place of the raw id — this is
the concrete mechanism behind MongoDB's answer to SQL's `JOIN`, covered conceptually in the Queries
& CRUD topic.

### The aggregation pipeline — MongoDB's answer to `GROUP BY`

```javascript
const results = await Order.aggregate([
  { $match: { status: "completed" } },
  { $group: { _id: "$customerId", totalSpent: { $sum: "$total" } } },
  { $sort: { totalSpent: -1 } }
]);
```

The aggregation pipeline processes documents through a sequence of **stages**, each transforming
the data before passing it to the next:
- **`$match`** — filters documents, similar to SQL's `WHERE`.
- **`$group`** — groups documents by a field and computes aggregates, similar to SQL's `GROUP BY`
  combined with functions like `SUM`.
- **`$sort`** — orders the results, similar to SQL's `ORDER BY`.

This directly parallels the combined `JOIN`/`GROUP BY`/`ORDER BY` SQL query from the previous
topic, expressed as a MongoDB-specific pipeline of stages instead.

### Embedding vs. referencing — a concrete decision walkthrough

For a blog application: **comments** are naturally embedded within their post (always viewed
together, unlikely to grow unboundedly for most blogs, and don't need to be independently queried
across posts often). **Authors**, however, are better referenced — the same author writes many
posts, so embedding full author details into every post would duplicate that data extensively, and
updating an author's bio would otherwise require updating every post they've ever written.

```javascript
const postSchema = new mongoose.Schema({
  title: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: "Author" }, // referenced
  comments: [{ text: String, createdAt: Date }] // embedded
});
```

### Indexes in Mongoose

```javascript
productSchema.index({ name: 1 }); // ascending index on `name`
productSchema.index({ category: 1, price: -1 }); // composite index
```

Directly parallels the `CREATE INDEX` statements from the SQL Indexes topic — same underlying
purpose and tradeoffs, MongoDB-specific syntax.

## Simple Example

```javascript
const results = await Order.aggregate([
  { $match: { status: "completed" } },
  { $group: { _id: "$productCategory", totalRevenue: { $sum: "$total" }, count: { $sum: 1 } } },
  { $sort: { totalRevenue: -1 } }
]);
```

## Let's Break It Down

- `$match` first narrows down to only completed orders — analogous to a SQL `WHERE` clause running
  before grouping.
- `$group` then collapses all matching orders into one summary document per `productCategory`,
  computing both a revenue sum and a count.
- `$sort` orders the final result by revenue, highest first — directly mirroring the equivalent SQL
  query from the previous topic, adapted into MongoDB's pipeline-stage syntax.

## Common Mistakes

- **Forgetting `ref` on a schema field meant to be a reference**, causing `.populate()` to fail
  silently or not work as expected.
- **Embedding data that genuinely should be referenced** (like author details duplicated across
  every post), leading to update-consistency problems identical to the denormalization issues
  covered in the relational Data Modeling topic.
- **Writing aggregation pipelines with stages in the wrong order**, producing incorrect or
  unexpectedly filtered results — `$match` generally belongs as early as possible, to reduce the
  amount of data later stages need to process.

## When Should I Use It?

Use Mongoose schema validation for the same reasons SQL constraints matter — a safety net at the
data layer. Use `.populate()` for reference relationships needing the full related document. Use
the aggregation pipeline for genuinely complex reporting/summarization needs beyond simple find/
filter queries.

## Exercises

1. **(Recall)** What MongoDB aggregation stage is the closest equivalent to SQL's `GROUP BY`?
2. **(Application)** Write an aggregation pipeline that finds the average order total per customer,
   sorted from highest to lowest average.
3. **(Problem Solving)** A query using `.populate("author")` returns the raw author id instead of
   the full author document. What's the most likely missing piece in the schema definition?

## What Should I Learn Next?

This completes the Databases module. Continue to
[`09-data-structures-and-algorithms`](../../09-data-structures-and-algorithms) — foundational
computer science, usable alongside your growing full-stack skills.
