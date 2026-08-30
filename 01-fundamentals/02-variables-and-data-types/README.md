# Variables & Data Types

**Module:** Programming Fundamentals
**Prerequisites:** [`01-how-programs-work`](../01-how-programs-work)

## What is it?

A **variable** is a named container that holds a value your program can use later. A **data type**
describes what *kind* of value is stored — a number, some text, a true/false value, and so on.
Together, variables and types are how a program remembers and works with information as it runs.

## Why does it matter?

Every program you'll ever write manipulates data — user input, prices, names, scores, settings.
Variables are how that data gets a name you can refer to, and types are how the computer (and you)
know what operations make sense on that data. You can't add two pieces of text the way you add two
numbers, and you can't check if a number is "true" the same way you check a boolean — types are
what make those distinctions meaningful.

## How does it work?

### Naming a value

```javascript
let age = 25;
```

Read this as: "create a label called `age`, and have it point at the value `25`." From this point
on, using `age` anywhere in your code means "whatever value is currently stored there."

### Common basic data types

Every mainstream language has some version of these:

- **Number** — `25`, `3.14`, `-8` — for counting, measuring, calculating.
- **String** — `"hello"`, `"Alice"` — text, always wrapped in quotes.
- **Boolean** — `true` or `false` — for yes/no, on/off logic.
- **Undefined / None / Null-ish values** — representing "no value yet" or "intentionally empty" —
  the exact name and behavior varies by language (JavaScript has both `undefined` and `null`;
  Python has `None`).

More complex types — lists of values, and structured groups of values — build on top of these
basics, and get their own dedicated topic later ([`08-data-structures-intro`](../08-data-structures-intro)).

### Reassigning vs. never changing

Some variables are meant to change over time (a running total, a counter); others should never
change once set (a fixed configuration value). Many modern languages let you express this intent
directly:

```javascript
let score = 0;      // can change later
const maxScore = 100; // should never change
```

This isn't just a style preference — declaring something as "shouldn't change" (`const` in
JavaScript) helps catch real mistakes: if you accidentally try to reassign a `const`, the program
will refuse and tell you immediately, rather than silently letting a bug slip through.

### Why types matter: type safety and mismatched operations

```javascript
const total = 5 + "5"; // what should this be?
```

Depending on the language, mixing types like this either causes an error (many languages refuse to
guess) or produces a surprising result (JavaScript specifically converts the number to text here,
giving you the string `"55"`, not the number `10`). This exact behavior — **type coercion** — gets
its own deep-dive topic in the JavaScript module, precisely because it causes so many real bugs.
For now, the important takeaway is simpler: **the type of a value determines what operations on it
actually mean.**

## Simple Example

```javascript
const firstName = "Alice";
const age = 28;
const isStudent = false;

console.log(firstName + " is " + age + " years old.");
```

## Let's Break It Down

- `firstName`, `age`, and `isStudent` are three separate variables, each holding a different type
  of value: a string, a number, and a boolean.
- `const` is used for all three because none of them are expected to change within this snippet.
- The final line combines the string and number values into one printed sentence. Notice `age`
  (a number) gets automatically treated as text here, purely because it's being joined with other
  text using `+` — this is exactly the kind of type behavior worth being deliberate about, not just
  assuming will "work out."

## Common Mistakes

- **Using a variable before giving it a value.** If a variable is declared but never assigned
  anything, using it usually produces something like `undefined` or an outright error, not the
  value you meant.
- **Confusing text that looks like a number with an actual number.** `"5"` (a string) and `5` (a
  number) look similar but behave very differently — `"5" + "5"` gives `"55"`, while `5 + 5` gives
  `10`. This mismatch is one of the most common early sources of confusing bugs.
- **Overusing reassignable variables out of habit.** Defaulting to "changeable" variables even when
  a value should never change hides your own intent — both from other people reading your code, and
  from tools that could otherwise catch a mistake for you.

## When Should I Use It?

Use a **reassignable** variable when a value is genuinely expected to change during your program's
execution (a counter, a running total, current state). Use a **non-reassignable** one whenever a
value is set once and should stay fixed (a maximum limit, a fixed label, a configuration constant)
— defaulting to this is a good habit, since it makes your intent clear and lets the language catch
accidental changes for you.

## Exercises

1. **(Recall)** Name three basic data types and give an example value for each.
2. **(Understanding)** Why does `5 + "5"` behave differently from `5 + 5` in JavaScript? What is
   actually happening to the number in the first case?
3. **(Application)** Create variables to represent a person: their name, age, and whether they're
   currently employed. Choose sensible types for each, and decide which should be reassignable.
4. **(Problem Solving)** A program is supposed to calculate a total price, but the result keeps
   coming out as something like `"1020"` instead of `30`. Based on what you know about types, what's
   the most likely cause, and how would you confirm it?

## What Should I Learn Next?

Continue to [`03-operators`](../03-operators) — now that you can store values of different types,
the next step is actually doing something with them: comparing, combining, and calculating.
