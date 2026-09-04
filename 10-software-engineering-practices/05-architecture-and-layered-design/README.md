# Architecture & Layered Design

**Module:** Software Engineering Practices
**Prerequisites:** [`04-design-patterns`](../04-design-patterns)

## What is it?

**Architecture** is the high-level structure of an entire application — how major pieces (frontend,
backend, database, external services) fit together, and how responsibilities are divided among
them. This zooms out from individual functions/files (covered in earlier topics) to the whole
system's shape.

## Why does it matter?

You've already built a layered architecture in this curriculum: React frontend → Express backend
(routes/controllers/services) → MongoDB database. Naming and understanding this explicitly helps
you make deliberate architectural decisions on future projects, rather than structure emerging by
accident.

## How does it work?

### The layered architecture you've already built

```
Client (React)
    |
    v (HTTP requests)
Backend API (Express: routes -> controllers -> services)
    |
    v (queries)
Database (MongoDB)
```

Each layer has a clear responsibility and communicates with adjacent layers through a defined
interface (HTTP for client-backend, database queries for backend-database) — this is genuinely a
real, standard architecture, not just a teaching simplification.

### Why layering this way is valuable

- **Independent evolution**: the React frontend can be redesigned without touching the backend, as
  long as the API contract (the shape of requests/responses) stays the same.
- **Independent scaling**: in a real production deployment, the backend and database can be scaled
  independently based on where actual load occurs.
- **Clear boundaries for reasoning**: a bug in how data displays is a frontend concern; a bug in
  data being incorrect is likely a backend/database concern — the layering helps localize where a
  problem likely originates.

### Monolith vs. microservices — a brief, honest comparison

A **monolith** is a single, unified backend application (what you've built) — all backend logic
lives in one deployable unit. **Microservices** split a backend into multiple independent, smaller
services, each responsible for a specific domain (a "users" service, an "orders" service),
communicating with each other over the network.

Microservices offer independent scaling/deployment per service, but introduce genuine complexity:
network communication between services (which can fail, adding a whole new category of things to
handle), more complex debugging (a request might span multiple services), and operational overhead
(deploying and monitoring many separate services instead of one).

**For most projects, including many genuinely successful production applications, a well-structured
monolith is the right starting choice** — microservices solve specific scaling and team-
organization problems that only become relevant at a certain size/complexity, and adopting them
prematurely adds real cost without corresponding benefit.

### Client-server vs. serverless — a brief mention

An alternative to running your own always-on Express server: **serverless** functions (like AWS
Lambda) run your backend code on-demand, per request, without you managing a continuously running
server process. Genuinely useful for certain workloads (infrequent, spiky traffic), with its own
tradeoffs (cold-start latency, different debugging/local-development experience) beyond this
introductory topic's scope.

## Simple Example

The architecture of the User Directory / mental health app style project built throughout this
curriculum, described explicitly:

```
React (components/pages/hooks/api folders)
  -> fetch() calls to ->
Express (routes/controllers/services layers)
  -> Mongoose queries to ->
MongoDB (users, favorites collections)
```

## Let's Break It Down

- Each arrow represents a defined interface — React never queries MongoDB directly; it always goes
  through the Express API, which is precisely the boundary that lets authentication, validation,
  and business logic live in one controlled place (the Backend module's entire point).
- This same three-layer shape scales conceptually to much larger, more complex real applications —
  the specific technologies might differ, but the layered separation of concerns remains a
  consistently valuable structure.

## Common Mistakes

- **Adopting microservices prematurely**, before a project's scale or team size genuinely justifies
  the added operational complexity.
- **Blurring layer boundaries** — letting a frontend component query a database directly, or
  letting business logic leak into a database layer — undoing the benefits layering is meant to
  provide.
- **Assuming one "correct" architecture exists for all projects**, rather than choosing based on
  the project's actual, specific needs and constraints.

## When Should I Use It?

Use a layered monolith architecture (like the one built throughout this curriculum) as a strong,
sensible default for most new projects. Consider microservices, serverless, or other architectural
variations only once a project's specific scale, team structure, or workload genuinely calls for
their particular tradeoffs.

## Exercises

1. **(Recall)** What are the three layers in the architecture you've built throughout this
   curriculum, and what's each one's responsibility?
2. **(Understanding)** Explain one genuine cost of adopting microservices that a well-structured
   monolith avoids.
3. **(Application)** Describe, at a high level, how you'd architect a simple blog application
   (frontend, backend, database), identifying each layer's responsibility.

## What Should I Learn Next?

Continue to
[`06-testing-unit-integration-e2e`](../06-testing-unit-integration-e2e) — verifying that your
architecture's individual pieces, and the whole system together, actually work correctly.
