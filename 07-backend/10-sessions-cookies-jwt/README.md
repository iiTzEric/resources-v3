# Sessions, Cookies & JWT

**Module:** Backend Development
**Prerequisites:** [`09-authorization`](../09-authorization)

## What is it?

HTTP itself is **stateless** — each request is independent, with no built-in memory of previous
requests. This topic covers the two main approaches to solving the practical problem this creates
for logged-in users: **sessions** (server-side memory, referenced via a cookie) and **JWTs**
(self-contained tokens, requiring no server-side storage).

## Why does it matter?

Without one of these mechanisms, a user would need to re-authenticate on every single request —
clearly unworkable. Understanding both approaches, and their genuine tradeoffs, is essential for
building (or reasoning about) real authentication systems.

## How does it work?

### Cookies — the delivery mechanism, not the whole solution

```javascript
res.cookie("sessionId", "abc123", { httpOnly: true, secure: true });
```

A **cookie** is a small piece of data the server asks the browser to store, and the browser
automatically re-sends with every subsequent request to that domain. Cookies are the *transport*
mechanism — what's actually inside them (a session ID, or a JWT) determines the overall approach.

- **`httpOnly: true`** — the cookie can't be accessed via JavaScript (`document.cookie`), reducing
  the risk of it being stolen via a cross-site scripting attack (covered in the Security topic).
- **`secure: true`** — the cookie is only sent over HTTPS, never plain HTTP.

### Session-based authentication

1. User logs in successfully.
2. Server creates a session record (in memory, or more commonly a database/cache), storing
   something like `{ sessionId: "abc123", userId: 5 }`.
3. Server sends `sessionId` back as a cookie.
4. On every subsequent request, the browser automatically includes that cookie.
5. Server looks up `sessionId` in its session store, finds the associated `userId`, and knows who's
   making the request.

```javascript
app.get("/profile", (req, res) => {
  const sessionId = req.cookies.sessionId;
  const session = sessionStore.get(sessionId); // server-side lookup
  if (!session) return res.status(401).json({ error: "Not authenticated" });
  res.json({ userId: session.userId });
});
```

The server must maintain this session store somewhere — genuinely simple to reason about, but
requires that shared storage (a real consideration once running multiple server instances).

### JWT (JSON Web Token) — self-contained, no server-side storage needed

A **JWT** encodes information (like `{ userId: 5 }`) directly into the token itself, cryptographically
signed by the server so it can be verified as authentic and untampered-with, without needing to look
anything up in server-side storage:

```javascript
const jwt = require("jsonwebtoken");

const token = jwt.sign({ userId: 5 }, "your-secret-key", { expiresIn: "1h" });
// token is sent to the client, typically stored and sent back in an Authorization header
```

```javascript
function verifyToken(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1]; // "Bearer <token>"
  if (!token) return res.status(401).json({ error: "No token provided" });

  try {
    const payload = jwt.verify(token, "your-secret-key");
    req.user = payload; // { userId: 5 }
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid or expired token" });
  }
}
```

`jwt.verify` checks the token's cryptographic signature — if it hasn't been tampered with (and
hasn't expired), the server can trust the data inside it (`userId: 5`) without any database lookup
at all.

### Sessions vs. JWT — the genuine tradeoffs

- **Sessions**: require server-side storage, but can be immediately invalidated (just delete the
  session record) — genuinely simple to revoke access instantly.
- **JWT**: no server-side storage needed (good for scaling across multiple servers, and for mobile/
  API clients where cookies are less natural), but harder to revoke before expiration, since the
  token itself remains valid until it naturally expires, regardless of server-side state.

Neither is universally "better" — the right choice depends on the specific application's needs
(does immediate revocation matter more, or does avoiding server-side storage matter more).

## Simple Example

```javascript
app.post("/login", async (req, res) => {
  const user = await authenticateUser(req.body.email, req.body.password);
  if (!user) return res.status(401).json({ error: "Invalid credentials" });

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: "24h" });
  res.json({ token });
});

app.get("/profile", verifyToken, async (req, res) => {
  const user = await findUserById(req.user.userId);
  res.json(user);
});
```

## Let's Break It Down

- After successful login, a JWT is issued containing just `userId`, signed with a secret key
  (covered further in the Environment Variables topic — never hardcode this secret directly).
- `/profile` uses `verifyToken` middleware to check the token's validity before proceeding —
  `req.user.userId`, extracted from the verified token, identifies who's making the request without
  any server-side session lookup needed.

## Common Mistakes

- **Storing a JWT secret directly in code** rather than in an environment variable — anyone with
  access to the source code could then forge valid tokens.
- **Assuming JWTs can be easily "logged out" the way sessions can** — without additional
  infrastructure (a token blocklist), a JWT remains valid until it naturally expires.
- **Storing sensitive data directly inside a JWT's payload** — the payload is only signed, not
  encrypted, meaning anyone can decode and read it (just not modify it undetected).

## When Should I Use It?

Use sessions when immediate revocation matters and you're comfortable with server-side storage
(typical for traditional web apps). Use JWTs for stateless APIs, mobile clients, or when scaling
across multiple servers without shared session storage is a priority.

## Exercises

1. **(Recall)** What's the fundamental tradeoff between sessions and JWTs regarding revocation?
2. **(Understanding)** Explain why a JWT's payload should never contain sensitive data, even though
   the token is cryptographically signed.
3. **(Application)** Write middleware that extracts and verifies a JWT from an `Authorization`
   header, attaching the decoded payload to `req.user`, and rejecting the request with `401` if
   missing or invalid.

## What Should I Learn Next?

Continue to [`11-password-hashing`](../11-password-hashing) — exactly how passwords should (and
should never) be stored.
