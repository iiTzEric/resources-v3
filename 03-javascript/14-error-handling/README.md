# Error Handling (JavaScript-Specific)

**Module:** JavaScript
**Prerequisites:** [`13-promises-and-async-await`](../13-promises-and-async-await)

## What is it?

This topic extends the general error handling covered in Fundamentals with JavaScript-specific
detail: the built-in `Error` object and its subtypes, creating custom error types, and handling
errors correctly across both synchronous and asynchronous code.

## Why does it matter?

Real applications need to distinguish between different *kinds* of failure — a network error is not
the same problem as invalid user input — and respond to each appropriately. JavaScript's error
system, used well, makes this distinction clear and actionable rather than treating every failure
identically.

## How does it work?

### Built-in error types

```javascript
throw new Error("Something went wrong");         // generic
throw new TypeError("Expected a number");          // wrong type
throw new RangeError("Value out of allowed range"); // out-of-bounds value
```

JavaScript has several built-in error subtypes, each communicating a specific category of problem.
Using the appropriate one (rather than always `Error`) makes your errors more informative and
allows callers to distinguish between error types if needed.

### Creating your own custom error types

```javascript
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

function createUser(data) {
  if (!data.email) {
    throw new ValidationError("Email is required");
  }
  // ...
}
```

Extending `Error` (using the class inheritance you already know) lets you create a specific,
named error type for your own application's specific failure categories — genuinely useful once
your code needs to handle different kinds of errors differently.

### Catching and distinguishing error types

```javascript
try {
  createUser({});
} catch (error) {
  if (error instanceof ValidationError) {
    console.log("Please fix your input:", error.message);
  } else {
    console.log("Unexpected error:", error.message);
    throw error; // re-throw errors you don't know how to handle
  }
}
```

Checking `error instanceof SpecificErrorType` lets you handle expected, known error categories
deliberately, while still surfacing genuinely unexpected errors rather than silently swallowing
them.

### Error handling across async code

```javascript
async function loadData() {
  try {
    const response = await fetch("/api/data");
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Failed to load data:", error.message);
    throw error; // let the caller decide what to do next
  }
}
```

Note this function both catches an error (to log it) *and* re-throws it — this is a common,
deliberate pattern: handle what you can meaningfully do here (logging, cleanup), but let the
caller, who has more context about what the user is actually doing, decide the final response
(showing an error message, retrying, etc.) rather than silently absorbing the failure.

### The `finally` block — code that always runs

```javascript
async function withLoadingState() {
  setLoading(true);
  try {
    await doSomething();
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false); // always runs, whether it succeeded or failed
  }
}
```

`finally` runs regardless of whether the `try` block succeeded or the `catch` block ran — genuinely
useful for cleanup that must happen either way, like turning off a loading indicator.

## Simple Example

```javascript
class InsufficientFundsError extends Error {
  constructor(balance, amount) {
    super(`Cannot withdraw $${amount}, balance is only $${balance}`);
    this.name = "InsufficientFundsError";
  }
}

function withdraw(balance, amount) {
  if (amount > balance) {
    throw new InsufficientFundsError(balance, amount);
  }
  return balance - amount;
}

try {
  withdraw(50, 100);
} catch (error) {
  if (error instanceof InsufficientFundsError) {
    console.log("Please deposit more funds.");
  }
}
```

## Let's Break It Down

- `InsufficientFundsError` extends `Error`, calling `super(...)` with a clear, specific message
  built from the actual values involved.
- `withdraw` throws this specific error type rather than a generic `Error`, when the specific
  "insufficient funds" condition is detected.
- The `catch` block checks specifically for this error type, letting the code respond to this
  particular, expected failure mode with a targeted, helpful message.

## Common Mistakes

- **Always throwing/catching generic `Error` objects**, missing the opportunity to distinguish and
  handle different failure categories differently.
- **Catching an error and doing nothing meaningful with it** — silently swallowing errors hides real
  problems and makes them much harder to diagnose later.
- **Not re-throwing errors the current code genuinely doesn't know how to handle**, instead of
  letting them propagate to somewhere that does.
- **Forgetting `finally` for guaranteed cleanup**, leading to things like a loading indicator that
  gets stuck "on" if an error occurs before the code that would normally turn it off.

## When Should I Use It?

Create custom error types for your application's specific, meaningful failure categories, especially
ones calling code might want to handle differently. Use `finally` for cleanup that must happen
regardless of success or failure. Re-throw errors you can't meaningfully handle at the current
level, rather than silently absorbing them.

## Exercises

1. **(Recall)** What does `instanceof` let you check when handling a caught error?
2. **(Application)** Create a custom `NotFoundError` extending `Error`, and a function that throws
   it when looking up an item in an array that doesn't exist.
3. **(Problem Solving)** A `catch` block logs every error identically, regardless of type, making it
   hard to tell a network failure from an invalid-input error in the logs. Describe how you'd
   restructure it to distinguish them.

## What Should I Learn Next?

Continue to [`15-event-loop-call-stack-tasks`](../15-event-loop-call-stack-tasks) — this ties
together everything from functions, callbacks, and promises into a full picture of how JavaScript
actually schedules and runs asynchronous work.
