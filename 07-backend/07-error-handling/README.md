# Error Handling (Backend)

**Module:** Backend Development
**Prerequisites:** [`06-validation`](../06-validation)

## What is it?

This topic covers handling errors consistently across an entire Express application — using
centralized **error-handling middleware** rather than repeating `try`/`catch` and error-response
logic in every single route.

## Why does it matter?

Without a consistent approach, error responses can end up inconsistent across an API (different
shapes, missing status codes, or worse, leaking internal details like stack traces to clients) —
genuinely both a maintainability and a security concern.

## How does it work?

### The problem: repeated error handling in every route

```javascript
app.get("/users/:id", async (req, res) => {
  try {
    const user = await findUser(req.params.id);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});
```

Repeating this `try`/`catch` shape in every single async route is tedious and easy to get
inconsistent across a growing codebase.

### Express's special error-handling middleware

```javascript
function errorHandler(err, req, res, next) {
  console.error(err);
  res.status(500).json({ error: "Internal server error" });
}

app.use(errorHandler); // registered LAST, after all routes
```

Express recognizes middleware with **four** parameters (`err, req, res, next`) as specifically an
**error handler**, and routes errors to it automatically when something calls `next(err)`, or when
an error is thrown inside an `async` route wrapped appropriately (covered below). This must be
registered *after* all your regular routes, so Express knows to fall back to it once nothing else
has handled the error.

### Passing errors to the error handler

```javascript
app.get("/users/:id", async (req, res, next) => {
  try {
    const user = await findUser(req.params.id);
    if (!user) {
      const error = new Error("User not found");
      error.status = 404;
      throw error;
    }
    res.json(user);
  } catch (error) {
    next(error); // hands the error off to the error-handling middleware
  }
});
```

```javascript
function errorHandler(err, req, res, next) {
  const status = err.status || 500;
  res.status(status).json({ error: err.message });
}
```

Now every route follows the same pattern: catch an error, call `next(error)`, and let one
centralized handler decide how to actually respond — including using a custom `status` property on
the error to distinguish expected failures (like a `404`) from genuine unexpected server problems
(defaulting to `500`).

### Never leak internal details to clients

```javascript
function errorHandler(err, req, res, next) {
  console.error(err); // full details logged server-side, for debugging
  const status = err.status || 500;
  const message = status === 500 ? "Internal server error" : err.message;
  res.status(status).json({ error: message }); // generic message for genuine server errors
}
```

For unexpected `500` errors specifically, sending the raw error message (which might reveal
internal file paths, database structure, or other implementation details) to the client is a
genuine security concern — log full details server-side for your own debugging, but respond with a
generic, safe message for anything that isn't a deliberately expected, well-understood error case.

### A reusable wrapper to avoid repeating `try`/`catch` everywhere

```javascript
function asyncHandler(fn) {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
}

app.get("/users/:id", asyncHandler(async (req, res) => {
  const user = await findUser(req.params.id);
  if (!user) {
    const error = new Error("User not found");
    error.status = 404;
    throw error;
  }
  res.json(user);
}));
```

`asyncHandler` wraps an async route function, automatically catching any rejected Promise and
passing it to `next` — eliminating the repeated `try`/`catch`/`next(error)` boilerplate from every
single route, while still routing every error to the same centralized handler.

## Simple Example

```javascript
app.use("/users", userRoutes);
app.use("/products", productRoutes);

app.use((req, res) => {
  res.status(404).json({ error: "Route not found" }); // catches unmatched routes
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.status ? err.message : "Internal server error" });
});
```

## Let's Break It Down

- The second-to-last middleware (three parameters, no `err`) catches any request that didn't match
  any earlier route — a "not found" fallback.
- The final middleware (four parameters) is Express's error handler, catching anything passed via
  `next(error)` from anywhere in the application.
- Both are registered last, deliberately, so Express only falls back to them once nothing earlier
  has already handled the request.

## Common Mistakes

- **Registering the error-handling middleware before regular routes**, meaning it never actually
  gets a chance to catch anything from routes defined after it.
- **Leaking raw error messages/stack traces to clients** for unexpected server errors, exposing
  internal implementation details.
- **Forgetting error-handling middleware needs exactly four parameters** — Express specifically
  checks the function's parameter count to distinguish an error handler from regular middleware.

## When Should I Use It?

Use centralized error-handling middleware for any real Express application beyond a trivial
prototype — it keeps error responses consistent and prevents accidental leakage of internal
details, while removing repeated `try`/`catch` boilerplate from individual routes.

## Exercises

1. **(Recall)** How does Express distinguish error-handling middleware from regular middleware?
2. **(Understanding)** Explain why leaking a raw error message to the client for an unexpected
   server error is a security concern, with a concrete example of what might leak.
3. **(Application)** Write a centralized error handler that returns a custom error's `status` and
   `message` if present, or a generic `500`/"Internal server error" otherwise.

## What Should I Learn Next?

Continue to [`08-authentication`](../08-authentication) — proving who a user actually is, the
foundation for the mental health app's login system.
