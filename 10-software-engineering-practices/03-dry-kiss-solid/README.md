# DRY, KISS & SOLID

**Module:** Software Engineering Practices
**Prerequisites:** [`02-separation-of-concerns-and-modularity`](../02-separation-of-concerns-and-modularity)

## What is it?

**DRY** (Don't Repeat Yourself), **KISS** (Keep It Simple, Stupid), and **SOLID** (five related
object-oriented design principles) are widely-referenced guidelines for writing maintainable code.
This topic covers each briefly and honestly — including when they're genuinely useful, and when
applying them rigidly causes more harm than good.

## Why does it matter?

These principles are referenced constantly in real engineering discussions — understanding them
(and their real limits) helps you both apply them well and push back thoughtfully when they're being
misapplied.

## How does it work?

### DRY — Don't Repeat Yourself

```javascript
// Repeated logic
function getUserDiscount(user) {
  if (user.orders > 10 && user.isActive) return 0.1;
  return 0;
}
function getUserShippingDiscount(user) {
  if (user.orders > 10 && user.isActive) return 0.05; // same condition, duplicated
  return 0;
}
```

```javascript
// DRY - the shared condition is extracted once
function isEligibleForDiscounts(user) {
  return user.orders > 10 && user.isActive;
}
```

**The genuine risk of overapplying DRY**: extracting shared code that only *coincidentally* looks
similar right now, but represents genuinely different concerns that might need to evolve
independently later, can create awkward, unnecessary coupling — sometimes duplicating a small piece
of logic is actually the more maintainable choice, if the two usages aren't conceptually the same
thing.

### KISS — Keep It Simple

```javascript
// Overly clever
const isEven = n => !(n & 1);

// Simple, obviously correct
const isEven = n => n % 2 === 0;
```

Both are technically correct, but the second is immediately understandable without needing to
recall bitwise operator behavior — KISS favors the version that's easiest to verify as correct at a
glance, even if a "cleverer" version exists.

### SOLID — five principles, briefly

- **Single Responsibility** — a class/module should have one reason to change (directly connects to
  separation of concerns).
- **Open/Closed** — code should be open to extension, but closed to modification — adding new
  behavior shouldn't require rewriting existing, working code.
- **Liskov Substitution** — a subclass should be usable anywhere its parent class is expected,
  without breaking behavior.
- **Interface Segregation** — prefer several small, specific interfaces over one large, general-
  purpose one.
- **Dependency Inversion** — depend on abstractions (general contracts), not concrete
  implementations, where flexibility matters.

These originated in a strongly object-oriented context — some translate more directly to
JavaScript/React's more functional style than others; Single Responsibility is genuinely universal
and directly connects to everything covered so far in this module.

### The honest caveat that applies to all of these

**None of these are absolute laws.** They're heuristics that generally lead to better outcomes,
learned from real, hard-won experience — but applying any of them rigidly, without judgment, in
every single situation can produce worse code than a more pragmatic approach would. Experienced
engineers apply these principles *and* know when a specific situation calls for breaking them.

## Simple Example

```javascript
// Premature DRY-ing of unrelated logic
function formatValue(value, type) {
  if (type === "currency") return `$${value.toFixed(2)}`;
  if (type === "percentage") return `${value}%`;
  if (type === "date") return new Date(value).toLocaleDateString();
}
```

Versus three small, focused functions:

```javascript
function formatCurrency(value) { return `$${value.toFixed(2)}`; }
function formatPercentage(value) { return `${value}%`; }
function formatDate(value) { return new Date(value).toLocaleDateString(); }
```

## Let's Break It Down

- The single `formatValue` function *looks* DRY (one function instead of three), but it actually
  mixes three unrelated formatting concerns behind a branching `type` parameter — a violation of
  Single Responsibility disguised as "avoiding repetition."
- The three separate functions are each simpler (KISS), have one clear job (Single Responsibility),
  and can evolve independently without affecting each other — genuinely better here, despite having
  "more functions" than the single combined version.

## Common Mistakes

- **Treating DRY as "never write similar-looking code twice,"** without considering whether the
  similarity is conceptual or coincidental.
- **Applying SOLID principles rigidly to small scripts or genuinely simple code**, where the
  additional structure adds overhead without real benefit.
- **Choosing "clever" code over simple code** for its own sake, prioritizing showing skill over
  actual readability.

## When Should I Use It?

Apply these principles as defaults, informed by judgment about the specific situation — extract
genuinely duplicated, conceptually identical logic (DRY); favor the simplest correct approach
(KISS); keep functions/classes focused on one responsibility (the most broadly applicable of the
SOLID principles). Recognize when a specific case calls for a more pragmatic exception.

## Exercises

1. **(Recall)** What does each letter in SOLID stand for?
2. **(Understanding)** Explain, using the `formatValue` example, why "fewer functions" isn't the
   same thing as "better following DRY."
3. **(Application)** Identify a place in a recent project (yours or hypothetical) where genuinely
   duplicated logic could be extracted following DRY, being specific about why the duplication is
   conceptual, not coincidental.

## What Should I Learn Next?

Continue to [`04-design-patterns`](../04-design-patterns) — named, reusable solutions to recurring
software design problems.
