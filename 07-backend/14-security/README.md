# Security Fundamentals

**Module:** Backend Development
**Prerequisites:** [`13-logging`](../13-logging)

## What is it?

This topic covers common backend vulnerabilities — SQL/NoSQL injection, XSS, CSRF — and baseline
defenses against each. Many of these connect directly back to principles already covered
throughout this curriculum (never trust client input, hash passwords), now named and framed
explicitly as security concerns.

## Why does it matter?

Security mistakes can have serious, real consequences: data breaches, unauthorized access, and
genuine harm to real users. Understanding these common vulnerability categories, even at an
introductory level, is essential baseline knowledge for anyone building a real backend.

## How does it work?

### Injection attacks — untrusted input executed as code

```javascript
// VULNERABLE (conceptual SQL example)
const query = `SELECT * FROM users WHERE email = '${req.body.email}'`;
```

If `req.body.email` contains something like `' OR '1'='1`, the resulting query's logic could be
manipulated entirely — this is **SQL injection**, and it's precisely why raw string concatenation
into a database query is dangerous. The Databases module covers **parameterized queries** — the
correct, standard defense, where user input is passed separately from the query structure, never
directly concatenated into it.

### Cross-Site Scripting (XSS) — injecting malicious scripts into a page

If user-provided content is rendered directly as HTML without sanitization, an attacker could
submit content containing a `<script>` tag that runs in *other users'* browsers when they view that
content:

```javascript
// If a comment contains: <script>stealCookies()</script>
// and it's rendered with innerHTML instead of textContent, that script actually runs
element.innerHTML = userComment; // dangerous with untrusted content
```

This connects directly back to the JavaScript DOM topic's guidance: prefer `textContent` over
`innerHTML` for untrusted content, since `textContent` never interprets its input as executable
HTML/script.

### Cross-Site Request Forgery (CSRF) — tricking a logged-in user's browser into an unwanted action

A malicious site could attempt to trigger a request to your API using the victim's own
already-authenticated session (since cookies are automatically sent by the browser to their
associated domain, regardless of which site initiated the request). Defenses include CSRF tokens
(a unique, unpredictable value the legitimate frontend includes with state-changing requests) and
configuring cookies with `SameSite` attributes restricting when they're sent.

### Rate limiting — preventing abuse through sheer volume

```javascript
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per window
});

app.use(limiter);
```

Without rate limiting, an API is vulnerable to brute-force attacks (rapidly guessing passwords) or
simple resource exhaustion from excessive requests.

### HTTPS — encrypting data in transit

Covered in the Web Fundamentals module — always use HTTPS in production, never plain HTTP,
especially for anything involving authentication or sensitive data.

### The recurring theme across all of these

Nearly every vulnerability here traces back to one of two root causes already emphasized throughout
this curriculum: **trusting client input without validation/sanitization**, or **exposing more
capability/information than genuinely necessary**. Security isn't really a separate skill from
everything else you've learned — it's applying the same "never trust the client" and "validate
everything" principles specifically with an adversarial mindset.

## Simple Example

```javascript
const rateLimit = require("express-rate-limit");

app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));
app.use(express.json());

app.post("/comments", requireAuth, (req, res) => {
  const sanitizedText = sanitizeHtml(req.body.text); // strip/escape dangerous content
  // save sanitizedText, never the raw, unsanitized input
});
```

## Let's Break It Down

- Rate limiting is applied globally, protecting the entire API from excessive request volume.
- User-provided comment text is sanitized before storage — ensuring that even if it later gets
  rendered somewhere as HTML, no malicious script content could execute in another user's browser.
- `requireAuth` ensures only genuinely authenticated users can post comments at all, connecting
  back to the Authentication topic.

## Common Mistakes

- **Concatenating user input directly into database queries** instead of using parameterized
  queries.
- **Rendering untrusted user content as raw HTML** without sanitization.
- **No rate limiting on sensitive endpoints** (login, password reset), leaving them vulnerable to
  brute-force attempts.
- **Treating security as a separate, optional add-on** rather than a consideration woven through
  every part of how an application handles data.

## When Should I Use It?

Apply these defenses by default in any real backend: parameterized queries always, sanitize any
user content that might be rendered as HTML, rate-limit sensitive endpoints, and always use HTTPS
in production.

## Exercises

1. **(Recall)** What do SQL injection, XSS, and CSRF each specifically target or exploit?
2. **(Understanding)** Explain why string-concatenating user input into a database query is
   dangerous, and what a parameterized query does differently.
3. **(Application)** Identify what's wrong with this code and describe the fix:
   `db.query("SELECT * FROM products WHERE id = " + req.params.id)`

## What Should I Learn Next?

Continue to
[`15-environment-variables`](../15-environment-variables) — keeping secrets like database
credentials and JWT keys out of your source code entirely.
