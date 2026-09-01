# Variables & Types

**Module:** JavaScript
**Prerequisites:** [`01-fundamentals`](../../01-fundamentals) (full module)

## What is it?

This topic revisits variables and data types specifically as JavaScript implements them — `let`,
`const`, `var`, and JavaScript's specific set of primitive types — building directly on the
general concepts from Fundamentals, now with JavaScript-specific rules and behavior.

## Why does it matter?

Fundamentals covered variables and types conceptually, across languages in general. JavaScript has
several real, practical quirks in this area — three different variable declaration keywords with
different behavior, and specific rules about how types are represented internally — that matter
the moment you write real JS code, not just theoretically.

## How does it work?

### `let`, `const`, and `var` — three ways to declare a variable

```javascript
let age = 25;      // reassignable, block-scoped
const name = "Alice"; // NOT reassignable, block-scoped
var oldStyle = true;   // reassignable, function-scoped (legacy)
```

`let` and `const` were introduced specifically to fix problems with `var`. As covered in the
Fundamentals Scope lesson, `var` ignores block scope and "leaks" out of `if`/`for` blocks — modern
JavaScript style avoids `var` entirely, defaulting to `const`, and using `let` only when a variable
genuinely needs reassignment.

### `const` prevents reassignment, not mutation

A subtlety worth being precise about:

```javascript
const numbers = [1, 2, 3];
numbers.push(4);        // fine! the array's CONTENTS can change
console.log(numbers);   // [1, 2, 3, 4]

numbers = [5, 6, 7];     // ERROR — can't reassign what `numbers` points to
```

`const` only prevents the variable itself from being reassigned to point at a different value — it
does *not* make objects or arrays immutable. This connects directly back to the Fundamentals Memory
Basics lesson: `numbers` holds a reference to an array, and `const` fixes that reference, but the
array *at that reference* can still be freely modified.

### JavaScript's primitive types

```javascript
typeof "hello"     // "string"
typeof 42          // "number"
typeof true        // "boolean"
typeof undefined   // "undefined"
typeof null        // "object" (a famous, long-standing JavaScript quirk/bug)
typeof Symbol()    // "symbol"
typeof 10n         // "bigint"
```

The `typeof null` returning `"object"` is a genuine, well-known historical bug in JavaScript, kept
around for backward compatibility rather than fixed — worth knowing about specifically so it
doesn't confuse you when you encounter it, rather than assuming your own code is wrong.

### `undefined` versus `null` — two different kinds of "nothing"

```javascript
let a;
console.log(a); // undefined — declared, but never assigned a value

let b = null;
console.log(b); // null — deliberately, explicitly set to "no value"
```

`undefined` generally means "this hasn't been given a value" (JavaScript's own default), while
`null` means "a value was deliberately set to represent absence" — a distinction your own code
introduces on purpose. Many real bugs stem from treating these as interchangeable when checking for
"no value," rather than being precise about which one is actually expected in a given situation.

### Numbers — there's only one number type

```javascript
const int = 42;
const float = 3.14;
typeof int;   // "number"
typeof float; // "number" — same type, unlike some languages with separate int/float types
```

Unlike some languages that distinguish integers from floating-point numbers as separate types,
JavaScript has a single `number` type covering both. This simplifies things in some ways, but also
causes some counterintuitive results with precision:

```javascript
0.1 + 0.2 // 0.30000000000000004, not exactly 0.3
```

This isn't a JavaScript-specific bug — it's a consequence of how floating-point numbers are
represented in binary across virtually all programming languages — but it's worth knowing about
before it confuses you in a real calculation or comparison.

## Simple Example

```javascript
const user = {
  name: "Alice",
  age: undefined,   // not yet provided
  bio: null          // explicitly, deliberately empty
};

let loginAttempts = 0;
loginAttempts += 1;
```

## Let's Break It Down

- `name`, `age`, `bio` demonstrate the `undefined`/`null` distinction directly: `age` simply hasn't
  been filled in yet (the value is missing/unknown); `bio` has been deliberately set to represent
  "there is no bio," a meaningful, intentional state rather than an oversight.
- `loginAttempts` uses `let` because it's genuinely expected to change — a counter incrementing
  over time — matching the guidance from Fundamentals: reach for `let` specifically when
  reassignment is truly needed, and `const` otherwise.

## Common Mistakes

- **Using `var` out of old habit or copied examples**, missing out on the safer block-scoping
  behavior of `let`/`const`.
- **Assuming `const` makes an object or array fully immutable.** It only locks the variable's
  reference, not the object's contents.
- **Treating `null` and `undefined` as always interchangeable**, when many APIs and codebases use
  them to mean genuinely different things.
- **Being surprised by floating-point precision issues** (like `0.1 + 0.2`) and assuming your own
  logic is broken, when it's actually a well-known characteristic of how floating-point numbers work
  in general.

## When Should I Use It?

Default to `const` for everything; switch to `let` only when a variable will genuinely be
reassigned. Avoid `var` in new code entirely. Use `null` deliberately in your own code to represent
"intentionally no value," and treat `undefined` as JavaScript's own signal for "not yet assigned" —
being consistent about this distinction in your own code makes it easier to reason about later.

## Exercises

1. **(Recall)** What's the practical difference between `let` and `const`, and between `const` and
   `var`?
2. **(Understanding)** Explain why `const numbers = [1,2,3]; numbers.push(4);` is valid, even though
   `const` is supposed to prevent reassignment.
3. **(Application)** Rewrite this snippet to use `let`/`const` appropriately instead of `var`,
   explaining your choice for each variable:
   ```javascript
   var total = 0;
   var taxRate = 0.1;
   for (var i = 0; i < 5; i++) {
     total += 10;
   }
   ```
4. **(Problem Solving)** A function checks `if (value === null)` to determine "no value was
   provided," but a caller passes `undefined` instead, and the check fails to catch it. Explain why,
   and describe a more robust way to check for "no value" that catches both cases.

## What Should I Learn Next?

Continue to [`02-type-coercion`](../02-type-coercion) — now that you know JavaScript's types
precisely, the next topic covers what happens when values of different types interact, which is
where a lot of JavaScript's more surprising behavior comes from.
