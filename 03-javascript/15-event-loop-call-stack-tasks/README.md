# Event Loop, Call Stack & Tasks

**Module:** JavaScript
**Prerequisites:** [`14-error-handling`](../14-error-handling)

## What is it?

This topic explains what's actually happening, mechanically, when asynchronous JavaScript code
runs — the **call stack** (tracking active function calls), the **event loop** (the mechanism that
lets async callbacks run at the right time), and **microtasks versus macrotasks** (two different
priority queues for scheduled work).

## Why does it matter?

Everything you've learned about async code so far (promises, `async`/`await`, callbacks,
`setTimeout`) works reliably because of a specific, consistent underlying mechanism. Understanding
it directly resolves genuinely confusing ordering questions — like why a `setTimeout(fn, 0)`
doesn't run immediately, or why a promise callback runs before a timer callback even if the timer
was scheduled first.

## Mental Model

Think of the JavaScript engine as a single, very fast worker (JavaScript is single-threaded — it
can only do one thing at a time) with a to-do list (the **call stack**) and an inbox where new tasks
arrive (the **event loop** and its **task queues**). The worker finishes everything currently on
their desk (the call stack) completely before ever checking the inbox for anything new — this is
why long-running synchronous code can make an entire page feel "frozen": the worker is busy and
won't check the inbox until they're done.

## How does it work?

### The call stack — tracking active function calls

```javascript
function first() {
  second();
}
function second() {
  third();
}
function third() {
  console.log("here");
}
first();
```

Calling `first()` pushes it onto the call stack. It calls `second()`, pushing that on top. `second()`
calls `third()`, pushing that on top too. `third()` runs, logs, and finishes — it's popped off the
stack. Then `second()` finishes and is popped. Then `first()` finishes and is popped. This "last in,
first out" stacking is exactly what a stack trace (from the Fundamentals Error Handling lesson)
shows you when an error occurs partway through.

### JavaScript is single-threaded — one call stack, one thing at a time

There's only ever one call stack, meaning JavaScript genuinely can only execute one piece of code at
any given instant. This is why a single, slow, synchronous operation can block absolutely everything
else — including UI updates and other scheduled callbacks — until it finishes.

### So how does async code work at all, if JS is single-threaded?

The browser (or Node.js) provides capabilities *outside* JavaScript's single thread — timers,
network requests, file operations — that run independently. When you call `setTimeout` or `fetch`,
JavaScript hands the actual waiting off to this outside system and immediately continues running the
rest of your code, without blocking. Once that outside operation finishes, its callback doesn't run
immediately — it gets placed into a **queue**, waiting for the call stack to be completely empty.

### The event loop — checking the queue when the stack is empty

The **event loop** is the mechanism that continuously checks: "is the call stack empty right now? If
so, take the next thing waiting in the queue and run it." This is why:

```javascript
console.log("1");
setTimeout(() => console.log("2"), 0);
console.log("3");

// Output: 1, 3, 2 — NOT 1, 2, 3
```

Even with a `0` millisecond delay, the `setTimeout` callback can't run until the current
synchronous code (`console.log("1")` and `console.log("3")`) finishes completely and the call stack
is empty — `setTimeout(fn, 0)` doesn't mean "run immediately," it means "run as soon as possible
*after* the current call stack finishes and the queue is checked."

### Microtasks versus macrotasks — two queues, different priority

There are actually two separate queues: the **microtask queue** (used by Promises, including
`async`/`await`) and the **macrotask queue** (used by `setTimeout`, UI events, and similar). The
event loop always fully empties the microtask queue before processing even a single macrotask:

```javascript
console.log("1");
setTimeout(() => console.log("2"), 0);       // macrotask
Promise.resolve().then(() => console.log("3")); // microtask
console.log("4");

// Output: 1, 4, 3, 2
```

`1` and `4` run synchronously first. Then, before the `setTimeout` callback (a macrotask) gets a
chance, the entire microtask queue is drained — so the Promise's `.then()` callback (`3`) runs
first, and only then does the timer's callback (`2`) finally run.

## Simple Example

```javascript
console.log("Start");

setTimeout(() => console.log("Timeout"), 0);

Promise.resolve()
  .then(() => console.log("Promise 1"))
  .then(() => console.log("Promise 2"));

console.log("End");
```

## Let's Break It Down

- `"Start"` and `"End"` log immediately and synchronously, in order, since nothing else is
  scheduled to interrupt them.
- Both the `setTimeout` and the Promise chain get scheduled, but nothing from either runs until the
  current synchronous code finishes entirely.
- Once the stack is empty, the event loop checks microtasks first — draining the entire Promise
  chain (`"Promise 1"`, then `"Promise 2"`) — before ever looking at the macrotask queue.
- Only after all pending microtasks are exhausted does `"Timeout"` finally get its turn.
- Final order: `Start, End, Promise 1, Promise 2, Timeout`.

## Common Mistakes

- **Assuming `setTimeout(fn, 0)` runs "immediately."** It runs as soon as possible *after* the
  current synchronous code and all pending microtasks finish — never truly immediately if there's
  any other code already running or queued ahead of it.
- **Assuming asynchronous callbacks run in the exact order they were scheduled**, without accounting
  for the microtask-before-macrotask priority rule.
- **Writing long-running synchronous code** (a huge loop, a heavy computation) that blocks the
  single call stack, freezing UI updates and delaying every other pending callback until it finishes.

## When Should I Use It?

You don't directly "use" the event loop — it's automatic. This mental model becomes genuinely useful
when debugging unexpected ordering in async code, or explaining why heavy synchronous work makes an
application feel unresponsive.

## Exercises

1. **(Recall)** What is the call stack, and what does "single-threaded" mean about how JavaScript
   executes code?
2. **(Understanding)** Explain why the microtask queue is always fully drained before the event loop
   processes the next macrotask.
3. **(Application)** Predict the exact console output order of this code, then verify:
   ```javascript
   console.log("A");
   setTimeout(() => console.log("B"), 0);
   Promise.resolve().then(() => console.log("C"));
   console.log("D");
   ```

## What Should I Learn Next?

Continue to [`16-dom-and-events`](../16-dom-and-events) — now with a full understanding of how
JavaScript schedules work, this topic returns to the DOM and event handling you used earlier,
looking at it in more depth.
