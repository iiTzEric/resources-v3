# SQL Deep Dive

**Module:** Databases
**Prerequisites:** [`10-migrations-and-backups`](../10-migrations-and-backups)

## What is it?

This topic goes beyond basic CRUD SQL into writing real, more complex queries: different types of
`JOIN`s, `GROUP BY` for aggregation, and combining multiple clauses to answer genuinely useful
questions about your data.

## Why does it matter?

Real applications need more than simple lookups — "how many orders per customer," "which products
have never been ordered," "total revenue by month" — these require combining tables and aggregating
data, exactly what this topic covers.

## How does it work?

### `JOIN` types — combining rows from related tables

```sql
-- INNER JOIN: only rows that match in BOTH tables
SELECT orders.id, customers.name
FROM orders
INNER JOIN customers ON orders.customer_id = customers.id;
```

```sql
-- LEFT JOIN: all rows from the left table, matched customer data if it exists, NULL otherwise
SELECT customers.name, orders.id
FROM customers
LEFT JOIN orders ON customers.id = orders.customer_id;
```

`INNER JOIN` only returns rows where a match exists on both sides — a customer with zero orders
wouldn't appear at all. `LEFT JOIN` returns every row from the "left" table regardless, filling in
`NULL` for any unmatched columns from the right table — genuinely useful for finding, for instance,
customers who have *never* placed an order (`WHERE orders.id IS NULL` after a `LEFT JOIN`).

### `GROUP BY` — aggregating data

```sql
SELECT customer_id, COUNT(*) as order_count
FROM orders
GROUP BY customer_id;
```

`GROUP BY` collapses multiple rows sharing the same value (here, `customer_id`) into one summary
row per group, combined with an aggregate function (`COUNT`, `SUM`, `AVG`, `MAX`, `MIN`) — this
answers "how many orders does each customer have," rather than listing every individual order.

### Combining `JOIN`, `GROUP BY`, and filtering

```sql
SELECT customers.name, SUM(orders.total) as total_spent
FROM customers
JOIN orders ON customers.id = orders.customer_id
WHERE orders.status = 'completed'
GROUP BY customers.name
HAVING SUM(orders.total) > 100
ORDER BY total_spent DESC;
```

This answers a genuinely useful, specific business question: "which customers have spent more than
$100 on completed orders, ranked from highest to lowest?" Notice **`HAVING`**, not `WHERE`, for
filtering on the *aggregated* result (`SUM(orders.total) > 100`) — `WHERE` filters individual rows
*before* grouping; `HAVING` filters *after* grouping, on the aggregated values themselves — a
genuinely important, easy-to-mix-up distinction.

### Subqueries — a query within a query

```sql
SELECT name FROM products
WHERE id NOT IN (SELECT DISTINCT product_id FROM order_items);
```

This finds every product that has *never* appeared in any order — the inner query
(`SELECT DISTINCT product_id FROM order_items`) runs first, producing a list of product ids that
have been ordered; the outer query then finds products *not* in that list.

## Simple Example

```sql
SELECT products.category, COUNT(*) as total_sold, SUM(order_items.quantity * products.price) as revenue
FROM order_items
JOIN products ON order_items.product_id = products.id
GROUP BY products.category
ORDER BY revenue DESC;
```

## Let's Break It Down

- The `JOIN` connects `order_items` to `products`, so each order item's quantity can be combined
  with that specific product's price.
- `GROUP BY products.category` collapses all order items into one summary row per category.
- `SUM(order_items.quantity * products.price)` calculates total revenue per category, and
  `COUNT(*)` counts how many line items fall into each category.
- `ORDER BY revenue DESC` presents the highest-revenue categories first — this single query answers
  a genuinely useful business question that would require significant manual work without SQL's
  aggregation capabilities.

## Common Mistakes

- **Using `WHERE` when `HAVING` was needed** (or vice versa) — filtering on an aggregated value
  requires `HAVING`, since `WHERE` runs before aggregation happens.
- **Using `INNER JOIN` when `LEFT JOIN` was actually needed**, accidentally excluding rows with no
  match (e.g., accidentally omitting customers with zero orders from a report meant to include
  everyone).
- **Forgetting `GROUP BY` when using an aggregate function alongside other selected columns**,
  causing an error or unexpected/undefined behavior in most SQL databases.

## When Should I Use It?

Use `JOIN`s to combine related data across tables, `GROUP BY` with aggregate functions for
summarizing/reporting, and subqueries for questions that require the result of one query to filter
another. These compose together for genuinely sophisticated, useful real-world queries.

## Exercises

1. **(Recall)** What's the difference between `WHERE` and `HAVING`?
2. **(Application)** Write a query finding the total number of orders per month, using `GROUP BY`.
3. **(Problem Solving)** A report meant to show "every product and its total sales, including
   products that have never sold" is missing unsold products entirely. Identify the likely `JOIN`
   type mistake and the fix.

## What Should I Learn Next?

Continue to [`12-mongodb-deep-dive`](../12-mongodb-deep-dive) — the MongoDB-specific equivalents
of these more advanced querying patterns.
