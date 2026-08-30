# Conditionals

**Module:** Programming Fundamentals
**Prerequisites:** [`03-operators`](../03-operators)

## What is it?

A **conditional** lets a program make a decision: run one block of code if something is true, and
optionally a different block if it's not. This is how programs stop being a single fixed sequence
of steps and start behaving differently depending on data.

## Why does it matter?

Almost nothing interesting in software runs the exact same way every single time. A login form
needs to behave differently for correct versus incorrect passwords. A game needs to behave
differently depending on the player's score. Conditionals are the mechanism that makes all of that
possible — without them, every program would be a straight, unchanging line from start to finish.

## Mental Model

Think of a conditional like a fork in a hiking trail with a sign: "If the bridge is open, go left.
Otherwise, go right." You don't walk both paths — you check the condition once, and commit to
exactly one path based on the answer. Your program does the same: it evaluates the condition,
gets a single `true` or `false`, and runs exactly one matching branch.

## How does it work?

### The basic `if`

```javascript
const age = 20;

if (age >= 18) {
  console.log("You can vote.");
}
```

`if (condition) { ... }` means: "evaluate `condition`. If it's `true`, run everything inside the
curly braces. If it's `false`, skip the block entirely and continue with whatever comes after it."

### Adding an alternative: `else`

```javascript
if (age >= 18) {
  console.log("You can vote.");
} else {
  console.log("You cannot vote yet.");
}
```

`else` provides the "otherwise" branch — guaranteed to run whenever the `if` condition was `false`.
Exactly one of these two blocks runs, never both, never neither.

### Multiple possibilities: `else if`

```javascript
const score = 75;

if (score >= 90) {
  console.log("A");
} else if (score >= 80) {
  console.log("B");
} else if (score >= 70) {
  console.log("C");
} else {
  console.log("F");
}
```

`else if` chains let you check several conditions in sequence. **Crucially, JavaScript checks them
top to bottom and stops at the very first one that's `true`** — it never checks the rest, even if a
later condition would also technically be true. This has a direct, important consequence:

### Why order matters in `else if` chains

```javascript
// WRONG ORDER — this has a real bug
if (score >= 70) {
  console.log("C");
} else if (score >= 90) {
  console.log("A");   // this can NEVER run, even for a 100
}
```

A score of `95` would hit `score >= 70` first (since `95 >= 70` is `true`), print `"C"`, and stop —
the `score >= 90` check further down never even gets evaluated, no matter how high the score is.
**The fix is always to order conditions from most specific/restrictive to least**, so that a
higher-priority match gets checked before a broader one can accidentally catch it first.

### Truthy and falsy values — conditions don't require an explicit boolean

```javascript
const name = "";

if (name) {
  console.log("Name provided");
} else {
  console.log("Name is empty");  // this runs
}
```

You don't need to explicitly write `name !== ""` — JavaScript will convert almost any value to a
boolean automatically when used as a condition. Values that convert to `false` are called
**falsy**: `0`, `""` (empty string), `null`, `undefined`, `NaN`, and `false` itself. Everything else
— including `"0"` (a non-empty string!) and any object — is **truthy**. This is genuinely useful
shorthand (`if (name)` reads naturally as "if a name was provided"), but it's also a common source
of subtle bugs when a value you didn't expect to be falsy (like the number `0` representing a valid
quantity of zero) accidentally triggers the "empty" branch.

### Ternary operator — a compact `if/else` for simple cases

```javascript
const status = age >= 18 ? "adult" : "minor";
```

Read as: "if `age >= 18` is true, use `\"adult\"`; otherwise, use `\"minor\"`." This is genuinely
just a shorter way to write a simple `if/else` that only assigns a value — it's not a different
mechanism underneath, just more compact syntax. Reach for a full `if/else` once the logic involves
more than a single value being chosen, since a ternary crammed with complex logic quickly becomes
harder to read than the "verbose" version it was meant to shorten.

### Nesting conditionals

```javascript
if (isLoggedIn) {
  if (isAdmin) {
    console.log("Welcome, admin.");
  } else {
    console.log("Welcome, user.");
  }
} else {
  console.log("Please log in.");
}
```

Conditionals can live inside other conditionals — useful when a decision genuinely depends on more
than one independent question. That said, nesting more than two or three levels deep is a common
sign the logic could be simplified — often by combining conditions with `&&`/`||` directly, or by
restructuring with early returns (a pattern you'll use constantly once you get to functions).

## Simple Example

```javascript
const temperature = 15;

if (temperature > 30) {
  console.log("It's hot.");
} else if (temperature > 15) {
  console.log("It's warm.");
} else if (temperature > 0) {
  console.log("It's cool.");
} else {
  console.log("It's freezing.");
}
```

## Let's Break It Down

- `temperature` is `15`.
- The first check, `temperature > 30`, is `false` — skipped.
- The second check, `temperature > 15`, is also `false` (`15` is not *greater than* `15`) —
  skipped.
- The third check, `temperature > 0`, is `true` — this branch runs, printing `"It's cool."`, and
  the `else` block is never reached.
- Notice the exact boundary behavior: because the comparisons use strict `>` rather than `>=`, a
  temperature of exactly `15` falls into the "cool" bucket, not "warm." This kind of boundary
  detail — is it `>` or `>=`? — is a very common source of real, subtle off-by-one bugs, and always
  worth double-checking deliberately rather than assuming.

## Common Mistakes

- **Ordering `else if` chains incorrectly**, so a broader condition accidentally catches cases
  meant for a more specific one further down. Always order from most restrictive to least.
- **Using `=` instead of `==`/`===` inside a condition** (carried over from the Operators topic) —
  this silently assigns instead of comparing.
- **Relying on truthy/falsy without thinking about edge cases**, especially the number `0` or an
  empty string being unintentionally treated as "no value," when `0` might be a perfectly valid,
  meaningful value in context (a score of zero, a quantity of zero).
- **Getting boundary conditions backwards** — mixing up `>` vs `>=`, or `<` vs `<=` — especially at
  the exact edges of a range. Always ask: "what should happen at exactly this value?" and check
  your operator matches that intent.
- **Over-nesting conditionals** instead of combining conditions or restructuring logic, making code
  progressively harder to read and reason about.

## When Should I Use It?

Use a simple `if` when you only need to act on one condition, with no alternative needed. Use
`if/else` when there are exactly two possible outcomes. Use `else if` chains when there are several
mutually exclusive possibilities, always ordered most-specific-first. Use a ternary only for small,
single-value decisions — not as a shorthand for real branching logic with multiple statements per
branch.

## Exercises

1. **(Recall)** What is a "falsy" value in JavaScript? Name at least four of them.
2. **(Understanding)** Explain why the order of conditions in an `else if` chain can change the
   outcome, even if every individual condition is written correctly.
3. **(Application)** Write a conditional that prints `"Free shipping!"` if a cart total is `50` or
   more, `"Add $X more for free shipping"` (with `X` calculated) if it's between `1` and `49`, and
   `"Cart is empty"` if the total is `0`.
4. **(Problem Solving)** A function is supposed to reject empty usernames, but a user reports that
   typing the single character `"0"` gets incorrectly rejected too. The check is
   `if (!username) { reject(); }`. Explain what's happening and how you'd fix it.
5. **(Problem Solving)** Given this chain, what would print for a score of `85`, and why — walk
   through each check in order:
   ```javascript
   if (score >= 60) { console.log("Pass"); }
   else if (score >= 80) { console.log("Pass with Merit"); }
   else { console.log("Fail"); }
   ```

## What Should I Learn Next?

Continue to [`05-loops`](../05-loops) — conditionals let you make a decision once; loops let you
repeat decisions and actions many times, which is how programs handle collections of data and
repeated work efficiently.
