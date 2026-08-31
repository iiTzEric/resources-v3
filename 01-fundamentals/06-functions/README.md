# Functions

**Module:** Programming Fundamentals
**Prerequisites:** [`05-loops`](../05-loops)

## What is it?

A **function** is a named, reusable block of code that performs a specific task. You define it
once, and then **call** it (run it) as many times as you need, optionally feeding it different
input each time and getting a result back.

## Why does it matter?

Without functions, any piece of logic you need more than once has to be copy-pasted everywhere you
need it — and if you ever need to fix or change that logic, you have to find and update every
single copy. Functions solve this by giving repeated logic a single home and a name. They're also
how large programs stay organized: instead of one giant block of code, a program becomes a
collection of small, named, understandable pieces that call each other.

## Mental Model

Think of a function like a small machine: you feed raw materials in one end (**parameters**), it
does a specific job, and a finished product comes out the other end (the **return value**). You
don't need to know the internal gears of a machine to use it — you just need to know what to feed
it and what it gives back. The same is true of a well-written function.

## How does it work?

### Defining and calling a function

```javascript
function greet(name) {
  return "Hello, " + name;
}

console.log(greet("Alice")); // "Hello, Alice"
console.log(greet("Ben"));   // "Hello, Ben"
```

- **`function greet(name) { ... }`** — this is the **definition**: it creates the function and
  names it, but running this line alone does *not* execute the code inside it.
- **`name`** is a **parameter** — a placeholder variable that will hold whatever value gets passed
  in when the function is called.
- **`greet("Alice")`** is the **call** — this is what actually runs the function's code, with
  `"Alice"` as the **argument** (the real value being passed in for the `name` parameter).
- **`return`** specifies what value the function call itself should produce, so it can be used
  elsewhere — stored in a variable, printed, passed to another function.

The distinction between **parameter** (the placeholder in the definition) and **argument** (the
real value at the call site) trips people up initially, but it matters: a function can be called
many times with different arguments, all filling the same parameter slot.

### Why `return` matters — a function without it doesn't give you anything usable

```javascript
function addNoReturn(a, b) {
  a + b; // calculated, but never returned
}

function addWithReturn(a, b) {
  return a + b;
}

console.log(addNoReturn(2, 3));   // undefined
console.log(addWithReturn(2, 3)); // 5
```

`addNoReturn` still calculates `a + b` internally — but since nothing captures or returns that
result, it's simply discarded the moment the function finishes, and calling it produces
`undefined`. This is a genuinely common early mistake: performing a calculation inside a function
isn't the same as making that result available to whoever called the function.

### `return` also exits the function immediately

```javascript
function checkAge(age) {
  if (age < 0) {
    return "Invalid age";
  }
  if (age < 18) {
    return "Minor";
  }
  return "Adult";
}
```

The moment a `return` statement runs, the function stops executing immediately — any code after it
inside the function never runs for that call. This is the basis of the **guard clause** pattern:
checking for invalid or special cases early, returning right away, so the rest of the function can
assume it's dealing with valid, "normal" input from that point on.

### Default parameters

```javascript
function greet(name = "friend") {
  return "Hello, " + name;
}

console.log(greet());        // "Hello, friend"
console.log(greet("Alice")); // "Hello, Alice"
```

If a caller doesn't provide an argument for a parameter that has a default, the default value is
used instead of the parameter being `undefined`.

### Functions can call other functions

```javascript
function square(n) {
  return n * n;
}

function sumOfSquares(a, b) {
  return square(a) + square(b);
}

console.log(sumOfSquares(3, 4)); // 25
```

This is how real programs are actually built — not as one giant function doing everything, but as
many small functions, each responsible for one clear task, combined together. `sumOfSquares`
doesn't need to know *how* `square` works internally — it only needs to know what `square` takes in
and what it gives back. This separation is one of the most important ideas in all of software
engineering, and it will come back explicitly in the Software Engineering Practices module under
"separation of concerns."

### Under the hood: the call stack (a first look)

Every time a function is called, the computer needs to remember *where to return to* once that
function finishes — especially important when functions call other functions, as `sumOfSquares`
does above. This bookkeeping happens on something called the **call stack**: each function call
gets "stacked" on top of the previous one, and as each function finishes and returns, it gets
popped off the stack, and execution resumes exactly where it left off in the function that called
it. You'll revisit the call stack in much more depth in the JavaScript module (it's essential for
understanding the event loop and recursion) — for now, the important idea is simply that function
calls nest, and the computer keeps track of exactly where to "come back to" at every level.

## Simple Example

```javascript
function calculateTotal(price, taxRate) {
  const tax = price * taxRate;
  return price + tax;
}

const total = calculateTotal(100, 0.1);
console.log(total); // 110
```

## Let's Break It Down

- `calculateTotal` is defined with two parameters: `price` and `taxRate`.
- Calling `calculateTotal(100, 0.1)` runs the function body with `price` set to `100` and `taxRate`
  set to `0.1`.
- Inside, `tax` is calculated as `100 * 0.1 = 10`, a completely local variable that only exists
  while this specific call is running.
- `return price + tax` sends back `110`, which gets stored in the outer variable `total`.
- If you called `calculateTotal(50, 0.2)` next, it would run entirely independently, with its own
  fresh `tax` variable — nothing from the first call carries over or interferes with the second.

## Common Mistakes

- **Forgetting `return`**, and then being confused why a function call always produces `undefined`
  even though the logic inside "looks correct."
- **Confusing parameters with arguments** when discussing or debugging code — knowing which term
  applies where helps you communicate precisely about what's going wrong.
- **Writing functions that do too many unrelated things.** A function named `processUser` that
  validates input, saves to a database, *and* sends an email is doing three separate jobs — harder
  to test, reuse, and reason about than three small, clearly-named functions.
- **Not using early `return`s for invalid/edge cases**, leading to deeply nested `if/else` blocks
  instead of a flat sequence of guard clauses followed by the main logic.

## When Should I Use It?

Write a function any time a piece of logic is used more than once, or any time a block of code
represents one clear, nameable task — even if you only call it once, a well-named function can make
the surrounding code far easier to read than an inline block. Use guard clauses and early returns
when a function needs to handle invalid input or special cases before its main logic.

## Exercises

1. **(Recall)** What is the difference between a parameter and an argument?
2. **(Understanding)** Why does a function that calculates a value but never uses `return` end up
   producing `undefined` when called?
3. **(Application)** Write a function `isEven(number)` that returns `true` if a number is even and
   `false` otherwise.
4. **(Application)** Write a function `describePerson(name, age)` that returns a sentence like
   `"Alice is 28 years old."` Give `age` a sensible default value for cases where it's not provided.
5. **(Problem Solving)** A function `getDiscount(price)` is supposed to return `0` for prices under
   `$20` and `10%` of the price otherwise, but it always returns `undefined`. Here's the code —
   find and explain the bug:
   ```javascript
   function getDiscount(price) {
     if (price < 20) {
       0;
     } else {
       price * 0.1;
     }
   }
   ```

## What Should I Learn Next?

Continue to [`07-scope`](../07-scope) — you already saw that a variable like `tax` inside
`calculateTotal` doesn't exist outside it. Scope is the full explanation of exactly which parts of
your code can see which variables, and why.
