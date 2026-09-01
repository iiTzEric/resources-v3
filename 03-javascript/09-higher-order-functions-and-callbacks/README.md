# Higher-Order Functions & Callbacks

**Module:** JavaScript
**Prerequisites:** [`08-destructuring-and-spread-rest`](../08-destructuring-and-spread-rest)

## What is it?

A **higher-order function** is a function that takes another function as an argument, returns a
function, or both. A **callback** is specifically a function passed into another function, to be
called (invoked) at some later point. You've already used both constantly — `.map()`, `.filter()`,
and `addEventListener` are all higher-order functions; the functions you pass into them are
callbacks.

## Why does it matter?

This pattern — functions as values, passed around like any other data — is one of JavaScript's most
central ideas, and understanding it explicitly (rather than just pattern-matching syntax you've
seen) unlocks a much deeper understanding of arrays methods, event handling, and later, promises and
async code, which are all built on this same foundation.

## How does it work?

### Functions are values, just like numbers or strings

```javascript
function sayHello() {
  console.log("Hello!");
}

const alias = sayHello; // just assigning a function to another variable, like any value
alias(); // "Hello!"
```

This might look unremarkable, but it's the entire foundation of the pattern: if functions can be
stored in variables, they can also be passed as arguments and returned from other functions,
exactly like any other value.

### A function that takes a function as an argument

```javascript
function processArray(arr, callback) {
  const result = [];
  for (const item of arr) {
    result.push(callback(item));
  }
  return result;
}

const doubled = processArray([1, 2, 3], n => n * 2);
// [2, 4, 6]
```

This is, in fact, a simplified reimplementation of `.map()` — demonstrating that `.map()` isn't
special magic, it's exactly this pattern, already written and provided for you.

### Callbacks with events

```javascript
button.addEventListener("click", function() {
  console.log("Clicked!");
});
```

`addEventListener` is a higher-order function — it doesn't run the function you pass immediately;
it stores it and calls it later, whenever the actual click happens. This "call it later, when
something happens" pattern is genuinely central to how interactive JavaScript works, and it's the
direct conceptual bridge to promises and async/await, covered soon in this module.

### Returning a function — you've already done this with closures

```javascript
function multiplyBy(factor) {
  return function(n) {
    return n * factor;
  };
}
```

This is the exact same pattern from the Closures topic — a function returning a function is simply
the "returns a function" half of being a higher-order function.

## Simple Example

```javascript
function repeat(n, callback) {
  for (let i = 0; i < n; i++) {
    callback(i);
  }
}

repeat(3, i => console.log(`Iteration ${i}`));
```

## Let's Break It Down

- `repeat` doesn't know or care what `callback` actually does — it just calls it, once per
  iteration, passing the current index `i`.
- The caller decides what happens on each iteration by supplying a specific callback — `repeat`
  itself stays generic and reusable for any logic.
- This separation — the "how many times, in what order" logic living in `repeat`, and the "what to
  actually do" logic living in the callback — is a genuinely useful way to keep code flexible and
  reusable.

## Common Mistakes

- **Calling a callback immediately instead of passing the function reference** — writing
  `callback()` where `callback` (without parentheses) was intended, accidentally running it right
  away instead of handing it off to be called later.
- **Assuming a callback always runs synchronously, immediately** — as you'll see in the async
  topics ahead, many real callbacks (event listeners, timers, network requests) run later, not
  immediately when the surrounding code executes.
- **Writing deeply nested callbacks** ("callback hell") for sequential asynchronous steps — this
  specific pain point is exactly what promises and async/await, covered next, were designed to
  solve.

## When Should I Use It?

Reach for a higher-order function whenever a piece of logic needs to be customizable by whoever
calls it — the specific "what to do with each item" can be supplied by the caller, while the
general "how to iterate/process" logic stays in one reusable place.

## Exercises

1. **(Recall)** What's the difference between a "higher-order function" and a "callback"?
2. **(Application)** Write a function `filterArray(arr, testFn)` that reimplements `.filter()`'s
   behavior using a plain loop and a callback.
3. **(Problem Solving)** A developer writes `button.addEventListener("click", handleClick());`
   (note the parentheses) and the click handler runs immediately on page load instead of waiting for
   a click. Explain exactly what's wrong.

## What Should I Learn Next?

Continue to [`10-this-keyword`](../10-this-keyword) — one of JavaScript's most commonly
misunderstood mechanics, and directly relevant to how callbacks and object methods behave.
