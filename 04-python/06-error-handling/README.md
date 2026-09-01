# Error Handling

**Module:** Python (Parallel Track)
**Prerequisites:** [`05-classes-and-oop`](../05-classes-and-oop)

## What is it?

Python's error handling covers the same concepts as JavaScript's — `try`/`except` (Python's
`try`/`catch`), and `raise` (Python's `throw`) — with different keywords and its own set of common
built-in exception types.

## Why does it matter?

Handling errors gracefully matters just as much in Python as in JavaScript — reading user input,
accessing files, calling external services can all fail, and Python's specific idioms for this are
worth knowing precisely rather than assuming a direct, unchanged translation from JS syntax.

## How does it work?

### `try`/`except` — Python's `try`/`catch`

```python
try:
    result = 10 / 0
except ZeroDivisionError:
    print("Cannot divide by zero")
```

Note: Python lets you catch a **specific exception type** directly in the `except` line, rather than
catching everything generically and checking the type afterward (as you might in JavaScript with
`instanceof`).

### Catching multiple, or any, exception type

```python
try:
    value = int(user_input)
except ValueError:
    print("That wasn't a valid number")
except Exception as e:
    print(f"Unexpected error: {e}")
```

Multiple `except` blocks let you handle different failure types differently, exactly like checking
`instanceof` in a JavaScript `catch` block, but expressed more directly in Python's syntax. A final,
broader `except Exception as e:` catches anything not already handled by a more specific clause
above it — order matters, same principle as `elif` chains: more specific first.

### `raise` — Python's `throw`

```python
def withdraw(balance, amount):
    if amount > balance:
        raise ValueError("Insufficient funds")
    return balance - amount
```

### Custom exceptions — like extending `Error` in JS

```python
class InsufficientFundsError(Exception):
    pass

def withdraw(balance, amount):
    if amount > balance:
        raise InsufficientFundsError("Not enough funds")
```

`class InsufficientFundsError(Exception):` inherits from Python's built-in `Exception` class,
exactly parallel to `class CustomError extends Error` in JavaScript. `pass` is a placeholder meaning
"nothing extra needed here" — the inherited behavior from `Exception` is sufficient.

### `finally` — same purpose as JavaScript

```python
try:
    process_file()
except IOError:
    print("File error")
finally:
    print("Cleanup, runs regardless")
```

## Simple Example

```python
class InsufficientFundsError(Exception):
    pass

def withdraw(balance, amount):
    if amount > balance:
        raise InsufficientFundsError(f"Cannot withdraw {amount}, balance is {balance}")
    return balance - amount

try:
    withdraw(50, 100)
except InsufficientFundsError as e:
    print(f"Transaction failed: {e}")
```

## Let's Break It Down

- `InsufficientFundsError` is a custom exception type, defined by inheriting from `Exception` —
  directly parallel to extending `Error` in JavaScript.
- `raise` immediately stops normal execution with this specific error, carrying a descriptive
  message.
- `except InsufficientFundsError as e:` catches specifically this error type, giving `e` as a
  reference to the actual exception object (its message accessible via `str(e)` or directly in an
  f-string, as shown).

## Common Mistakes

- **Using a bare `except:`** (catching absolutely everything with no type specified) as a default
  habit — this can silently swallow genuinely unexpected errors, exactly the same risk as an
  overly broad `catch` in JavaScript that does nothing meaningful with the error.
- **Ordering `except` clauses incorrectly**, with a broad `Exception` catch before a more specific
  one — the specific one would then never actually be reached, mirroring the `elif`-ordering trap
  from Fundamentals.
- **Forgetting Python's error hierarchy has many specific built-in types** (`ValueError`,
  `TypeError`, `KeyError`, `IndexError`, and more) worth catching specifically rather than always
  reaching for a generic catch-all.

## When Should I Use It?

Catch specific exception types when you know exactly what might go wrong and want to handle it
deliberately. Use a custom exception class for your own application's meaningful failure
categories, exactly as you would with a custom `Error` subclass in JavaScript.

## Exercises

1. **(Recall)** What's the Python equivalent of JavaScript's `throw` and `catch`?
2. **(Application)** Write a function `divide(a, b)` that raises a `ValueError` with a clear message
   if `b` is `0`, otherwise returns `a / b`, and a `try`/`except` block that calls it safely.
3. **(Problem Solving)** A `try`/`except` block uses a bare `except:` with no type specified, and a
   genuine bug elsewhere in the code gets silently swallowed instead of surfacing. Explain the risk
   and how you'd rewrite it more safely.

## What Should I Learn Next?

Continue to [`07-modules-and-packages`](../07-modules-and-packages) — organizing Python projects
across files, and using `pip` to install packages, paralleling npm from the JavaScript ecosystem.
