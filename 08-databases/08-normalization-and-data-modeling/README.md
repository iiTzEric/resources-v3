# Normalization & Data Modeling

**Module:** Databases
**Prerequisites:** [`07-transactions-and-constraints`](../07-transactions-and-constraints)

## What is it?

**Normalization** is a set of principles for structuring relational data to minimize duplication
and prevent inconsistency. **Data modeling** more broadly is the deliberate process of deciding how
to represent your application's real-world data — in either a relational or document database — a
skill that matters regardless of which database type you're using.

## Why does it matter?

Poor data modeling causes real, ongoing problems: duplicated data that can drift out of sync,
awkward queries, and structures that fight against how your application actually needs to use the
data. Getting this right early saves significant pain later.

## How does it work?

### The problem normalization solves — duplication and inconsistency

```
-- BAD: denormalized, duplicated data
orders table:
| id | customer_name | customer_email    | product |
|----|----------------|-------------------|---------|
| 1  | Alice          | alice@x.com       | Widget  |
| 2  | Alice          | alice@x.com       | Gadget  |
```

Alice's name and email are duplicated across every one of her orders. If she updates her email,
every single row needs updating — miss one, and now her data is genuinely inconsistent across the
table.

### The fix — separate related data into its own table

```
customers table:
| id | name  | email       |
|----|-------|-------------|
| 1  | Alice | alice@x.com |

orders table:
| id | customer_id | product |
|----|-------------|---------|
| 1  | 1           | Widget  |
| 2  | 1           | Gadget  |
```

Now Alice's information exists in exactly **one** place. Updating her email means updating a single
row, and every order automatically reflects the correct, current information via the relationship
(`customer_id`) — this is the core idea behind normalization: each piece of information should have
one single, authoritative "home."

### Normal forms — briefly, without excessive formalism

Formal "normal forms" (1NF, 2NF, 3NF) are a rigorous academic framework for this — the practical
takeaway most working developers actually apply: **avoid storing the same piece of information in
more than one place**, and structure tables so each one represents one clear, coherent concept.

### When some duplication (denormalization) is deliberate

```
-- Deliberately denormalized, for performance
orders table:
| id | customer_id | customer_name_snapshot | product |
```

Sometimes, a small amount of intentional duplication is a deliberate tradeoff — storing a
`customer_name_snapshot` at the time of an order, for instance, so historical orders display the
name as it was *then*, even if the customer later changes their name. This is a genuine, thoughtful
design decision, distinct from *accidental* duplication caused by not thinking through the data
model at all.

### Data modeling in a document database — embedding vs. referencing, revisited

Recall from Keys & Relationships: MongoDB gives you a real choice between embedding related data
directly, or referencing it separately. The general guidance: **embed when data is always accessed
together and doesn't grow unboundedly** (a blog post's own tags); **reference when data is
independently meaningful, potentially large, or shared across many parents** (a product referenced
by many different orders, rather than the full product details being copied into every order).

### A concrete embedding-vs-referencing decision

```javascript
// Embedding - good here: comments genuinely belong to and are always viewed with their post
{
  title: "My Post",
  comments: [{ text: "Nice!" }, { text: "Thanks" }]
}

// Referencing - good here: a product is independently meaningful, and many orders reference the SAME product
{
  orderId: "abc",
  productId: "xyz123", // reference, not the full embedded product details
  quantity: 2
}
```

Embedding the *full* product details directly into every order (rather than referencing) would mean
duplicating the product's name/price/description across every single order that includes it — and
if the product's price ever changes, every historical order embedding the old price would (probably
correctly, actually) still show the price *at the time of that order* — an example of duplication
that might actually be the *intended*, correct behavior, once again showing this is a deliberate
design decision, not a rule to apply mechanically.

## Simple Example

```
-- Poor: category duplicated as free text across every product
products table: id, name, category (as plain text, e.g. "Electronics")

-- Better: category normalized into its own table
categories table: id, name
products table: id, name, category_id (references categories.id)
```

## Let's Break It Down

- Storing `category` as plain repeated text risks inconsistency (`"Electronics"` vs
  `"electronics"` vs `"Electronic"` — all meant to be the same category, but now technically
  different values).
- Normalizing into a separate `categories` table with a foreign key ensures every product
  referencing a given category is referencing the exact same, single, authoritative record —
  renaming a category updates it everywhere at once, correctly and consistently.

## Common Mistakes

- **Duplicating data that should have one authoritative source**, risking it drifting out of sync
  over time.
- **Over-normalizing to an extreme**, splitting data into so many small, related tables that
  ordinary queries require excessive joins, hurting both clarity and performance.
- **Applying relational normalization principles rigidly to a document database**, missing
  opportunities where deliberate embedding is actually the better, more natural fit.

## When Should I Use It?

Normalize relational data to avoid duplicating information that should have a single source of
truth. Allow deliberate denormalization when there's a genuine, understood reason (performance,
historical accuracy). In document databases, choose embedding vs. referencing based on how the data
is actually accessed and whether it's shared across multiple parents.

## Exercises

1. **(Recall)** What core problem does normalization solve?
2. **(Understanding)** Explain why embedding a product's full details into every order that
   includes it might actually be the *correct*, deliberate choice, rather than a modeling mistake.
3. **(Application)** Identify the normalization issue in this table and describe the fix:
   `enrollments: student_name, student_email, course_name, course_instructor`

## What Should I Learn Next?

Continue to [`09-performance`](../09-performance) — reasoning about slow queries, including the
notorious N+1 problem.
