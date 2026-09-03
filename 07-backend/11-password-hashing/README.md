# Password Hashing

**Module:** Backend Development
**Prerequisites:** [`10-sessions-cookies-jwt`](../10-sessions-cookies-jwt)

## What is it?

**Hashing** transforms a password into a fixed-length, seemingly random string, in a way that's
effectively impossible to reverse — so that even if a database is compromised, the actual
passwords aren't directly exposed. This is not optional best practice; it's an absolute
requirement for storing passwords responsibly.

## Why does it matter?

Storing passwords in plain text means a single database breach exposes every user's actual
password — genuinely serious, given how many people reuse passwords across different sites. Proper
hashing is one of the most consequential, non-negotiable security practices in backend development.

## How does it work?

### Hashing is one-way — you can't "unhash" a password

```javascript
const bcrypt = require("bcrypt");

const passwordHash = await bcrypt.hash("mypassword123", 10);
console.log(passwordHash);
// something like: $2b$10$N9qo8uLOickgx2ZMRZoMy...
```

There's no function to turn `passwordHash` back into `"mypassword123"` — hashing is deliberately
designed to be a one-way transformation. This is fundamentally different from encryption
(reversible, given the right key) — hashing a password is the correct approach specifically
*because* you never actually need the original password back; you only ever need to check whether
a *newly provided* password matches.

### Verifying a password — hash and compare, never "decrypt and compare"

```javascript
const isCorrect = await bcrypt.compare("mypassword123", passwordHash);
// true
```

`bcrypt.compare` hashes the newly provided password using the same algorithm and settings, and
checks whether the result matches the stored hash — it never attempts to reverse the stored hash.

### Why you can't just use a simple hash function directly

You might wonder why not simply use a general-purpose hash function. The reason bcrypt (and
similar algorithms like Argon2) are specifically designed for passwords: they're deliberately slow
and computationally expensive, on purpose. A general-purpose hash function optimized for speed
makes it *easier* for an attacker to try billions of password guesses per second against a stolen
hash database (a "brute-force" attack) — bcrypt's deliberate slowness makes this dramatically less
practical, without meaningfully slowing down the one legitimate hash-and-compare operation your
own login flow needs to do.

### Salting — protecting against precomputed attacks

```javascript
const passwordHash = await bcrypt.hash("mypassword123", 10); // 10 is the "salt rounds"
```

A **salt** is random data mixed into the password before hashing, ensuring that even two users
with the *identical* password get completely different resulting hashes. This defends against
**rainbow table attacks** — precomputed tables of hashes for common passwords, which only work if
identical passwords always produce identical hashes. bcrypt handles salting for you automatically
— you don't need to manage it manually.

### The complete, correct flow

```javascript
// Signup
const passwordHash = await bcrypt.hash(req.body.password, 10);
await saveUser({ email: req.body.email, passwordHash });

// Login
const user = await findUserByEmail(req.body.email);
const isValid = user && await bcrypt.compare(req.body.password, user.passwordHash);
if (!isValid) {
  return res.status(401).json({ error: "Invalid credentials" });
}
```

Notice `user &&` before calling `bcrypt.compare` — this correctly short-circuits (per the
JavaScript Operators topic) if no matching user was even found, avoiding an error from trying to
compare against a nonexistent `passwordHash`.

## Simple Example

```javascript
const bcrypt = require("bcrypt");

async function createAccount(email, plainPassword) {
  const passwordHash = await bcrypt.hash(plainPassword, 10);
  return { email, passwordHash };
}

async function checkPassword(plainPassword, storedHash) {
  return bcrypt.compare(plainPassword, storedHash);
}
```

## Let's Break It Down

- `createAccount` never stores `plainPassword` itself — only the resulting `passwordHash` gets
  saved.
- `checkPassword` never attempts to reverse `storedHash` — it hashes the freshly provided password
  and compares the results, exactly the correct, secure pattern.
- The number `10` (salt rounds) controls how computationally expensive the hashing process is —
  higher numbers are more secure but slower; `10` is a commonly used, reasonable default.

## Common Mistakes

- **Storing plain-text passwords** — an unambiguous, serious security failure, still unfortunately
  common in poorly-built systems.
- **Using a fast, general-purpose hash function (like plain SHA-256) for passwords** instead of a
  purpose-built, deliberately slow algorithm like bcrypt.
- **Attempting to "decrypt" a password hash** to check it — hashing is one-way; the only correct
  verification method is hash-and-compare.
- **Manually implementing your own salting scheme** instead of relying on bcrypt's built-in,
  well-tested handling of this.

## When Should I Use It?

Always hash passwords with a purpose-built algorithm (bcrypt or similar) before ever storing them —
with zero exceptions, regardless of the project's size or perceived importance.

## Exercises

1. **(Recall)** Why is hashing described as "one-way," and why does that matter for password
   storage?
2. **(Understanding)** Explain why bcrypt's deliberate slowness is a security feature, not a flaw.
3. **(Application)** Write the signup and login logic for a simple app, using `bcrypt.hash` and
   `bcrypt.compare` correctly.

## What Should I Learn Next?

Continue to [`12-file-uploads`](../12-file-uploads) — handling files sent from a client, a
different kind of request data than JSON.
