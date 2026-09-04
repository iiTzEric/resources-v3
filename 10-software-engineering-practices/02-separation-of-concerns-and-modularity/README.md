# Separation of Concerns & Modularity

**Module:** Software Engineering Practices
**Prerequisites:** [`01-clean-code`](../01-clean-code)

## What is it?

**Separation of concerns** means each part of a system (a function, a file, a layer) handles one
distinct responsibility, with minimal overlap. **Modularity** is the resulting structure: a system
built from independent, focused pieces rather than one tangled whole.

## Why does it matter?

You've already applied this principle concretely — splitting Express routes into
routes/controllers/services, and React apps into components/pages/hooks/api. This topic names the
underlying principle explicitly, so you recognize it as a deliberate, general practice, not just
specific patterns for those two frameworks.

## How does it work?

### Recognizing mixed concerns

```javascript
function handleSignup(req, res) {
  // HTTP concern: reading the request
  const { email, password } = req.body;

  // Validation concern
  if (!email.includes("@")) return res.status(400).json({ error: "Invalid email" });

  // Business logic concern
  const hashedPassword = bcrypt.hashSync(password, 10);

  // Data access concern
  db.query(`INSERT INTO users (email, password) VALUES ('${email}', '${hashedPassword}')`);

  // HTTP concern: responding
  res.status(201).json({ message: "Created" });
}
```

This single function mixes at least four distinct concerns: parsing HTTP input, validating data,
business logic (hashing), and data access — genuinely hard to test, reuse, or reason about in
isolation, and (as a side note) also contains a real SQL injection vulnerability from the earlier
Security topic, itself partly a consequence of mixing concerns carelessly.

### Separated

```javascript
// validation.js
function isValidEmail(email) { return email.includes("@"); }

// userService.js
async function createUser(email, password) {
  const hashedPassword = await bcrypt.hash(password, 10);
  return db.users.insert({ email, password: hashedPassword }); // parameterized, safe
}

// controller.js
async function handleSignup(req, res) {
  const { email, password } = req.body;
  if (!isValidEmail(email)) return res.status(400).json({ error: "Invalid email" });
  const user = await createUser(email, password);
  res.status(201).json(user);
}
```

Each piece now has one clear job, is independently testable, and the controller reads as a clear,
high-level sequence of steps rather than a tangle of unrelated logic.

### Why this matters beyond just "feels organized"

- **Testability**: `isValidEmail` and `createUser` can be tested in complete isolation, without
  needing a real HTTP request or response object.
- **Reusability**: `createUser` could be called from a signup route, an admin tool, or a test
  script, without duplicating its logic.
- **Change isolation**: changing how passwords are hashed only requires touching `createUser`, not
  hunting through HTTP-handling code mixed in with it.

### Applying this beyond backend/frontend layering

This principle applies at every scale: a single function should have one job (Clean Code topic); a
file should represent one coherent concept; a whole application's layers (frontend, backend,
database) should each own their distinct responsibility.

## Simple Example

```javascript
// Mixed concerns
function renderUserCard(user) {
  const age = new Date().getFullYear() - user.birthYear; // calculation mixed into rendering
  return `<div>${user.name} (${age})</div>`;
}

// Separated
function calculateAge(birthYear) {
  return new Date().getFullYear() - birthYear;
}

function renderUserCard(user) {
  const age = calculateAge(user.birthYear);
  return `<div>${user.name} (${age})</div>`;
}
```

## Let's Break It Down

- `calculateAge` is a pure, independently testable calculation with no rendering concerns mixed in.
- `renderUserCard` now focuses purely on producing markup, using `calculateAge`'s result rather than
  computing it inline.
- This separation means age-calculation logic could be reused (in a different component, a report,
  a test) without duplicating it, and each piece can be tested/verified independently.

## Common Mistakes

- **Writing functions/files that mix unrelated concerns** out of convenience, making them harder to
  test, reuse, and change safely.
- **Over-separating trivial logic** into excessive layers/files for genuinely simple operations,
  adding unnecessary indirection without real benefit — like any principle, this can be overapplied.
- **Not recognizing mixed concerns as a real cost** until a codebase has grown large enough that the
  tangled structure becomes genuinely painful to work with.

## When Should I Use It?

Apply separation of concerns as a default habit once code does more than one distinct thing — the
backend layering and React folder structure you've already learned are concrete applications of
this same underlying principle. Balance against over-engineering: a two-line helper doesn't need
its own dedicated file and layer.

## Exercises

1. **(Recall)** Name the four distinct concerns mixed together in the original `handleSignup`
   example.
2. **(Application)** Refactor a function that fetches data, filters it, and formats it as HTML all
   in one place, into three separate, focused functions.
3. **(Problem Solving)** A teammate says "splitting this into more files just adds complexity."
   Under what circumstances would you agree, and under what circumstances would you push back?

## What Should I Learn Next?

Continue to [`03-dry-kiss-solid`](../03-dry-kiss-solid) — naming several more core design
principles, and importantly, when they can be overapplied.
