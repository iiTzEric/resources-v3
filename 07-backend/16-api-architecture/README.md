# API Architecture

**Module:** Backend Development
**Prerequisites:** [`15-environment-variables`](../15-environment-variables)

## What is it?

This topic covers designing APIs that hold up well as they grow: **pagination** (not returning
every record at once), **filtering** and **searching** (letting clients narrow down results), and
**versioning** (allowing an API to evolve without breaking existing clients).

## Why does it matter?

An endpoint like `GET /users` that simply returns *every* user works fine with 10 users, and becomes
a genuine performance and usability problem with 100,000 — these patterns are what real, production
APIs use to stay usable at any scale.

## How does it work?

### Pagination — returning results in manageable chunks

```javascript
app.get("/users", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const skip = (page - 1) * limit;

  const users = await User.find().skip(skip).limit(limit);
  const total = await User.countDocuments();

  res.json({
    data: users,
    page,
    totalPages: Math.ceil(total / limit),
    totalItems: total
  });
});
```

Instead of `GET /users` returning every single user, `GET /users?page=2&limit=20` returns just 20
users, along with metadata telling the client how many total pages/items exist — letting a frontend
build "next page" controls, and avoiding sending (and the client having to process) enormous
responses.

### Filtering — narrowing results by specific criteria

```javascript
app.get("/products", async (req, res) => {
  const filter = {};
  if (req.query.category) filter.category = req.query.category;
  if (req.query.minPrice) filter.price = { $gte: Number(req.query.minPrice) };

  const products = await Product.find(filter);
  res.json(products);
});
```

`GET /products?category=electronics&minPrice=50` lets a client request only the subset of data it
actually needs, rather than fetching everything and filtering client-side — genuinely more
efficient, especially as the underlying dataset grows.

### Searching — text-based queries

```javascript
app.get("/products", async (req, res) => {
  const filter = {};
  if (req.query.search) {
    filter.name = { $regex: req.query.search, $options: "i" }; // case-insensitive partial match
  }
  const products = await Product.find(filter);
  res.json(products);
});
```

`GET /products?search=widget` finds products whose name contains "widget," case-insensitively —
for genuinely large-scale text search needs, dedicated search infrastructure (like Elasticsearch)
exists, but this pattern handles many real, smaller-scale needs well.

### Combining pagination, filtering, and search together

```
GET /products?category=electronics&search=phone&page=2&limit=10
```

These patterns compose naturally — a real API commonly supports all three simultaneously, letting
clients construct precisely the query they need.

### Versioning — evolving an API without breaking existing clients

```javascript
app.use("/api/v1/users", userRoutesV1);
app.use("/api/v2/users", userRoutesV2); // a new, changed version, coexisting
```

When an API's shape needs to change in a way that would break existing clients (renaming a field,
changing a response structure), versioning lets both the old and new versions run simultaneously —
existing clients keep working against `v1` while new clients (or ones updated to expect the new
shape) use `v2`, until `v1` can eventually be safely retired.

## Simple Example

```javascript
app.get("/orders", requireAuth, async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const filter = { userId: req.user.id };
  if (req.query.status) filter.status = req.query.status;

  const orders = await Order.find(filter)
    .skip((page - 1) * limit)
    .limit(limit);
  const total = await Order.countDocuments(filter);

  res.json({ data: orders, page, totalPages: Math.ceil(total / limit) });
});
```

## Let's Break It Down

- `filter` always includes the authenticated user's own `userId` (an authorization concern from
  earlier, ensuring users only ever see their own orders), optionally narrowed further by a
  `status` query parameter if provided.
- Pagination applies on top of that filtered result set, so `totalPages` correctly reflects the
  count *after* filtering, not the entire unfiltered orders collection.

## Common Mistakes

- **Returning entire collections with no pagination**, which becomes a genuine performance problem
  as data grows.
- **Performing filtering entirely client-side** after fetching all data, rather than letting the
  server do it — wasteful once the underlying dataset is large.
- **Breaking an existing API's response shape without versioning**, silently breaking every
  existing client depending on the old format.

## When Should I Use It?

Add pagination to any endpoint that could realistically return a large, growing number of items.
Add filtering/searching once clients need to narrow down results by specific criteria. Version an
API once it has real external consumers you don't fully control, before making any breaking
change.

## Exercises

1. **(Recall)** What problem does pagination solve that a plain `GET /items` endpoint doesn't
   address on its own?
2. **(Application)** Add pagination and a `category` filter to a `GET /articles` endpoint.
3. **(Problem Solving)** An API changes a `POST /users` endpoint's response from `{name, email}` to
   `{fullName, emailAddress}`, and mobile app users on an older app version start crashing. Explain
   how versioning could have prevented this.

## What Should I Learn Next?

This completes the Backend Development module. Continue to [`08-databases`](../../08-databases) —
the persistence layer every route in this module has assumed exists underneath it.
