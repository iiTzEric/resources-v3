# Software Engineering Learning Path

A structured, from-scratch software engineering curriculum — not a pile of notes. The goal is to
take someone from "how does a program even run" to being able to build, secure, test, and deploy a
real full-stack application, understanding *why* things work, not just *which syntax to type*.

## Start here

1. Read [`CURRICULUM_MAP.md`](./CURRICULUM_MAP.md) for the full module order and the reasoning
   behind it.
2. Go to [`01-fundamentals/`](./01-fundamentals) and start at topic `01`.
3. Work through modules in order. Within a module, topics are numbered and meant to be done in
   sequence — each one generally assumes the last.
4. After finishing a module (or a few related modules), attempt the matching project in
   [`12-projects/`](./12-projects) before moving on. Concepts that feel solid in isolation often
   reveal gaps the moment you have to combine them.

## How each lesson is structured

Most topics follow a consistent format, used where it actually helps (not forced onto every
trivial subtopic):

- **What is it?** — a simple definition, in plain language first.
- **Why does it matter?** — the real problem it solves.
- **How does it work?** — the mechanism, explained simply before any jargon.
- **Simple Example** — a small, concrete example.
- **Let's Break It Down** — the example explained step by step.
- **Common Mistakes** — what beginners typically get wrong, and *why* it's a mistake, not just that
  it is one.
- **When Should I Use It?** — practical guidance, including when *not* to use it.
- **Exercises** — progressing from recall, to understanding, to application, to problem-solving.
  Some exercises ask you to explain a tradeoff or debug a failure, not just write code.
- **What Should I Learn Next?** — a link forward, so the path stays a path.

Difficult concepts also get a **mental model** — a simple analogy (HTTP as ordering at a
restaurant, closures as a backpack a function carries with it, git as snapshots of a project) — but
the analogy always sits *alongside* the real technical explanation, not instead of it.

## Projects

Projects are graded by level and live in [`12-projects/`](./12-projects):

- **Beginner** — small, single-concept projects (a portfolio site, a to-do app, a CLI game).
- **Intermediate** — projects that require combining a frontend, a backend, a database, and real
  application logic (a full-stack notes app, an authenticated blog).
- **Advanced** — larger systems requiring architecture decisions, security awareness, testing, and
  performance thinking (a multi-user app, a realtime chat app, an e-commerce platform).

Each project brief tells you what you're building and what it teaches — deliberately not the full
solution. Part of the exercise is figuring out some of the implementation decisions yourself.

## A note on using AI while working through this

AI tools (including the one that helped generate this curriculum) are genuinely useful for
learning — but see [`11-working-with-ai/`](./11-working-with-ai) early. The short version: use AI
to explain, unblock, and review — not to write code you then ship without understanding. If you
can't explain what a piece of code does and why it's shaped that way, that's a signal to slow down,
not a signal to move faster.

## Status

This is being built out module by module. The full structure and topic map exist now; lesson
content is being filled in starting with Fundamentals. See `CURRICULUM_MAP.md` for exactly what's
written versus placeholder at any given point.
