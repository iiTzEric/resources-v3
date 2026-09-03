# Authentication

**Module:** Backend Development
**Prerequisites:** [`07-error-handling`](../07-error-handling)

## What is it?

**Authentication** is the process of proving who a user is — commonly, via email/password, or by
delegating to a third-party provider (Google, GitHub) via **OAuth**. This is the direct foundation
for any application requiring user accounts, including the mental health app discussed earlier in
this curriculum's planning.

## Why does it matter?

Almost every real application with user accounts needs authentication, and getting it wrong has
serious, genuine security consequences — this topic (and the related Password Hashing, Sessions/
JWT topics) deserves careful attention, not a rushed implementation.

## Mental Model

Authentication is like showing ID at a building's front desk: you prove who you are once (showing a
password, or being vouched for by a trusted third party like Google), and get something — a badge,
a token — that lets you move through the building afterward without re-proving your identity at
every single door.

## How does it work?

### Email/password authentication, conceptually

1. **Sign up**: user provides email + password. The password is **hashed** (never stored in plain
   text — covered in depth in the Password Hashing topic) and saved, associated with their account.
2. **Log in**: user provides email + password again. The server hashes the provided password the
   same way, and compares it to the stored hash.
3. **If they match**: the server considers the user authenticated, and issues something (a session,
   or a token — covered in the Sessions/Cookies/JWT topic) proving this for subsequent requests.

```javascript
const bcrypt = require("bcrypt");

app.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  const passwordHash = await bcrypt.hash(password, 10);
  // save { email, passwordHash } to the database
  res.status(201).json({ message: "Account created" });
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await findUserByEmail(email); // from your database
  if (!user) return res.status(401).json({ error: "Invalid credentials" });

  const isValid = await bcrypt.compare(password, user.passwordHash);
  if (!isValid) return res.status(401).json({ error: "Invalid credentials" });

  // issue a session or token here (next topic)
  res.json({ message: "Logged in" });
});
```

Notice: both failure cases (user not found, wrong password) return the **same generic error
message** and status code — deliberately, so an attacker can't use the API's response to determine
whether a specific email address even has an account (a real, meaningful security consideration).

### OAuth — authenticating via a trusted third party

Instead of managing passwords yourself, **OAuth** lets a user log in via an existing account with
another provider (Google, GitHub) — the provider handles verifying the user's identity, and your
application receives confirmation plus some basic profile information, without ever seeing the
user's actual Google/GitHub password.

The general flow: your app redirects the user to Google's login page → the user logs in (or is
already logged in) and approves your app's access → Google redirects back to your app with a
temporary code → your backend exchanges that code (server-to-server) for the user's basic profile
information (name, email) → your app creates or looks up a corresponding local user account.

Implementing this correctly from scratch involves genuine cryptographic and security detail beyond
this introductory topic's scope — in practice, most real projects use a well-established library
(like Passport.js) or a dedicated auth service (like Firebase Auth or Auth0) rather than
hand-rolling the OAuth flow themselves, precisely because getting it wrong has real security
consequences.

### Why "roll your own" auth is genuinely risky

Authentication is one of the areas where using a well-established, widely-audited library or
service is usually the right professional choice over writing everything from scratch — subtle
mistakes (timing attacks, improper token handling, weak hashing) can have serious real
consequences, and these exact mistakes have already been made and fixed by mature, widely-used
tools.

## Simple Example

```javascript
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  const user = await findUserByEmail(email);
  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  res.json({ message: "Login successful" });
});
```

## Let's Break It Down

- Input is validated first, following the guard-clause pattern from earlier topics.
- Both "user doesn't exist" and "password doesn't match" are checked together in one condition,
  producing the exact same generic error message either way — deliberately avoiding revealing which
  specific case occurred.
- `bcrypt.compare` handles the actual password comparison securely (covered fully in the next
  topic) — you never manually compare plain-text passwords directly.

## Common Mistakes

- **Storing passwords in plain text** — a serious, well-known security failure, covered in depth
  next.
- **Revealing whether an email exists via different error messages** for "user not found" vs.
  "wrong password" — this can help an attacker enumerate valid accounts.
- **Hand-rolling OAuth or complex auth flows from scratch** without using an established library or
  service, risking subtle but serious security mistakes.

## When Should I Use It?

Implement email/password authentication using established libraries (`bcrypt` for hashing, as
shown) rather than inventing your own approach. Use OAuth (via a proven library or service) when
you want to offer "Sign in with Google" or similar, rather than implementing the OAuth protocol
yourself from scratch.

## Exercises

1. **(Recall)** Why should "user not found" and "incorrect password" return the same generic error
   message?
2. **(Understanding)** Explain, at a high level, what OAuth allows an application to do without
   ever seeing the user's actual password for the third-party provider.
3. **(Application)** Sketch (in pseudocode) a signup route that validates input, checks whether the
   email is already registered, and only then proceeds to create an account.

## What Should I Learn Next?

Continue to [`09-authorization`](../09-authorization) — once a user is authenticated, determining
what they're actually allowed to do.
