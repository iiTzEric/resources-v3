# Query Performance

**Module:** Databases
**Prerequisites:** [`08-normalization-and-data-modeling`](../08-normalization-and-data-modeling)

## What is it?

This topic covers reasoning about why database queries are sometimes slow — building on the
Fundamentals Algorithms & Complexity lesson and the Indexes topic — with specific attention to the
**N+1 query problem**, a genuinely common, easy-to-accidentally-introduce performance bug.

## Why does it matter?

A query that performs fine with 10 test records can become genuinely, severely slow with 100,000
real records — exactly the same "works on my small test, fails at real scale" gap covered in
Fundamentals. Recognizing common causes lets you avoid or fix these problems before they become
production incidents.

## How does it work?

### The N+1 query problem — a genuinely common, real mistake

```javascript
const orders = await Order.find(); // 1 query

for (const order of orders) {
  const customer = await Customer.findById(order.customerId); // a SEPARATE query, per order!
  console.log(customer.name);
}
```

If there are 100 orders, this runs **1** query for the orders, plus **100 more** queries — one per
order, to fetch each one's customer separately. This is the "N+1" pattern: 1 initial query, plus N
additional queries (one per result from the first query) — a genuinely common, easy mistake to make
without realizing it, especially as code evolves and a loop like this gets added around what was
originally a single, simple lookup.

### The fix — fetch related data in one batch query

```javascript
const orders = await Order.find().populate("customerId"); // 1 query, joins/populates automatically
```

Using `.populate()` (MongoDB/Mongoose) or a `JOIN` (SQL) fetches the related data in a single,
efficient query, rather than one separate query per result:

```sql
SELECT orders.*, customers.name
FROM orders
JOIN customers ON orders.customer_id = customers.id;
```

This single query retrieves everything needed at once — dramatically more efficient than N+1
separate round-trips to the database, especially significant since each round-trip carries real
network latency overhead, not just the database's own processing time.

### Using indexes appropriately (recap and application)

Recall from the Indexes topic: a query filtering on an unindexed column requires scanning every
row/document. For genuinely large collections, this alone can be the difference between a query
returning instantly versus taking seconds — always ensure frequently-filtered columns have
appropriate indexes.

### Limiting the data actually retrieved

```javascript
// Retrieving far more than actually needed
const users = await User.find(); // could be millions of records
```

```javascript
// Better -- only what's actually needed, using pagination (from the Backend module)
const users = await User.find().limit(20).skip(page * 20);
```

Fetching an entire large collection when only a small subset is actually needed wastes both
database effort and network bandwidth — the pagination pattern from the Backend module's API
Architecture topic is directly relevant here.

### Selecting only needed fields

```javascript
const users = await User.find().select("name email"); // only these two fields, not everything
```

Retrieving every field of every document/row when only a couple are actually needed adds
unnecessary overhead, especially for documents with large fields (long text content, embedded
arrays) you don't actually need for a given operation.

## Simple Example

```javascript
// N+1 problem
const posts = await Post.find();
for (const post of posts) {
  post.author = await User.findById(post.authorId); // N additional queries
}

// Fixed
const posts = await Post.find().populate("authorId"); // 1 query total
```

## Let's Break It Down

- The first version issues one query to get all posts, then a *separate* query for every single
  post's author — for 500 posts, that's 501 total queries.
- The fixed version uses `.populate()` to retrieve posts and their authors together in a single,
  efficient operation — the same final data, achieved with dramatically less database round-trip
  overhead.
- This exact pattern (loop over results, query again inside the loop) is worth specifically
  watching for when reviewing your own or others' code, since it's easy to introduce
  unintentionally as logic evolves over time.

## Common Mistakes

- **Querying inside a loop** over results from a previous query — the classic N+1 pattern.
- **Fetching entire collections** when pagination or filtering would retrieve only what's actually
  needed.
- **Not indexing columns used in frequent, real queries**, relying on unindexed full scans that
  degrade as data grows.

## When Should I Use It?

Watch specifically for queries inside loops as a strong warning sign of N+1 — use `.populate()`/
joins instead. Apply pagination and field selection whenever a query could realistically return
more data than a given operation actually needs.

## Exercises

1. **(Recall)** What specifically causes the N+1 query problem?
2. **(Understanding)** Explain why fetching related data with one join/populate call is more
   efficient than fetching it individually inside a loop.
3. **(Application)** Rewrite this N+1 pattern to fetch efficiently in one query:
   ```javascript
   const comments = await Comment.find();
   for (const comment of comments) {
     comment.author = await User.findById(comment.authorId);
   }
   ```

## What Should I Learn Next?

Continue to [`10-migrations-and-backups`](../10-migrations-and-backups) — evolving a database
schema safely over time, and not losing data.
