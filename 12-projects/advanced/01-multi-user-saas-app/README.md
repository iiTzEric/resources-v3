# Multi-User SaaS-Style App

**Level:** Advanced
**Concepts practiced:** Auth, roles/permissions, database relationships, deployment

## What You're Building

A multi-user application with genuine role-based access — for example, a project management tool
where an "organization" has multiple users with different roles (admin, member), and permissions
differ meaningfully by role.

## What Concepts It Teaches

This project combines nearly every module in this curriculum into one cohesive system: full-stack
architecture, careful data modeling with real relationships, role-based authorization at scale, and
genuine deployment to a real, publicly accessible environment.

## Requirements

- Multiple users can belong to a shared "organization" (or team/workspace), with genuinely
  different roles and correspondingly different permissions (Authorization module topic, applied
  at a larger, more realistic scale than a single-owner blog).
- A properly modeled relational structure (or thoughtfully-designed document structure, if using
  MongoDB) reflecting the relationships between organizations, users, and whatever core resource
  your app manages (Keys & Relationships / Data Modeling topics).
- Full authentication, with proper session/token handling.
- A genuinely layered backend architecture (routes/controllers/services), not a single large file.
- Automated tests covering at least the critical authorization logic (Testing topic) — verify, for
  instance, that a "member" role genuinely cannot perform an "admin"-only action, as an actual test,
  not just manual spot-checking.
- Deployed to a real, publicly accessible hosting environment, with environment variables properly
  configured for the production environment (separate from your local development configuration).

## Suggested Features

- An invitation system for adding new members to an organization.
- An audit log of significant actions (connects to the Logging topic).
- Rate limiting and other security hardening from the Security Fundamentals and SWE Practices
  Security topics.

## What You Should Figure Out Yourself

- The exact roles and permission model that fits your specific application's actual needs — don't
  over-engineer a complex permission system for a simple app, but do model genuine, real
  distinctions if your app calls for them.
- Your deployment approach and platform, and how to manage environment-specific configuration
  safely.
- How to structure your database schema/documents to represent the organization-user-resource
  relationships correctly, informed by the Data Modeling topic's guidance.

## Possible Extensions

- Add a billing/subscription tier concept (even if just simulated, not connected to real payments),
  practicing modeling a genuinely more complex real-world business domain.
- Add real-time updates (e.g., via WebSockets) for collaborative features.
- Write integration tests (Testing topic) covering full request/response cycles through your
  authorization logic, not just isolated unit tests.

## Skills Demonstrated

Completing this project demonstrates genuine, independent capability to design and build a
realistically complex, multi-user application with real authorization requirements — the kind of
system that closely resembles real production SaaS applications, built and deployed without
step-by-step guidance.
