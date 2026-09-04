# Security Practices

**Module:** Software Engineering Practices
**Prerequisites:** [`11-refactoring-and-technical-debt`](../11-refactoring-and-technical-debt)

## What is it?

This topic broadens the Backend module's Security Fundamentals (SQL injection, XSS, CSRF) into
general defensive habits that apply across any layer of a stack — frontend, backend, dependencies,
and deployment — framed as an ongoing engineering discipline rather than a one-time checklist.

## Why does it matter?

Security isn't a feature you add once — it's a set of habits and awareness applied continuously,
throughout a codebase's entire life. This topic consolidates security-relevant principles already
covered throughout this curriculum into a single, unified mindset.

## How does it work?

### The recurring theme, stated explicitly one more time

Nearly every security practice covered throughout this curriculum traces back to two root ideas:
**never trust input from outside your system** (users, other services, even your own frontend, since
it can be bypassed), and **expose only the minimum necessary capability/information** (the principle
of least privilege).

### Dependency security — a genuinely real, often overlooked risk

```bash
npm audit
```

Third-party packages (from the Fundamentals Modules & Packages lesson) can themselves contain known
security vulnerabilities, discovered after you've already installed them. `npm audit` (and similar
tools for other ecosystems) checks your project's dependencies against known vulnerability
databases — a genuinely important, easy habit, since a vulnerability in a widely-used dependency can
affect a huge number of applications simultaneously once discovered.

### Least privilege — applied broadly

- **Database access**: an application's database user should have only the specific permissions it
  actually needs (read/write to specific tables), not full administrative access.
- **API keys/tokens**: scope tokens to the minimum permissions actually required for their specific
  purpose, rather than defaulting to broad, unrestricted access.
- **User roles** (from the Authorization topic): grant users only the capabilities their role
  genuinely requires.

### Keeping secrets and dependencies current

Combining earlier topics: environment variables keep secrets out of source code; regularly updating
dependencies (informed by `npm audit` and similar tools) keeps known, patched vulnerabilities from
lingering in your application indefinitely.

### Security as a mindset during code review

Recall the Code Reviews topic's checklist — "security concerns" was explicitly listed as something
a good review considers. Concretely: does this change trust any new input without validation? Does
it expose more data than necessary in a response? Does it introduce a new place where a secret
might accidentally get logged or committed?

### A practical, ongoing checklist

- Validate and sanitize all external input, on the server, always (Backend module).
- Use parameterized queries, never string-concatenated ones (Databases/Security topics).
- Hash passwords properly; never log secrets (Backend module).
- Keep dependencies updated and audited.
- Apply least privilege to database access, API tokens, and user roles.
- Use HTTPS everywhere, always, in production.

## Simple Example

A security-minded code review comment, tying several practices together:

```
"This endpoint returns the full user object, including passwordHash, even
though the frontend only needs `name` and `email`. Could we select only
the needed fields before sending the response? Also worth running
`npm audit` -- I noticed this PR added a new dependency."
```

## Let's Break It Down

- The first concern applies **least privilege** to API responses — exposing more data
  (`passwordHash`) than a client genuinely needs is a real, avoidable risk, even if the hash itself
  is properly secured elsewhere.
- The second concern applies routine dependency-security hygiene to a new addition, exactly the kind
  of habit worth building into a standard review checklist rather than treating as a separate,
  occasional task.

## Common Mistakes

- **Returning entire database records/documents in API responses**, including fields (password
  hashes, internal flags) the client has no legitimate need to see.
- **Never running dependency audits**, leaving known, patchable vulnerabilities in a project
  indefinitely.
- **Treating security as someone else's job** ("the security team will catch it") rather than a
  responsibility woven through everyone's everyday engineering work.

## When Should I Use It?

Apply these habits continuously, as a default part of writing and reviewing code — not as a
separate, occasional "security pass" done rarely. Run dependency audits regularly, and factor
security explicitly into code review, exactly as covered in that topic's checklist.

## Exercises

1. **(Recall)** What are the two root ideas most of this curriculum's security practices trace back
   to?
2. **(Application)** Identify what's wrong with an API response returning
   `{ id, name, email, passwordHash, internalNotes }` to a public-facing frontend, and describe the
   fix.
3. **(Problem Solving)** `npm audit` reports a high-severity vulnerability in a dependency your
   project relies on. Describe the general steps you'd take to address it responsibly.

## What Should I Learn Next?

Continue to
[`13-performance-and-maintainability`](../13-performance-and-maintainability) — balancing the
speed of ongoing development against a codebase's long-term health.
