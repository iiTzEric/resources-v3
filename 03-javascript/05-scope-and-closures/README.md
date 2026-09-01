# Scope & Closures

**Module:** JavaScript
**Prerequisites:** [`04-functions-in-depth`](../04-functions-in-depth)

## What is it?

A **closure** is a function that "remembers" the variables from the scope it was created in, even
after that outer scope has technically finished running. This builds directly on the general scope
rules from Fundamentals — closures are what happens when scope and function calls interact in a
specific, powerful way.

## Why does it matter?

Closures explain a lot of behavior that otherwise seems mysterious — private counters, functions
that "remember" a value across multiple calls. They're also the foundation of several important
JavaScript patterns you'll use constantly, including how React's `useState` works conceptually.

## Mental Model

Think of a closure like a backpack a function carries with it wherever it goes. When a function is
created inside another function, it packs up (closes over) references to the variables it needs
from its birth environment, and carries that "backpack" along even after the outer function has
already finished running and would otherwise seem to have "gone away."

## How does it work?

### A closure in action

```javascript
function makeCounter() {
  let count = 0;

  function increment() {
    count = count + 1;
    console.log(count);
  }

  return increment;
}

const counter = makeCounter(); // makeCounter() already finished running by now

counter(); // 1
counter(); // 2
counter(); // 3
```

`makeCounter()` runs and completes immediately — normally, its local variable `count` would be gone
once the function returns. But `increment` was defined *inside* `makeCounter`, and it closes over
`count` — keeping a private, persistent reference to it. Every call to `counter()` (which is really
`increment`) reads and updates that same `count`, not a fresh one.

### Each call creates an independent closure

```javascript
const counterA = makeCounter();
const counterB = makeCounter();

counterA(); // 1
counterB(); // 1 — completely separate from counterA's count
counterA(); // 2
```

Every call to `makeCounter()` creates a brand-new, private `count` and a brand-new `increment`
function closing over that specific one. `counterA` and `counterB` never interfere with each other
— they're two entirely separate closures built from the same blueprint function.

### Closures enable private state

```javascript
function makeBankAccount(startingBalance) {
  let balance = startingBalance;

  return {
    deposit(amount) {
      balance += amount;
      return balance;
    },
    getBalance() {
      return balance;
    }
  };
}

const account = makeBankAccount(100);
account.deposit(50);
console.log(account.getBalance()); // 150
console.log(account.balance);        // undefined — can't reach in directly
```

`balance` is only reachable through the specific functions that were deliberately given access to
it — nothing outside can read or modify it directly. This "private data plus controlled access"
pattern, built entirely from closures with no special syntax required, underlies a lot of real
JavaScript architecture.

## Simple Example

```javascript
function makeMultiplier(factor) {
  return function(n) {
    return n * factor;
  };
}

const double = makeMultiplier(2);
const triple = makeMultiplier(3);

console.log(double(5)); // 10
console.log(triple(5));  // 15
```

## Let's Break It Down

- `makeMultiplier(2)` creates and returns a function that closes over `factor = 2` specifically.
- `makeMultiplier(3)` separately creates a different function closing over its own `factor = 3` —
  entirely independent, despite coming from the same outer function.
- Calling `double(5)` uses the `factor` from *its own* closure (`2`), producing `10`; `triple(5)`
  uses its own separate closure's `factor` (`3`), producing `15`.

## Common Mistakes

- **Assuming closures "remember values," rather than "remember variables."** A closure holds a
  live reference to the actual variable, not a frozen snapshot — if the outer variable changes after
  the closure is created but before it's called, the closure sees the updated value.
- **Accidentally sharing state across loop iterations with `var`** (a classic, historical closure
  bug, less common now that `let` is standard) — worth knowing `let` in a loop gives each iteration
  its own separate binding, which is exactly why this specific old bug mostly disappeared once `let`
  became standard.
- **Overusing closures for simple cases where a plain variable would do**, adding unnecessary
  complexity when private state isn't actually needed.

## When Should I Use It?

Use closures when you need private, persistent state tied to a specific function's own "instance" —
counters, caches, or anything needing controlled read/write access without exposing the underlying
variable directly.

## Exercises

1. **(Recall)** In your own words, what does it mean for a function to "close over" a variable?
2. **(Application)** Write a `makeMultiplierCounter(step)` function whose returned function
   increases an internal count by `step` each call, and logs the running total.
3. **(Problem Solving)** Two separate calls to the same factory function that returns a closure
   somehow appear to share the same internal state, when they were meant to be independent. What's
   the most likely mistake in how the factory function was written?

## What Should I Learn Next?

Continue to [`06-arrays`](../06-arrays) — closures are the language mechanic; arrays and their
methods (map/filter/reduce) are where you'll actually use functions-as-values constantly in
practice.
