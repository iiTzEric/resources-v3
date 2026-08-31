# Scope

**Module:** Programming Fundamentals
**Prerequisites:** [`06-functions`](../06-functions)

## What is it?

**Scope** determines where in your code a variable is accessible from — which parts of your
program can "see" and use a given variable, and which parts can't.

## Why does it matter?

You already brushed up against this in the Functions lesson: a variable declared inside a function
(like `tax` inside `calculateTotal`) doesn't exist outside it. Scope is the full rule system behind
that behavior. Understanding scope explains a huge number of "why can't I access this variable
here" errors, and it's also what makes functions safely reusable — each call gets its own private
variables, uninfluenced by any other call happening elsewhere.

## Mental Model

Think of scope like a set of nested rooms with one-way windows. Someone standing inside an inner
room can look out through the window and see what's in the room around them (and the room around
that, and so on, outward) — but someone standing in an outer room cannot see *into* a closed inner
room. Code works the same way: inner scopes can "see" variables from outer scopes, but outer scopes
can never see variables declared inside an inner one.

## How does it work?

### Global scope

```javascript
const siteName = "My App"; // declared outside any function — global

function showName() {
  console.log(siteName); // can see it — global scope is visible everywhere
}

showName();          // "My App"
console.log(siteName); // "My App" — also works out here
```

Anything declared outside any function (or block) is in the **global scope** — visible from
literally anywhere else in the file.

### Function scope

```javascript
function greet() {
  const message = "Hello!"; // only exists inside greet()
  console.log(message);
}

greet();              // "Hello!"
console.log(message); // ERROR: message is not defined
```

Variables declared *inside* a function exist only for the duration of that function call, and are
completely invisible from outside it. This is exactly why `calculateTotal`'s `tax` variable, from
the previous lesson, can't be accessed anywhere else.

### Block scope

```javascript
if (true) {
  const x = 10;
  console.log(x); // 10 — fine, we're inside the block
}

console.log(x); // ERROR: x is not defined
```

Any `{ }` block — an `if`, a `for` loop, a `while` loop — creates its own scope for variables
declared with `let` or `const`. This is a big part of *why* `let`/`const` are preferred over the
older `var` keyword: `var` ignores block scope entirely and "leaks" out of blocks, which is a
common, confusing source of bugs in older JavaScript code.

```javascript
// var ignores block scope — this actually works, which is the problem
if (true) {
  var y = 10;
}
console.log(y); // 10 — leaked out of the block, unlike let/const
```

### The core rule: inner scopes see outward, never the reverse

```javascript
const outer = "I'm outside";

function example() {
  const inner = "I'm inside";
  console.log(outer); // fine — can see outward
  console.log(inner); // fine — this is its own scope
}

example();
console.log(inner); // ERROR — outer code cannot see inward
```

This single rule explains everything above: global scope is visible to everything (since
everything is "inside" it, in a sense), function scope is visible only within that function (and
anything nested further inside it), and block scope follows the same logic at a smaller level.

### Shadowing — when an inner variable reuses an outer name

```javascript
const count = 1;

function example() {
  const count = 2; // a completely NEW variable, just sharing a name
  console.log(count); // 2 — refers to the inner one
}

example();
console.log(count); // 1 — completely unaffected, still the outer one
```

This is called **shadowing**: the inner `count` doesn't overwrite or interact with the outer
`count` at all — it's an entirely separate variable that merely happens to share the same name, and
temporarily "hides" the outer one from view *within that inner scope only*. This can be
intentional, but it's also a real source of confusion when it happens accidentally — especially in
larger functions where it's easy to lose track of which `count` a given line is actually referring
to.

### Why scope enables safe function reuse

```javascript
function double(n) {
  const result = n * 2;
  return result;
}

double(5);  // uses its own private `result`, `n`
double(10); // a completely separate, independent private `result`, `n`
```

Because each function call gets its own fresh scope, calling `double` many times — even at the same
time in more advanced async scenarios — never causes one call's `n` or `result` to interfere with
another's. This isolation is what makes functions genuinely reusable and predictable, no matter how
many times or in what order they're called.

## Simple Example

```javascript
function processOrder(price) {
  const tax = price * 0.1;
  const total = price + tax;
  return total;
}

console.log(processOrder(100)); // 110
console.log(tax);  // ERROR — tax only exists inside processOrder
console.log(total); // ERROR — same reason
```

## Let's Break It Down

- `tax` and `total` are both declared with `const` *inside* `processOrder` — they live entirely in
  that function's scope.
- Calling `processOrder(100)` works fine — everything it needs is visible to it (its own
  parameters and local variables).
- Trying to access `tax` or `total` from outside the function fails, because those variables never
  existed anywhere except inside that one function call — once the function finishes running, they
  effectively cease to exist as far as the rest of the program is concerned.

## Common Mistakes

- **Expecting a variable declared inside a function or block to be usable outside it.** This is
  probably the single most common scope-related error for beginners, and the error message
  (`ReferenceError: x is not defined`) is exactly this rule being enforced.
- **Using `var` and being surprised when it "leaks" out of a block**, unlike `let`/`const`. This is
  one of the concrete, practical reasons modern JavaScript style avoids `var` entirely.
- **Accidental shadowing** — reusing a variable name inside a nested scope without realizing an
  outer variable of the same name exists, leading to confusion about which one a given line
  actually refers to.
- **Assuming two separate function calls somehow share their local variables.** They don't — each
  call gets an entirely independent set of local variables, even if it's the exact same function
  called twice in a row.

## When Should I Use It?

You don't "turn scope on" — it's automatic and always present. What you *do* control is where you
declare things: keep variables as narrowly scoped as possible (inside the function or block that
actually needs them), rather than declaring everything globally out of convenience. Narrow scope
makes code easier to reason about, since you don't have to track a variable's value across your
entire program — only within the small region where it's actually declared and used.

## Exercises

1. **(Recall)** What are the three levels of scope covered in this lesson?
2. **(Understanding)** Explain, using the "nested rooms" mental model, why a variable declared
   inside a function can't be accessed from outside it, but a global variable can be accessed from
   inside a function.
3. **(Application)** Predict the output of this code before running it, then verify:
   ```javascript
   let x = "outer";
   function test() {
     let x = "inner";
     console.log(x);
   }
   test();
   console.log(x);
   ```
4. **(Problem Solving)** A developer declares a variable `total` at the very top of a large file
   (global scope) so that "every function can use it," and later runs into a bug where one function
   unexpectedly changes `total` and breaks a completely unrelated part of the program. Using what
   you learned about scope, explain why declaring things globally out of convenience is risky, and
   what a better approach would look like.

## What Should I Learn Next?

Continue to [`08-data-structures-intro`](../08-data-structures-intro) — so far every example has
worked with single values (one number, one string). Real programs constantly need to work with
*collections* of data — lists and grouped records — which is where data structures come in.
