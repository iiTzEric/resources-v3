# Error Handling & Debugging

**Module:** Programming Fundamentals
**Prerequisites:** [`08-data-structures-intro`](../08-data-structures-intro)

## What is it?

An **error** is what happens when a program encounters something it cannot continue running past —
a missing value, an invalid operation, something that doesn't match what the code expected.
**Debugging** is the systematic process of figuring out why a program isn't behaving the way you
expect, whether or not it produces a visible error message. **Error handling** is writing code that
anticipates things going wrong and responds to it deliberately, instead of letting the whole
program crash.

## Why does it matter?

Every single programmer, at every skill level, spends a huge portion of their time debugging — this
isn't a sign of doing something wrong, it's an inherent, permanent part of writing software.
Learning to debug *systematically*, instead of randomly changing code and hoping, is one of the
highest-leverage skills you can build early. It's also what separates "code that happens to work on
the happy path" from software that behaves reasonably when something unexpected occurs.

## Mental Model

Think of debugging like being a detective, not a guesser. A detective doesn't wildly accuse random
suspects — they gather evidence, form a specific hypothesis, and test it. Debugging works the same
way: read the error message carefully (the evidence), form a specific guess about what's wrong
(the hypothesis), and check that guess directly (usually by printing/logging a value, or narrowing
down exactly where things go wrong) — rather than changing random lines of code and re-running to
see if it "just works" this time.

## How does it work?

### Reading an error message properly

A typical JavaScript error looks like this:

```
TypeError: Cannot read properties of undefined (reading 'name')
    at getUserName (app.js:12)
    at main (app.js:20)
```

This is genuinely packed with useful information, if you read it carefully instead of skimming past
it:

- **`TypeError`** — the *category* of error. A `TypeError` means you tried to do something with a
  value of the wrong type (here, tried to read `.name` off something that wasn't an object at all —
  it was `undefined`).
- **`Cannot read properties of undefined (reading 'name')`** — the specific complaint: somewhere,
  code tried to access `.name` on a value that turned out to be `undefined`.
- **`at getUserName (app.js:12)`** — exactly which function, and which line, the error actually
  occurred on.
- **`at main (app.js:20)`** — this is the **stack trace**: it shows *how* execution got there — in
  this case, `main` called `getUserName`, and the error happened inside that call. This connects
  directly to the call stack concept from the Functions lesson: the stack trace is literally a
  readout of that call stack at the moment the error happened.

**The single most common beginner mistake with errors is not reading them at all** — seeing "an
error happened," panicking, and starting to guess-and-check random changes, instead of reading
exactly what the message says and where it points.

### Debugging systematically

A reliable general process:

1. **Read the full error message and stack trace.** What kind of error is it, and on what
   exact line?
2. **Form a specific hypothesis.** Not "something is wrong with my code" — something concrete, like
   "I think `user` is `undefined` at the point where I try to access `user.name`."
3. **Check that hypothesis directly.** The simplest tool: print the value right before the line
   that fails.
   ```javascript
   console.log("user is:", user); // just before the failing line
   ```
4. **Narrow down from there.** If `user` is indeed `undefined`, the real question becomes "why is
   `user` undefined at this point?" — which usually means tracing backward to wherever `user` was
   supposed to be set.
5. **Fix the actual cause, not just the symptom.** Wrapping a broken line in a check that avoids the
   crash (e.g. `if (user) { ... }`) might stop the *error*, but if `user` being `undefined` was
   itself a bug (it should have had a real value), silently working around it can hide a deeper
   problem instead of solving it.

### Throwing and catching errors deliberately

So far, all the errors discussed have been *accidental* — things going wrong unintentionally. You
can also create errors deliberately, when your own code detects something invalid:

```javascript
function withdraw(balance, amount) {
  if (amount > balance) {
    throw new Error("Insufficient funds");
  }
  return balance - amount;
}
```

**`throw`** immediately stops normal execution and signals that something has gone wrong, carrying
the error you specify. Left alone, a thrown error crashes the program (or at least, that specific
operation) — which is sometimes exactly what you want (loudly failing on invalid input, rather than
quietly continuing with bad data).

To handle an error instead of letting it crash things, use `try`/`catch`:

```javascript
try {
  const result = withdraw(100, 150);
  console.log(result);
} catch (error) {
  console.log("Something went wrong:", error.message);
}
```

- **`try { ... }`** — run this code, but watch for errors.
- **`catch (error) { ... }`** — if anything inside `try` throws an error, execution jumps here
  immediately, skipping the rest of the `try` block, and `error` holds the actual error object
  (with `.message` containing the description).

This is exactly the same idea you'd use with a risky, unpredictable operation — reading a file that
might not exist, or (as you'll see constantly once you reach APIs) making a network request that
might fail.

### Errors versus bugs that don't throw anything

Not every problem produces a visible error message. A function might run without crashing but
still return the *wrong* answer — this is arguably harder to debug, since there's no stack trace
pointing you anywhere. The same systematic approach still applies: form a specific hypothesis about
what the correct value *should* be at a given point, then check the actual value there with
`console.log`, and narrow down from there until you find where reality diverges from your
expectation.

## Simple Example

```javascript
function getFirstInitial(name) {
  return name[0].toUpperCase();
}

console.log(getFirstInitial("alice")); // "A"
console.log(getFirstInitial(undefined)); // throws a TypeError
```

## Let's Break It Down

- `getFirstInitial("alice")` works fine — `name[0]` is `"a"`, and `.toUpperCase()` gives `"A"`.
- `getFirstInitial(undefined)` fails: `name` is `undefined`, and `undefined[0]` throws a
  `TypeError`, because `undefined` doesn't have a `[0]` to access — it isn't a string or array at
  all.
- Reading this error's message (something like `Cannot read properties of undefined`) tells you
  immediately what category of problem occurred; the stack trace tells you exactly where.
- A more defensive version might guard against this:
  ```javascript
  function getFirstInitial(name) {
    if (!name) {
      throw new Error("name is required");
    }
    return name[0].toUpperCase();
  }
  ```
  This doesn't prevent the *caller* from passing bad input, but it turns a confusing, generic
  `TypeError` into a clear, deliberate message that immediately tells you what actually went wrong.

## Common Mistakes

- **Not reading the error message.** The exact type, message, and line number are almost always
  directly useful — skipping past them to start guessing wastes real information you already have.
- **Fixing the symptom instead of the cause.** Wrapping a crashing line in a check that avoids the
  crash, without asking *why* the value was wrong in the first place.
- **Using `try`/`catch` to silently swallow errors** without doing anything meaningful in `catch` —
  this hides real problems instead of handling them, and can make later bugs much harder to trace.
- **Guessing and re-running repeatedly** instead of forming a specific, testable hypothesis about
  what's actually happening at a specific point in the code.

## When Should I Use It?

Use `try`/`catch` around operations that can genuinely fail in ways you want to handle gracefully
(a network request, reading a file, parsing user-provided data) — not as a blanket wrapper around
all your code "just in case." Throw your own errors when your code detects invalid input or a state
it shouldn't proceed from, so failures are loud and clear rather than silent and confusing later.

## Exercises

1. **(Recall)** What are the three main pieces of information in a typical error message and stack
   trace?
2. **(Understanding)** Explain why wrapping a crashing line in `if (value) { ... }` without further
   investigation can sometimes hide a real bug instead of fixing it.
3. **(Application)** Write a function `divide(a, b)` that throws an error with the message
   `"Cannot divide by zero"` if `b` is `0`, and otherwise returns `a / b`. Then write a
   `try`/`catch` block that calls it and logs either the result or the error message.
4. **(Problem Solving)** You're given this error:
   ```
   TypeError: users.find is not a function
       at getUser (app.js:8)
   ```
   Walk through: what category of error is this, what does the specific message suggest about the
   value of `users` at that point, and what would your first debugging step be?

## What Should I Learn Next?

Continue to [`10-algorithms-and-complexity-intro`](../10-algorithms-and-complexity-intro) — once
your code runs correctly, the next question worth asking is: how well does it perform, especially
as the amount of data it handles grows?
