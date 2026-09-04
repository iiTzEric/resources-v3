# Testing (Unit, Integration, E2E)

**Module:** Software Engineering Practices
**Prerequisites:** [`05-architecture-and-layered-design`](../05-architecture-and-layered-design)

## What is it?

**Automated testing** means writing code that verifies your application behaves correctly, run
repeatedly and automatically, rather than manually checking behavior by hand every time (exactly
what you did throughout this curriculum's practical `curl` verification steps — testing formalizes
and automates that same instinct).

## Why does it matter?

Manual verification (clicking through an app, running `curl` commands) doesn't scale — every change
risks silently breaking something you didn't think to manually re-check. Automated tests catch
regressions immediately, and give you confidence to change code without fear of silently breaking
something elsewhere.

## How does it work?

### Unit tests — testing one small piece in isolation

```javascript
// Using a testing framework like Jest
function add(a, b) {
  return a + b;
}

test("add() sums two numbers correctly", () => {
  expect(add(2, 3)).toBe(5);
});
```

A **unit test** verifies one small, isolated piece of logic (a single function) — fast to run,
precise about exactly what broke if it fails. This directly benefits from the separation of
concerns covered earlier: small, focused functions are dramatically easier to unit test than large,
tangled ones.

### Integration tests — testing multiple pieces working together

```javascript
test("POST /users creates a user in the database", async () => {
  const response = await request(app).post("/users").send({ name: "Alice" });
  expect(response.status).toBe(201);

  const user = await User.findOne({ name: "Alice" });
  expect(user).not.toBeNull();
});
```

An **integration test** verifies that multiple pieces (here, the Express route, the database) work
correctly *together* — closer to your real `curl` testing from the Backend module's practical work,
now automated and repeatable rather than manual.

### End-to-end (E2E) tests — testing the entire application as a real user would

```javascript
// Conceptual, using a tool like Playwright or Cypress
test("user can sign up and see their dashboard", async ({ page }) => {
  await page.goto("/signup");
  await page.fill("#email", "test@example.com");
  await page.click("button[type=submit]");
  await expect(page.locator("h1")).toHaveText("Welcome!");
});
```

An **E2E test** drives an actual browser, simulating real user interactions through the entire
stack — frontend, backend, database — verifying the complete flow works as a real user would
experience it. Slower and more brittle than unit/integration tests, but catches issues that only
appear when all the pieces genuinely interact together.

### The testing pyramid — a common guiding heuristic

A commonly recommended balance: **many** fast unit tests, **fewer** integration tests, and a
**small number** of E2E tests covering only the most critical user flows. This reflects a real
tradeoff: unit tests are fast and precise but don't catch integration issues; E2E tests catch real
end-to-end problems but are slow, more brittle, and expensive to maintain — a healthy test suite
usually leans heavily toward the fast, precise end while still having some coverage at the top.

### What makes a good test

- **Tests one clear thing** — a failing test should immediately tell you roughly what's wrong.
- **Doesn't depend on other tests' order or state** — each test should be able to run independently
  and in any order.
- **Tests behavior, not implementation details** — testing *what* a function returns for given
  input, not *how* it internally computes it, so refactoring the internals doesn't break tests that
  shouldn't care.

## Simple Example

```javascript
function calculateDiscount(price, isVip) {
  if (isVip) return price * 0.8;
  return price;
}

test("applies 20% discount for VIP customers", () => {
  expect(calculateDiscount(100, true)).toBe(80);
});

test("applies no discount for regular customers", () => {
  expect(calculateDiscount(100, false)).toBe(100);
});
```

## Let's Break It Down

- Two separate tests cover two distinct behaviors (VIP discount applied, no discount for regular
  customers) — if either breaks in the future (someone accidentally changes the discount logic),
  the specific failing test immediately identifies which behavior broke.
- This is a genuinely simple example, but the same principle scales to testing much more complex
  logic — each test verifying one specific, clearly-described expected behavior.

## Common Mistakes

- **Writing no automated tests at all**, relying entirely on manual checking, which doesn't scale
  and misses regressions.
- **Writing tests that depend on execution order or shared mutable state**, causing confusing,
  intermittent failures.
- **Testing implementation details rather than behavior**, causing tests to break during harmless
  refactors that don't actually change any real, externally-visible behavior.
- **Over-investing in slow, brittle E2E tests** for every possible scenario, rather than favoring
  faster unit/integration tests for most coverage.

## When Should I Use It?

Write unit tests for individual functions with meaningful logic. Write integration tests for
critical paths through multiple layers (like your API routes touching the database). Reserve E2E
tests for the most important, complete user flows, given their higher cost to write and maintain.

## Exercises

1. **(Recall)** What's the key difference between a unit test and an integration test?
2. **(Understanding)** Explain the reasoning behind the "testing pyramid" — why favor many unit
   tests over many E2E tests?
3. **(Application)** Write a unit test for a function `isValidPassword(password)` that returns
   `true` only if the password is at least 8 characters long.

## What Should I Learn Next?

Continue to [`07-debugging-and-logging`](../07-debugging-and-logging) — systematic debugging
strategies for when tests (or production) reveal something has gone wrong.
