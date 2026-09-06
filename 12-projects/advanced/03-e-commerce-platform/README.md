# E-Commerce Platform

**Level:** Advanced
**Concepts practiced:** Complex data modeling, payments concepts, testing, security, performance

## What You're Building

A functioning e-commerce platform: product catalog, shopping cart, checkout flow, and order
history — the most complete, integrative capstone project in this curriculum.

## What Concepts It Teaches

This project genuinely requires nearly everything covered across all 12 modules: complex,
interrelated data modeling (products, orders, users, inventory), transactional integrity
(Transactions & Constraints topic — an order and its inventory deduction must succeed or fail
together), realistic performance considerations at scale (Query Performance, N+1 problem), and
careful security practice throughout (payment-adjacent data deserves particular care).

## Requirements

- A product catalog with categories, search, and filtering (API Architecture topic's pagination/
  filtering patterns).
- A shopping cart that persists across a session (and ideally across devices, if a user is logged
  in — meaning it should live in your database, not just `localStorage`).
- A checkout flow that creates an order and correctly, atomically updates inventory (Transactions
  topic — this must not allow a race condition where two users could simultaneously "buy" the last
  unit of an item and both succeed).
- **Payment integration is simulated, not real** — do not process real payments or handle real
  card data in a learning project; use a mock payment step, or a test-mode integration with a
  provider offering one, that clearly never touches real financial data.
- An order history view for logged-in users.
- Meaningful automated test coverage (Testing topic) for the checkout/inventory logic specifically,
  given its correctness is genuinely critical.
- Reasonable performance consideration for the product catalog as it scales — appropriate indexing
  (Indexes topic) and avoidance of N+1 queries (Query Performance topic) when displaying products
  with related data (e.g., reviews, category info).

## Suggested Features

- Product reviews and ratings.
- An admin view for managing inventory and viewing orders.
- Email notifications on order confirmation (a genuine, real integration with an email-sending
  service).

## What You Should Figure Out Yourself

- Your complete data model — products, orders, order items, users, and how they all relate (Data
  Modeling topic, applied at real complexity).
- How to handle the inventory-race-condition problem correctly, using transactions or another
  approach you can clearly justify.
- Your testing strategy — which parts of this system most need automated test coverage, and why
  (Testing topic's guidance on where tests provide the most value).

## Possible Extensions

- A recommendation feature ("customers who bought this also bought...").
- A genuinely deployed, production-configured version with proper environment separation.
- Load-testing your checkout flow to identify real performance bottlenecks, then addressing them
  deliberately (Performance & Maintainability topic's "measure before optimizing" guidance,
  applied for real).

## Skills Demonstrated

Completing this project demonstrates the ability to design, build, secure, and test a genuinely
complex, realistic application — synthesizing the entire curriculum's fundamentals, frontend,
backend, database, algorithmic, and professional-practice content into one complete, working
system. This is the capstone this entire learning path has been building toward.
