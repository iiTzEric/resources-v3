# Authenticated Blog Platform

**Level:** Intermediate
**Concepts practiced:** Authentication (email/password + OAuth), authorization, protected routes

## What You're Building

A blog platform where users can sign up, log in (via email/password and, as a stretch goal, Google
OAuth), write and publish posts, and only edit/delete their own posts.

## What Concepts It Teaches

This project applies the Backend module's Authentication, Authorization, Sessions/Cookies/JWT, and
Password Hashing topics together as a real, working system — the specific, security-sensitive area
this curriculum repeatedly emphasized deserves particular care and real understanding, not just
copied code.

## Requirements

- User signup with email/password, passwords properly hashed (never stored in plain text —
  Password Hashing topic).
- Login issuing a session or JWT (your choice, informed by the Sessions/Cookies/JWT topic's
  tradeoffs).
- Protected routes: creating/editing/deleting a post requires being logged in.
- Authorization: a user can only edit or delete their **own** posts, enforced on the backend, not
  just hidden in the UI (Authorization topic's core lesson).
- A public list of all published posts, viewable without logging in.
- Proper error handling: invalid login attempts, expired sessions/tokens, and unauthorized actions
  should all produce clear, appropriate responses (correct status codes from the HTTP In Depth
  topic).

## Suggested Features

- Google OAuth as an alternative to email/password signup (a genuine stretch goal, given the real
  complexity OAuth involves — using an established library rather than implementing the flow from
  scratch, per the Authentication topic's guidance).
- Comments on posts, with their own authorization rules (only the comment's author or the post's
  author can delete a comment).
- A basic "my posts" dashboard for a logged-in user.

## What You Should Figure Out Yourself

- Session-based versus JWT-based authentication — make a deliberate choice and be able to explain
  your reasoning, referencing the genuine tradeoffs from that topic.
- The exact shape of your user and post data models, and their relationship (Keys & Relationships /
  Data Modeling topics, whichever database type you choose).
- How your React frontend tracks "is the user currently logged in" and reflects that in the UI
  (Context topic is a strong candidate here).

## Possible Extensions

- Rich text or Markdown support for post content.
- Rate limiting on login attempts (Security Fundamentals topic) to reduce brute-force risk.
- Deploy with environment-specific configuration (Environment Variables topic) for a real
  production database, separate from your development one.

## Skills Demonstrated

Completing this project demonstrates genuine, careful command of authentication and authorization —
correctly distinguishing the two, hashing passwords properly, and enforcing real security boundaries
on the backend rather than only in the UI — exactly the security-sensitive competence a project like
the mental health app discussed earlier in this curriculum's planning would require.
