# Routing, Controllers & Services

**Module:** Backend Development
**Prerequisites:** [`03-rest-apis`](../03-rest-apis)

## What is it?

This topic covers structuring a growing Express backend across multiple files, separating three
distinct responsibilities: **routes** (what URLs exist), **controllers** (what happens when a
route is hit), and **services** (the actual business logic/data access) — mirroring the
separation-of-concerns principle from earlier modules, applied to backend architecture.

## Why does it matter?

A single `server.js` file with every route's logic written inline becomes genuinely unmanageable
once an API grows past a handful of endpoints. Splitting responsibilities across files (using the
JavaScript Modules topic's `require`/`module.exports`) keeps each piece focused and testable.

## How does it work?

### The all-in-one-file version (what you've done so far)

```javascript
app.post("/users", (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: "Name required" });
  const newUser = { id: users.length + 1, name };
  users.push(newUser);
  res.status(201).json(newUser);
});
```

### Splitting into routes, controllers, and services

```javascript
// services/userService.js
let users = [];

function createUser(name) {
  const newUser = { id: users.length + 1, name };
  users.push(newUser);
  return newUser;
}

function getAllUsers() {
  return users;
}

module.exports = { createUser, getAllUsers };
```

```javascript
// controllers/userController.js
const userService = require("../services/userService");

function handleCreateUser(req, res) {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: "Name required" });
  const newUser = userService.createUser(name);
  res.status(201).json(newUser);
}

function handleGetUsers(req, res) {
  res.json(userService.getAllUsers());
}

module.exports = { handleCreateUser, handleGetUsers };
```

```javascript
// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/", userController.handleGetUsers);
router.post("/", userController.handleCreateUser);

module.exports = router;
```

```javascript
// server.js
const express = require("express");
const userRoutes = require("./routes/userRoutes");

const app = express();
app.use(express.json());
app.use("/users", userRoutes);

app.listen(3000);
```

### What each layer is actually responsible for

- **Routes** — just wiring: "this URL and method maps to this controller function." No actual logic
  here.
- **Controllers** — handle the HTTP-specific concerns: reading `req`, validating input, choosing
  status codes, calling the right service function, sending `res`.
- **Services** — the actual business logic and data access, with **no knowledge of HTTP at all** —
  `createUser` doesn't know or care whether it was called from an HTTP request, a test, or
  somewhere else entirely.

### Why this separation genuinely matters, not just as a formality

This structure means: the actual logic (in services) can be reused or tested independently of any
specific HTTP route; controllers stay thin and focused purely on translating between HTTP and your
actual logic; and finding "where does X happen" becomes predictable once you know the pattern,
rather than searching through one enormous file.

### `express.Router()` — grouping related routes

`express.Router()` creates a mini, self-contained router that can be mounted onto a specific path
prefix (`app.use("/users", userRoutes)`) — every route defined inside `userRoutes` automatically
gets `/users` prepended, keeping route files organized by resource.

## Simple Example

The three-file split above, applied to a `products` resource, would follow the exact same shape:
`services/productService.js` (data/logic), `controllers/productController.js` (HTTP handling),
`routes/productRoutes.js` (URL wiring), mounted via `app.use("/products", productRoutes)`.

## Let's Break It Down

- Each layer has exactly one job, mirroring the "one function, one responsibility" principle from
  Fundamentals, now applied at the level of whole files.
- `userService.js` has zero knowledge of Express, `req`, or `res` — it's pure, portable logic that
  could theoretically be reused in a completely different context (a CLI tool, a different web
  framework) without modification.
- This structure scales cleanly: adding a new resource means adding one new service, controller,
  and route file, following the exact same established pattern.

## Common Mistakes

- **Putting business logic directly in controllers**, blurring the line between "handling HTTP" and
  "the actual logic," making the logic harder to reuse or test independently.
- **Splitting into layers prematurely**, for a genuinely tiny API where the added file structure
  provides little real benefit yet — like any abstraction, this is worth introducing once a project
  actually grows large enough to benefit from it.
- **Inconsistent naming/structure across resources**, making the codebase harder to navigate
  despite having "layers" in principle.

## When Should I Use It?

Adopt this layered structure once an API grows beyond a handful of simple routes, or once you find
`server.js` becoming difficult to navigate. For a genuinely tiny project or quick prototype, keeping
everything in one file temporarily is a reasonable, pragmatic choice.

## Exercises

1. **(Recall)** What's the specific responsibility of a controller, versus a service?
2. **(Application)** Split this into service/controller/route files: a `GET /orders` route
   returning a hardcoded array of orders.
3. **(Problem Solving)** A service function directly references `req.body` inside it. Explain why
   this breaks the intended separation of concerns, and how you'd fix it.

## What Should I Learn Next?

Continue to [`05-middleware`](../05-middleware) — code that runs between a request arriving and
your route handler processing it.
