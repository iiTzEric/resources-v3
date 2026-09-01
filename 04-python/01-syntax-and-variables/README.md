# Syntax & Variables

**Module:** Python (Parallel Track)
**Prerequisites:** [`03-javascript`](../../03-javascript) (full module recommended)

## What is it?

This module teaches Python primarily by **translation** from the JavaScript you already know
deeply — the underlying programming concepts (variables, loops, functions) are identical; what
differs is syntax and a handful of real behavioral differences worth knowing precisely.

## Why does it matter?

A second language, learned by contrast rather than from scratch, reinforces that programming
concepts are largely universal — only their expression changes. Python specifically is widely used
for scripting, data work, and backend development (Flask/FastAPI, an alternative to Express),
making it a genuinely useful, practical second language rather than a purely academic exercise.

## How does it work?

### No curly braces — indentation defines blocks

```python
if age >= 18:
    print("Adult")
else:
    print("Minor")
```

The **colon `:`** starts a block, and everything indented underneath belongs to it. This isn't
optional style — inconsistent indentation is a genuine syntax error in Python, not just a
readability issue as in JavaScript. Convention is 4 spaces per level.

### No semicolons

Lines simply end; no `;` needed (though Python won't complain if you leave stray ones on, it's not
idiomatic).

### Variables — much simpler than JavaScript's `let`/`const`/`var`

```python
name = "Alice"
age = 28
```

No declaration keyword at all — `name = value` both declares and assigns. Python has no
`const`-equivalent built into the language itself for basic variables (there are conventions, like
naming constants in `ALL_CAPS`, but nothing enforced by the language the way `const` is in
JavaScript).

### Booleans and `None`

```python
is_active = True   # capitalized, unlike JS's lowercase true/false
is_admin = False
result = None        # Python's equivalent of null/undefined combined
```

Python doesn't distinguish `null` from `undefined` the way JavaScript does — `None` covers both
"not yet assigned" and "deliberately empty" roles.

### f-strings — Python's template literals

```python
name = "Alice"
age = 28
print(f"{name} is {age} years old.")
```

The `f` prefix before the opening quote enables `{expression}` interpolation — directly equivalent
to JavaScript's backtick template literals.

### `print()` — Python's `console.log()`

```python
print("Hello, world!")
```

### Comments

```python
# a single-line comment, using # instead of JS's //
```

## Simple Example

```python
name = "Eric"
age = 25

if age >= 18:
    print(f"{name} is an adult.")
else:
    print(f"{name} is a minor.")
```

## Let's Break It Down

- No type keyword needed for `name`/`age` — Python infers the type from the assigned value, just as
  JavaScript does with `let`/`const`.
- The `if`/`else` block relies entirely on indentation and the colon, rather than curly braces — the
  logic itself is identical to the JavaScript version you already know.
- The f-string produces the same interpolated output you'd get from a JS template literal.

## Common Mistakes

- **Inconsistent indentation**, which is a genuine syntax error in Python, unlike JavaScript where
  indentation is purely cosmetic.
- **Using lowercase `true`/`false`/`null`** out of JS habit — Python requires `True`/`False`/`None`,
  capitalized.
- **Forgetting the colon** at the end of `if`, `for`, `while`, and `def` lines.

## When Should I Use It?

Reach for Python when working on scripts, data-related tasks, or a Python-based backend
(Flask/FastAPI) — contexts where Python's ecosystem and libraries are particularly strong. For
front-end/browser work, JavaScript remains the only real option, since it's the language browsers
actually run.

## Exercises

1. **(Recall)** What replaces curly braces in Python for defining code blocks?
2. **(Application)** Translate this JavaScript into Python:
   ```javascript
   const score = 85;
   if (score >= 90) {
     console.log("A");
   } else {
     console.log("B or lower");
   }
   ```
3. **(Problem Solving)** A Python script throws `IndentationError` on a line that looks visually
   correct. What are two likely, subtle causes worth checking (hint: think about what "looks the
   same" doesn't guarantee)?

## What Should I Learn Next?

Continue to [`02-lists-and-loops`](../02-lists-and-loops) — Python's version of arrays and `for`
loops, including list comprehensions, a genuinely new tool without a direct JS equivalent.
