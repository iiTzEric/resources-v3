# The Request/Response Cycle

**Module:** Backend Development
**Prerequisites:** [`01-servers-and-http`](../01-servers-and-http)

## What is it?

This topic traces one HTTP request through your backend in complete, concrete detail — from the
moment it arrives at your server to the moment a response is sent back — tying together
everything from the How The Web Works lesson with what you're now building yourself.

## Why does it matter?

Having a precise mental model of this cycle is what lets you reason correctly about where to put
logic (validation, database queries, error handling) and in what order things actually execute.

## Mental Model

Think of your Express app as a mail sorting facility. A request arrives (mail comes in), gets
matched to the correct route based on its path and method (sorted to the right department),
processed by that route's handler (the department does its work), and a response is sent back (a
reply gets mailed out). Middleware (covered next topic) are like inspection stations the mail
passes through before reaching its department.

## How does it work?

### The full cycle, in order

```javascript
app.get("/users/:id", (req, res) => {
  const userId = req.params.id;
  // 1. Extract data from the request
  // 2. Do whatever logic is needed (database lookup, etc.)
  // 3. Send a response
  res.json({ id: userId, name: "Alice" });
});
```

1. **Request arrives** — the client sends `GET /users/5`.
2. **Express matches it to a route** — `/users/:id` matches, with `:id` capturing `5`.
3. **The route handler runs** — your function executes, with `req.params.id` equal to `"5"`.
4. **The handler does its work** — here, trivially returning hardcoded data; in a real app, this is
   where a database query would happen (covered in the Databases module).
5. **A response is sent** — `res.json(...)` sends data back, and the cycle for this specific request
   ends.

### Reading different parts of the request

```javascript
app.get("/search", (req, res) => {
  const query = req.query.q;          // from the URL's query string: /search?q=shoes
  res.json({ searching: query });
});

app.post("/users", (req, res) => {
  const { name, email } = req.body;    // from the request body (needs express.json() middleware)
  res.status(201).json({ name, email });
});
```

- **`req.params`** — dynamic segments from the URL path itself (`/users/:id`).
- **`req.query`** — key-value pairs from the URL's query string (`?q=shoes`).
- **`req.body`** — data sent in the request body, typically for `POST`/`PUT`/`PATCH`.

### Every request gets exactly one response

A route handler must send exactly one response — calling `res.json(...)` (or `res.send(...)`) twice
for the same request causes an error ("headers already sent"). This is worth being deliberate
about, especially once conditional logic determines which response to send.

```javascript
app.get("/users/:id", (req, res) => {
  const user = findUser(req.params.id);
  if (!user) {
    return res.status(404).json({ error: "User not found" }); // note the `return`
  }
  res.json(user);
});
```

The `return` here isn't about the function's own return value (Express doesn't use it) — it's the
same guard-clause pattern from Fundamentals: stop this function's execution immediately after
sending the 404 response, preventing the code from continuing on to also try sending `res.json
(user)` afterward.

## Simple Example

```javascript
app.get("/products/:id", (req, res) => {
  const products = [{ id: "1", name: "Widget" }, { id: "2", name: "Gadget" }];
  const product = products.find(p => p.id === req.params.id);

  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }
  res.json(product);
});
```

## Let's Break It Down

- `req.params.id` captures whatever value was in the URL's `:id` position.
- `.find()` (from your JavaScript Arrays work) looks for a matching product.
- The guard clause handles the "not found" case explicitly with a proper `404`, and `return`
  prevents execution from continuing to the final `res.json(product)` line, which would otherwise
  try to send a second response for the same request and throw an error.

## Common Mistakes

- **Forgetting `return` after sending an early response inside a conditional**, causing an attempt
  to send a second response and crashing with a "headers already sent" error.
- **Confusing `req.params`, `req.query`, and `req.body`** — each pulls data from a different part
  of the request, and using the wrong one is a common source of `undefined` values.
- **Not sending any response at all** in some code path — the client's request would hang
  indefinitely, waiting for a response that never comes.

## When Should I Use It?

Every route handler you write follows this same cycle — understanding it precisely helps you place
logic (validation, database calls, error handling) at the correct point, and always ensure exactly
one response is sent per request, on every possible code path.

## Exercises

1. **(Recall)** What's the difference between `req.params`, `req.query`, and `req.body`?
2. **(Application)** Write a route `GET /greet` that reads a `name` query parameter
   (`/greet?name=Alice`) and responds with `{"message": "Hello, Alice"}`.
3. **(Problem Solving)** A route sometimes throws "Cannot set headers after they are sent." Given
   an `if` block that sends a response without a `return` afterward, followed by more response-
   sending code, explain exactly why this happens.

## What Should I Learn Next?

Continue to [`03-rest-apis`](../03-rest-apis) — conventions for designing predictable, well-
structured API endpoints.
