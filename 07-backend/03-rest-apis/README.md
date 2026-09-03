# REST APIs

**Module:** Backend Development
**Prerequisites:** [`02-request-response-cycle`](../02-request-response-cycle)

## What is it?

**REST** (Representational State Transfer) is a set of conventions for designing APIs around
**resources** — nouns (users, products, orders) — manipulated using standard HTTP methods. It's not
a strict protocol enforced by any tool; it's a widely-adopted style that makes APIs predictable to
anyone familiar with the convention.

## Why does it matter?

A well-designed REST API is genuinely easier to use, understand, and maintain than one with
inconsistent, ad-hoc endpoint naming. Following these conventions (even loosely) makes your API
immediately more approachable to anyone (including future you) who needs to use it.

## How does it work?

### Resources, not actions, in the URL

```
GET    /users          -> list all users
GET    /users/5         -> get user 5
POST   /users            -> create a new user
PUT    /users/5           -> replace user 5 entirely
PATCH  /users/5            -> update part of user 5
DELETE /users/5              -> delete user 5
```

Notice: the URL describes the **resource** (`/users`), and the **HTTP method** describes the
**action** — not `/getUsers` or `/deleteUser5`, which bake the action into the URL itself, a common
anti-pattern REST specifically avoids.

### Nested resources for relationships

```
GET /users/5/orders       -> all orders belonging to user 5
GET /users/5/orders/12     -> a specific order belonging to user 5
```

This URL structure directly communicates the relationship between resources — an order that
belongs to a specific user.

### Implementing this in Express

```javascript
app.get("/users", (req, res) => {
  res.json(users);
});

app.get("/users/:id", (req, res) => {
  const user = users.find(u => u.id === Number(req.params.id));
  if (!user) return res.status(404).json({ error: "Not found" });
  res.json(user);
});

app.post("/users", (req, res) => {
  const newUser = { id: users.length + 1, ...req.body };
  users.push(newUser);
  res.status(201).json(newUser);
});

app.put("/users/:id", (req, res) => {
  const index = users.findIndex(u => u.id === Number(req.params.id));
  if (index === -1) return res.status(404).json({ error: "Not found" });
  users[index] = { id: Number(req.params.id), ...req.body };
  res.json(users[index]);
});

app.delete("/users/:id", (req, res) => {
  users = users.filter(u => u.id !== Number(req.params.id));
  res.status(204).send();
});
```

Notice `204 No Content` for a successful delete — there's no meaningful data to send back, so an
empty response with this specific status code is the conventional choice.

### Plural nouns, consistently

`/users`, not `/user` — even for a single-item route (`/users/5`), keeping the resource name
plural and consistent throughout is a widely-followed convention, making the API's structure
predictable at a glance.

### Versioning — planning for change

```
/api/v1/users
/api/v2/users
```

Prefixing routes with a version lets an API evolve (changing response shapes, behavior) without
breaking existing clients still depending on the older version — a genuinely important
consideration once an API has real, external consumers you don't control.

## Simple Example

```javascript
app.get("/products", (req, res) => {
  res.json(products);
});

app.get("/products/:id", (req, res) => {
  const product = products.find(p => p.id === Number(req.params.id));
  if (!product) return res.status(404).json({ error: "Product not found" });
  res.json(product);
});

app.post("/products", (req, res) => {
  const { name, price } = req.body;
  if (!name || !price) {
    return res.status(400).json({ error: "name and price are required" });
  }
  const newProduct = { id: products.length + 1, name, price };
  products.push(newProduct);
  res.status(201).json(newProduct);
});
```

## Let's Break It Down

- All three routes operate on the same resource, `/products`, distinguished by HTTP method and the
  presence/absence of an `:id` — exactly the REST convention in action.
- The `POST` route validates required fields before creating anything, following the same guard-
  clause and `400` pattern from the Fundamentals APIs lesson.
- Consistent, predictable naming (`/products`, always plural) means anyone familiar with REST
  conventions could correctly guess most of this API's shape without reading documentation.

## Common Mistakes

- **Putting actions in URLs** (`/getUsers`, `/deleteUser/5`) instead of relying on HTTP methods to
  express the action.
- **Inconsistent pluralization** (`/user/5` in one place, `/products` elsewhere) — pick one
  convention and apply it everywhere.
- **Returning `200` for a `POST` that creates something**, instead of the more precise `201`.
- **Not versioning an API that has real external consumers**, making future breaking changes
  painful to roll out.

## When Should I Use It?

Follow REST conventions for the large majority of APIs you build — they're widely understood and
make your API immediately approachable to anyone with REST experience. Some APIs (real-time
systems, complex querying needs) reasonably deviate from strict REST (GraphQL is one well-known
alternative) — but REST remains the sensible default for most applications.

## Exercises

1. **(Recall)** Why does REST favor `DELETE /users/5` over `/deleteUser/5`?
2. **(Application)** Design REST-style endpoints for a blog: listing posts, getting one post,
   creating a post, updating a post, deleting a post, and listing comments on a specific post.
3. **(Problem Solving)** An existing API has routes like `/api/getAllUsers` and
   `/api/removeUserById`. Rewrite them following REST conventions.

## What Should I Learn Next?

Continue to
[`04-routing-controllers-services`](../04-routing-controllers-services) — structuring a growing
backend's code so routes, business logic, and data access aren't all tangled together.
