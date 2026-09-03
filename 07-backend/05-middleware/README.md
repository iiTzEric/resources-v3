# Middleware

**Module:** Backend Development
**Prerequisites:** [`04-routing-controllers-services`](../04-routing-controllers-services)

## What is it?

**Middleware** is a function that runs *between* a request arriving and your final route handler
processing it — able to inspect or modify the request, end the cycle early, or pass control along
to the next step. You've already used middleware without necessarily calling it that:
`express.json()` and `cors()` are both middleware.

## Why does it matter?

Middleware is how you handle cross-cutting concerns — logging, authentication checks, parsing
request bodies — in one centralized place, rather than repeating the same logic inside every
single route handler.

## How does it work?

### The middleware function signature

```javascript
function myMiddleware(req, res, next) {
  console.log(`${req.method} ${req.path}`);
  next(); // pass control to the next middleware/route handler
}

app.use(myMiddleware);
```

Middleware functions take a third parameter, **`next`** — calling it passes control along to
whatever comes next (another middleware, or the final route handler). **Forgetting to call `next()`
leaves the request hanging forever**, since nothing ever proceeds to actually respond.

### `app.use()` — applying middleware globally

```javascript
app.use(express.json());  // applies to every request
app.use(cors());            // applies to every request
```

Middleware registered with `app.use()` (with no specific path) runs for every incoming request,
before any route-specific handling.

### Middleware ending the cycle early

```javascript
function requireAuth(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).json({ error: "Not authenticated" });
  }
  next();
}

app.get("/profile", requireAuth, (req, res) => {
  res.json({ message: "Secret profile data" });
});
```

Middleware can also **not** call `next()`, instead sending a response directly and ending the
request there — exactly what an authentication check needs to do for an unauthenticated request:
stop before the actual route logic ever runs.

### Middleware specific to one route

```javascript
app.get("/profile", requireAuth, (req, res) => {
  // requireAuth runs first; only reaches here if it called next()
});
```

Passing a middleware function as an extra argument before the final handler applies it only to that
specific route, rather than globally.

### Order matters

```javascript
app.use(express.json());   // must come before routes that read req.body
app.use(cors());

app.get("/users", ...);      // routes registered after middleware
```

Middleware and routes are processed in the order they're registered — middleware that needs to run
before a route (like parsing JSON bodies) must be registered with `app.use()` *before* that route is
defined, exactly the bug pattern you may have already encountered and fixed in your own earlier
project work.

### A simple logging middleware, end to end

```javascript
function logger(req, res, next) {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
}

app.use(logger);
```

This runs for every single request, logging it, then passing control along — a genuinely common,
simple real-world middleware pattern.

## Simple Example

```javascript
function requestTimer(req, res, next) {
  req.startTime = Date.now();
  next();
}

function logDuration(req, res, next) {
  res.on("finish", () => {
    console.log(`${req.method} ${req.path} took ${Date.now() - req.startTime}ms`);
  });
  next();
}

app.use(requestTimer);
app.use(logDuration);
```

## Let's Break It Down

- `requestTimer` attaches a `startTime` property directly onto the `req` object — middleware can
  freely add custom data to `req`/`res`, which later middleware or the route handler can then read.
- `logDuration` listens for the response's `"finish"` event to calculate and log how long the
  request took, using the `startTime` set by the earlier middleware.
- Both call `next()` — since neither is meant to end the request itself, only observe and pass it
  along to whatever comes next.

## Common Mistakes

- **Forgetting to call `next()`**, causing the request to hang indefinitely with no response ever
  sent.
- **Calling `next()` after already sending a response**, causing a "headers already sent" error —
  a middleware should either call `next()` OR send a response, not both.
- **Registering middleware after the routes that need it**, so routes run without the middleware's
  effects (e.g., `req.body` being `undefined` because `express.json()` was registered too late).

## When Should I Use It?

Use middleware for logic that applies across many routes: logging, parsing request bodies, CORS,
authentication checks. Apply it globally with `app.use()` when it should run for every request, or
per-route when it's only relevant to specific endpoints.

## Exercises

1. **(Recall)** What does calling `next()` inside a middleware function actually do?
2. **(Application)** Write a middleware function that rejects any request without a
   `Content-Type: application/json` header on `POST` requests, responding with `400` otherwise.
3. **(Problem Solving)** A request to a route hangs forever with no response and no error in the
   console. A middleware function was recently added before that route. What's the most likely
   cause?

## What Should I Learn Next?

Continue to [`06-validation`](../06-validation) — a deeper, more systematic look at validating
incoming data, beyond simple guard clauses.
