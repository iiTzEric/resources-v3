# Logging

**Module:** Backend Development
**Prerequisites:** [`12-file-uploads`](../12-file-uploads)

## What is it?

**Logging** means deliberately recording information about what your application is doing — 
requests received, errors encountered, significant events — so you (and your team) can understand
what happened, especially when debugging an issue after the fact, on a server you can't directly
watch in real time.

## Why does it matter?

Once an application is running on a real server (rather than your own machine during development),
you can't just watch `console.log` output live — logs are often the *only* record of what actually
happened when something goes wrong. Thoughtful logging is what makes production issues diagnosable
at all.

## How does it work?

### Beyond `console.log` — structured logging

```javascript
console.log("User logged in:", userId); // works, but hard to search/filter at scale
```

```javascript
const winston = require("winston"); // a common logging library
const logger = winston.createLogger({
  transports: [new winston.transports.Console()]
});

logger.info("User logged in", { userId });
logger.error("Failed to process payment", { orderId, error: error.message });
```

Dedicated logging libraries (like `winston` or `pino`) provide **log levels** (info, warn, error),
structured data (rather than just concatenated strings), and the ability to route logs to different
destinations (console during development, a file or external service in production) — genuinely
more useful at scale than plain `console.log`.

### Log levels — not everything is equally important

- **`error`** — something genuinely went wrong and needs attention.
- **`warn`** — something unexpected happened, but the application recovered.
- **`info`** — normal, expected significant events (a user logged in, an order was placed).
- **`debug`** — detailed information useful during development, typically not needed in production.

Using appropriate levels lets you filter logs by severity later — searching only `error` logs when
investigating an incident, for instance, rather than wading through every routine `info` log.

### What to log, and what never to log

Genuinely useful to log: request method/path, response status/duration, errors with enough context
to diagnose them, significant business events (account created, payment processed).

**Never log sensitive data**: passwords (even hashed ones, generally), full credit card numbers,
authentication tokens, or other personal data that shouldn't persist in log files, which are often
less carefully secured/monitored than a primary database.

```javascript
// WRONG — logs a raw password
logger.info("Login attempt", { email, password });

// Better — logs relevant, non-sensitive context
logger.info("Login attempt", { email });
```

### Logging middleware — capturing every request

```javascript
function requestLogger(req, res, next) {
  const start = Date.now();
  res.on("finish", () => {
    logger.info("Request completed", {
      method: req.method,
      path: req.path,
      status: res.statusCode,
      duration: Date.now() - start
    });
  });
  next();
}

app.use(requestLogger);
```

This captures a consistent record of every request, its outcome, and how long it took — genuinely
valuable for understanding an application's real-world behavior and diagnosing slow or failing
routes after the fact.

## Simple Example

```javascript
app.post("/orders", async (req, res) => {
  try {
    const order = await createOrder(req.body);
    logger.info("Order created", { orderId: order.id, userId: req.user.id });
    res.status(201).json(order);
  } catch (error) {
    logger.error("Failed to create order", { userId: req.user.id, error: error.message });
    res.status(500).json({ error: "Failed to create order" });
  }
});
```

## Let's Break It Down

- Success and failure are logged at different, appropriate levels (`info` vs `error`), each with
  relevant context (`orderId`, `userId`) but nothing sensitive.
- The client receives a generic error message (from the Error Handling topic's guidance on not
  leaking internal details), while the *server-side log* captures the actual error message for
  real debugging — two different audiences, two appropriately different levels of detail.

## Common Mistakes

- **Logging sensitive data** (passwords, tokens, full personal details) that shouldn't persist in
  log files.
- **Relying solely on `console.log`** in a production application, missing structured levels,
  filtering, and routing to appropriate destinations.
- **Under-logging errors** — catching an error and doing nothing to record it means a real problem
  can occur with zero trace of what happened, making it far harder to diagnose later.

## When Should I Use It?

Log significant events, errors, and request/response summaries in any real application, using
appropriate severity levels. Never log sensitive data, regardless of how useful it might seem for
debugging in the moment.

## Exercises

1. **(Recall)** What's the difference in purpose between `info`, `warn`, and `error` log levels?
2. **(Understanding)** Explain why logging a user's raw password, even during a failed login
   attempt for debugging purposes, is a genuine security risk.
3. **(Application)** Write logging statements for a route that processes a payment: log the
   attempt, and log either success or failure with relevant (non-sensitive) context.

## What Should I Learn Next?

Continue to [`14-security`](../14-security) — common backend vulnerabilities and baseline
defenses every application should have.
