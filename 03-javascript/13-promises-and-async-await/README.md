# Promises & Async/Await

**Module:** JavaScript
**Prerequisites:** [`12-modules`](../12-modules)

## What is it?

A **Promise** is an object representing a value that doesn't exist yet, but will at some point in
the future — the result of an operation that takes time, like a network request. **`async`/`await`**
is newer, cleaner syntax for working with promises, letting asynchronous code read almost like
ordinary, sequential code.

## Why does it matter?

You've already used `async`/`await` throughout earlier work (fetching data, connecting to a
database) without necessarily understanding the mechanics underneath. This topic fills that gap —
understanding *why* `await` works the way it does, and what a Promise actually represents, resolves
a lot of confusion around timing and ordering in async code, and is essential preparation for the
event loop topic that follows.

## How does it work?

### Why some operations can't just return their result immediately

```javascript
function getUser(id) {
  // this would need to wait for a network response, which takes real time
  // it cannot simply "return" the data right now, synchronously
}
```

Some operations — network requests, reading a large file, waiting on a timer — take real time and
can't produce their result the instant the function is called. JavaScript can't just "pause" and
wait, since that would freeze everything else (a webpage, a server handling other requests) for
however long the operation takes. Promises are the mechanism for saying "start this now, and let me
know later when it's done," without blocking anything else in the meantime.

### A Promise's three states

A Promise is always in exactly one of three states:

- **pending** — still in progress, no result yet.
- **fulfilled** — completed successfully, with a result value.
- **rejected** — failed, with an error.

### Working with a Promise directly — `.then()`/`.catch()`

```javascript
fetch("https://api.example.com/users")
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error("Failed:", error));
```

`.then()` registers a function to run once the Promise fulfills, receiving the result. `.catch()`
registers a function to run if it rejects instead. Each `.then()` itself returns a new Promise,
which is what allows chaining multiple steps in sequence, as shown here.

### `async`/`await` — the same thing, cleaner syntax

```javascript
async function loadUsers() {
  try {
    const response = await fetch("https://api.example.com/users");
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Failed:", error);
  }
}
```

- **`async`** before a function means: this function always returns a Promise, and can use `await`
  inside it.
- **`await`** pauses execution *within this function only* until the Promise resolves, then gives
  you the actual resolved value directly — no `.then()` chaining needed. Everything else in the
  program continues running normally during this pause; it's not a true, blocking pause on
  everything.
- **`try`/`catch`** wraps `await` calls to handle rejected Promises — the async equivalent of
  `.catch()`.

This is genuinely the same underlying mechanism as `.then()`/`.catch()` — `async`/`await` is syntax
sugar that lets asynchronous code be written and read almost like ordinary sequential code, which is
exactly why it's the preferred modern style.

### Why `useEffect`'s callback can't be `async` directly — the real reason

```javascript
useEffect(() => {
  async function load() {
    const data = await fetch(...);
    // ...
  }
  load();
}, []);
```

Marking a function `async` makes it **automatically return a Promise**, regardless of what's inside
it — that's an unconditional rule of the `async` keyword. `useEffect` expects its callback to return
either nothing, or a cleanup function — not a Promise. This is why async logic must be wrapped in a
separate inner function, called from within a non-`async` outer callback, rather than marking the
outer callback itself `async`.

### `Promise.all` — running multiple promises concurrently

```javascript
const [users, posts] = await Promise.all([
  fetch("/api/users").then(r => r.json()),
  fetch("/api/posts").then(r => r.json())
]);
```

If you have several independent async operations that don't depend on each other's results,
`Promise.all` runs them concurrently rather than one after another with separate `await`s — often
significantly faster, since you're not waiting for each one to fully finish before starting the
next.

## Simple Example

```javascript
async function getUserName(id) {
  const response = await fetch(`https://api.example.com/users/${id}`);
  if (!response.ok) {
    throw new Error(`User ${id} not found`);
  }
  const user = await response.json();
  return user.name;
}
```

## Let's Break It Down

- The first `await` pauses until the network request completes, then gives you the raw `Response`
  object.
- `response.ok` is checked before proceeding — a network request can "succeed" (arrive without a
  connection error) while still representing a failure (like a `404`), exactly as covered in the
  Fundamentals APIs/HTTP lesson — this check catches that case explicitly.
- The second `await` parses the JSON body, which is itself an asynchronous operation, hence its own
  `await`.
- `return user.name` sends the extracted name back to whoever called `getUserName` — and since this
  function is `async`, that return value is automatically wrapped in a fulfilled Promise for the
  caller to `await`.

## Common Mistakes

- **Forgetting `await`**, and getting a pending Promise object instead of the actual resolved value
  — a very common early bug (`console.log(fetch(...))` logs a Promise, not the data).
- **Marking a function `async` when it's used somewhere that specifically can't accept one**, like
  directly as `useEffect`'s callback.
- **Not checking `response.ok`**, assuming a completed fetch always means success, when it can still
  represent a `404` or `500`.
- **Using multiple sequential `await`s for genuinely independent operations**, missing the
  opportunity to run them concurrently with `Promise.all` for better performance.

## When Should I Use It?

Use `async`/`await` for any operation that takes real time — network requests, file operations,
timers — preferring it over raw `.then()` chaining for readability. Use `Promise.all` when you have
multiple independent async operations that don't depend on each other.

## Exercises

1. **(Recall)** What are the three states a Promise can be in?
2. **(Understanding)** Explain precisely why `useEffect`'s own callback function cannot be marked
   `async` directly.
3. **(Application)** Write an `async` function `getPostTitle(id)` that fetches from
   `https://jsonplaceholder.typicode.com/posts/${id}`, checks `response.ok`, throws a clear error if
   not, and otherwise returns the post's `title`.
4. **(Problem Solving)** A function logs `[object Promise]` instead of actual data when called.
   Diagnose the likely missing keyword and explain why the output looks the way it does.

## What Should I Learn Next?

Continue to [`14-error-handling`](../14-error-handling) — you've used `try`/`catch` with async code
already; this topic covers JavaScript's error handling more broadly, including custom errors.
