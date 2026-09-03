# Input Validation

**Module:** Backend Development
**Prerequisites:** [`05-middleware`](../05-middleware)

## What is it?

**Validation** means checking that incoming data (from a request body, query parameters, or URL
params) actually matches what your code expects, before acting on it — the core principle being:
**never trust data coming from a client.**

## Why does it matter?

A client (browser, mobile app, or a malicious actor using a tool like `curl` directly) can send
*anything* to your API — missing fields, wrong types, deliberately malformed or malicious data.
Client-side validation (in a React form, for instance) is a good user-experience improvement, but
provides **zero actual security**, since it can always be bypassed by anyone sending requests
directly to your API. Server-side validation is the only validation that actually protects your
data and logic.

## How does it work?

### Manual validation — what you've already been doing

```javascript
app.post("/users", (req, res) => {
  const { name, email } = req.body;

  if (!name || typeof name !== "string") {
    return res.status(400).json({ error: "name is required and must be a string" });
  }
  if (!email || !email.includes("@")) {
    return res.status(400).json({ error: "a valid email is required" });
  }

  // proceed, confident the data is at least minimally valid
});
```

This is a genuinely valid approach for simple cases — the same guard-clause pattern from
Fundamentals, applied to incoming request data.

### Why manual validation gets unwieldy quickly

As the number of fields and rules grows (required fields, type checks, length limits, format
checks, cross-field rules), manually writing every check becomes repetitive and error-prone —
exactly the kind of repeated pattern worth extracting into something more systematic.

### Validation libraries — a brief, practical look

Real projects commonly use a validation library (like `zod` or `joi`) to declare validation rules
more concisely:

```javascript
// Conceptual example using a schema-based library
const userSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  age: z.number().min(0).optional()
});

app.post("/users", (req, res) => {
  const result = userSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ error: result.error });
  }
  // result.data is now validated and safely typed
});
```

This declares the *shape* data should have once, rather than writing individual `if` checks for
every field — genuinely more maintainable once a schema has many fields or nested structure.

### Validating as middleware — a common, clean pattern

```javascript
function validateUser(req, res, next) {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: "name and email are required" });
  }
  next();
}

app.post("/users", validateUser, (req, res) => {
  // by the time this runs, validation has already passed
});
```

Extracting validation into its own middleware keeps the route handler focused purely on its actual
logic, with validation handled as a clearly separate, reusable concern — connecting directly back
to the layered structure from the previous topic.

### Sanitization — beyond just checking, also cleaning

```javascript
const cleanName = name.trim(); // remove accidental leading/trailing whitespace
```

Validation checks whether data is acceptable; **sanitization** additionally cleans it up
(trimming whitespace, normalizing case) before it's used or stored — both matter for genuinely
robust input handling.

## Simple Example

```javascript
function validateProduct(req, res, next) {
  const { name, price } = req.body;

  if (!name || typeof name !== "string" || name.trim().length === 0) {
    return res.status(400).json({ error: "A valid product name is required" });
  }
  if (typeof price !== "number" || price <= 0) {
    return res.status(400).json({ error: "Price must be a positive number" });
  }
  next();
}

app.post("/products", validateProduct, (req, res) => {
  // req.body is now known to have a valid name and price
});
```

## Let's Break It Down

- `validateProduct` checks both the *presence* and the *type/shape* of each field — not just
  "does `name` exist," but "is it actually a non-empty string," which catches more realistic bad
  input (an empty string, or a number sent where text was expected).
- Extracting this into middleware means any future route needing the same validation (an update
  route, perhaps) can reuse `validateProduct` directly, rather than duplicating these checks.

## Common Mistakes

- **Trusting client-side validation as sufficient**, forgetting that any client-side check can be
  bypassed by directly calling the API.
- **Checking only presence, not type/shape** (`if (!price)`) — this would incorrectly reject a
  legitimate price of `0` too, echoing the truthy/falsy trap from earlier modules, and separately
  wouldn't catch a `price` sent as a non-numeric string.
- **Repeating the same validation logic across many routes** instead of extracting it into reusable
  middleware or a shared validation schema.

## When Should I Use It?

Validate every piece of data your API receives from a client, on the server, regardless of whether
client-side validation also exists. Extract validation into middleware or a schema once the same
checks are needed across multiple routes, or once a single route's validation logic grows complex.

## Exercises

1. **(Recall)** Why is client-side validation alone never sufficient for real security/data
   integrity?
2. **(Application)** Write validation middleware for a `POST /orders` route requiring `productId`
   (a number) and `quantity` (a positive number).
3. **(Problem Solving)** An API accepts a `discount` field and only checks `if (!discount)` before
   applying it — a request with `discount: 0` gets rejected as if the field were missing, which
   isn't the intended behavior. Diagnose and fix the validation logic.

## What Should I Learn Next?

Continue to [`07-error-handling`](../07-error-handling) — centralizing how your backend handles
and responds to errors, rather than repeating the same error-response logic in every route.
