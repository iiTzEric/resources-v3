# Functions In Depth

**Module:** JavaScript
**Prerequisites:** [`03-operators`](../03-operators)

## What is it?

JavaScript has three distinct ways to write a function — function declarations, function
expressions, and arrow functions — each with real, sometimes important behavioral differences, not
just stylistic ones.

## Why does it matter?

Code you'll read (and copy patterns from) uses all three forms interchangeably. Knowing exactly how
they differ — especially around hoisting and `this` — prevents confusion later, particularly once
you reach the `this` topic and React, where arrow functions are used constantly and deliberately for
specific reasons.

## How does it work?

### Function declarations

```javascript
function greet(name) {
  return "Hello, " + name;
}
```

These are **hoisted** — JavaScript makes the function available throughout its scope even before
the line it's written on, so calling it earlier in the file still works:

```javascript
console.log(greet("Alice")); // works, even though greet is defined below
function greet(name) { return "Hello, " + name; }
```

### Function expressions

```javascript
const greet = function(name) {
  return "Hello, " + name;
};
```

Here, the function is assigned to a variable, like any other value. Unlike declarations, function
expressions are **not** hoisted in a usable way — calling `greet` before this line would throw an
error, since `greet` doesn't hold a function yet at that point.

### Arrow functions

```javascript
const greet = (name) => {
  return "Hello, " + name;
};

const greetShort = name => "Hello, " + name; // implicit return, single param, no parens needed
```

Arrow functions are more compact, and — critically — handle `this` differently from the other two
forms (covered fully in the `this` topic). For now, know that arrow functions don't get their own
`this` — they use whatever `this` was in the surrounding code where they were defined, which is
often exactly the behavior you want, especially inside callbacks.

### Default parameters and rest parameters together

```javascript
function createUser(name, role = "member", ...permissions) {
  return { name, role, permissions };
}

createUser("Alice", "admin", "read", "write");
// { name: "Alice", role: "admin", permissions: ["read", "write"] }
```

Default values and rest parameters (collecting any extra arguments into an array) can combine in
one function signature — rest must always come last, since it collects "everything else."

### Immediately Invoked Function Expressions (IIFE) — a brief, useful pattern

```javascript
(function() {
  console.log("Runs immediately, once");
})();
```

A function defined and called in the same statement — historically used to create a private scope
before proper modules existed. Less common in modern module-based code, but you'll still encounter
it in older codebases and it's worth recognizing.

## Simple Example

```javascript
const numbers = [1, 2, 3, 4];

const doubled = numbers.map(function(n) { return n * 2; });
const doubledArrow = numbers.map(n => n * 2);

console.log(doubled, doubledArrow); // both: [2, 4, 6, 8]
```

## Let's Break It Down

- Both versions produce the identical result — this demonstrates that arrow functions and function
  expressions are largely interchangeable for straightforward logic like this.
- The arrow version is more concise, especially with the implicit return (no `{ }` or `return`
  needed for a single expression) — this brevity is exactly why arrow functions became the default
  style for short callbacks like this one.

## Common Mistakes

- **Assuming all three function forms are fully interchangeable**, missing the real differences in
  hoisting and `this` behavior that occasionally matter.
- **Relying on hoisting for function declarations as a substitute for organizing code
  sensibly** — just because it works doesn't mean defining functions after their first use makes
  code easy to follow.
- **Using arrow functions as object methods** where `this` is expected to refer to the object
  itself — this is a genuine, common bug covered in depth in the `this` topic.

## When Should I Use It?

Use function declarations for top-level, named functions that represent a clear piece of logic.
Use arrow functions for short callbacks (passed to `.map()`, `.filter()`, event handlers) where
concise syntax and inherited `this` behavior are usually exactly what you want.

## Exercises

1. **(Recall)** What is "hoisting," and which of the three function forms benefits from it?
2. **(Application)** Rewrite this function expression as an arrow function with implicit return:
   `const square = function(n) { return n * n; };`
3. **(Problem Solving)** Code calls a function before its definition in the file and it works fine
   with one style, but throws an error with another. Explain which styles behave which way, and why.

## What Should I Learn Next?

Continue to [`05-scope-and-closures`](../05-scope-and-closures) — building on the general scope
covered in Fundamentals, this topic covers closures specifically: functions that remember the
environment they were created in.
