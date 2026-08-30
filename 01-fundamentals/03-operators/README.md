# Operators

**Module:** Programming Fundamentals
**Prerequisites:** [`02-variables-and-data-types`](../02-variables-and-data-types)

## What is it?

An **operator** is a symbol that performs an action on one or more values — adding numbers,
comparing two things, combining logical conditions. `+`, `-`, `===`, `&&` are all operators. The
values an operator acts on are called **operands**: in `5 + 3`, the operator is `+` and the
operands are `5` and `3`.

## Why does it matter?

Operators are the actual "verbs" of programming — variables and data types (from the last topic)
give you nouns to work with, but operators are how you *do* something with them: calculate,
compare, decide. Nearly every line of real code contains at least one operator, and a surprising
number of subtle bugs come from misunderstanding exactly how a specific operator behaves, or in
what order multiple operators get evaluated.

## How does it work?

### Arithmetic operators

```javascript
5 + 3   // 8   addition
5 - 3   // 2   subtraction
5 * 3   // 15  multiplication
5 / 3   // 1.666...  division
5 % 3   // 2   remainder ("modulo") — what's left over after dividing
5 ** 2  // 25  exponentiation (5 squared)
```

The **modulo operator (`%`)** deserves special attention, since it's the one most people haven't
seen in everyday math but use constantly in code. `5 % 3` asks: "divide 5 by 3, and give me what's
left over" — 3 goes into 5 once, with 2 remaining, so the answer is `2`. This is how you check
things like "is this number even?" (`n % 2 === 0`) or "wrap a value back around" (useful in
anything cyclical — clock times, rotating through a list).

### Comparison operators

```javascript
5 > 3    // true
5 < 3    // false
5 >= 5   // true
5 <= 3   // false
5 === 5  // true  (equal — value AND type)
5 !== 3  // true  (not equal)
```

Every comparison operator produces a **boolean** (`true` or `false`) — this is important: the
*result* of a comparison is itself a value, one you can store, pass around, or use directly in an
`if` statement.

**A critical JavaScript-specific detail:** `===` (three equals signs) checks both value and type,
while `==` (two equals signs) tries to convert types to make them match before comparing — which
can produce surprising results (`"5" == 5` is `true`, but `"5" === 5` is `false`). The full
explanation of *why* JavaScript does this lives in the JavaScript module's Type Coercion topic —
for now, the practical rule is: **default to `===` unless you have a specific, deliberate reason
not to.**

### Logical operators

```javascript
true && false   // false  (AND — both sides must be true)
true || false   // true   (OR — at least one side must be true)
!true           // false  (NOT — flips the value)
```

These combine or invert boolean values, and they're how you express compound conditions: "if the
user is logged in AND has an active subscription," or "if the field is empty OR contains only
spaces."

### Assignment operators

```javascript
let total = 10;
total += 5;   // same as: total = total + 5   → 15
total -= 3;   // same as: total = total - 3   → 12
total *= 2;   // same as: total = total * 2   → 24
```

These are shorthand — `+=`, `-=`, `*=`, `/=` all mean "take the current value, do this operation to
it, and store the result back into the same variable." Extremely common in loops and counters,
where you're repeatedly updating one value.

### Operator precedence — the order operators run in

Just like in math class, operators don't run strictly left to right — some run before others:

```javascript
const result = 2 + 3 * 4;   // 14, not 20
```

Multiplication (`*`) runs before addition (`+`), exactly like standard math order of operations
(PEMDAS/BODMAS, if you learned it that way). This is called **operator precedence**. When in doubt
— or when you want your intent to be obvious to a reader, not just technically correct — use
parentheses to force the order explicitly:

```javascript
const result = (2 + 3) * 4;   // 20, explicit and unambiguous
```

Comparison and logical operators have their own precedence rules too, and they interact:

```javascript
const canVote = age >= 18 && hasID;
```

Here, `>=` runs before `&&` — the comparison happens first, producing a boolean, and *then* `&&`
combines that boolean with `hasID`. If you're ever unsure whether your code will evaluate in the
order you expect, parentheses cost nothing and remove all doubt.

### Under the hood: expressions get evaluated into a single value

Every combination of operators and operands — `2 + 3 * 4`, `age >= 18 && hasID` — is called an
**expression**, and every expression eventually reduces down to one single value. The computer
doesn't "see" the whole expression at once the way you read it on the page; it evaluates it in
precedence order, step by step, replacing each piece with its result until only one value remains:

```
2 + 3 * 4
2 + 12      (3 * 4 evaluated first, due to precedence)
14          (final result)
```

This step-by-step reduction is exactly why precedence rules exist and matter — without them,
there'd be no consistent way to know which operation "wins" at each step.

### Short-circuit evaluation — a subtlety of `&&` and `||`

`&&` and `||` don't always evaluate both sides. If the left side of `&&` is `false`, the whole
expression is guaranteed to be `false` regardless of the right side — so JavaScript doesn't even
bother checking the right side at all:

```javascript
false && someFunctionThatMightCrash();  // someFunctionThatMightCrash() never runs
```

Similarly, if the left side of `||` is `true`, the whole expression is guaranteed `true`, so the
right side is skipped:

```javascript
true || someFunctionThatMightCrash();  // never runs either
```

This isn't just a performance detail — it's a pattern real code relies on deliberately, for
example: `user && user.name` safely checks that `user` exists *before* trying to access
`user.name`, since if `user` is falsy, the right side is never evaluated at all (avoiding a crash).

## Simple Example

```javascript
const age = 20;
const hasTicket = true;

const canEnter = age >= 18 && hasTicket;
console.log(canEnter); // true

const total = 3 + 4 * 2;
console.log(total); // 11, not 14
```

## Let's Break It Down

- `age >= 18` evaluates first (comparisons run before `&&`), producing `true`.
- `true && hasTicket` then evaluates — since `hasTicket` is also `true`, the whole expression is
  `true`, and that gets stored in `canEnter`.
- `3 + 4 * 2` — multiplication runs first: `4 * 2` becomes `8`, then `3 + 8` becomes `11`. Reading
  left to right without knowing precedence rules, someone might expect `(3 + 4) * 2 = 14` — this is
  exactly the kind of mismatch precedence rules are meant to resolve consistently, even if it's not
  always the "obvious" reading at first glance.

## Common Mistakes

- **Using `=` when you mean `==` or `===`.** A single `=` is *assignment* ("set this variable to
  this value"), not comparison. Writing `if (age = 18)` inside a condition doesn't check whether
  `age` equals 18 — it *overwrites* `age` with `18`, and then evaluates whether that assignment
  "worked" (which it always does), silently introducing a serious bug.
- **Assuming `==` and `===` behave the same.** They don't — `==` performs type coercion before
  comparing, `===` does not. Defaulting to `===` avoids an entire category of surprising bugs.
- **Forgetting operator precedence and getting an unexpected result.** Especially common when
  mixing arithmetic with comparisons or logical operators in one line — when in doubt, add
  parentheses, even if they're not strictly required, purely for clarity.
- **Relying on short-circuit evaluation without realizing it's happening.** This can cause
  confusion when a function you expected to run (on the right side of `&&` or `||`) silently never
  executes, because the left side already determined the result.

## When Should I Use It?

Use `===`/`!==` by default for comparisons, unless you have a specific, well-understood reason to
use `==`/`!=`. Use parentheses whenever an expression mixes more than one *kind* of operator
(arithmetic with comparison, comparison with logical) — even when precedence would technically get
it right, parentheses make your intent unambiguous to the next person reading the code, including
future you.

## Exercises

1. **(Recall)** What does the `%` (modulo) operator return, and what's one practical use for it?
2. **(Understanding)** Explain why `2 + 3 * 4` evaluates to `14` and not `20`. What rule governs
   this?
3. **(Application)** Without running any code, work out the result of:
   `10 - 2 * 3 + 4 / 2`. Then verify your answer by actually running it.
4. **(Problem Solving)** A program has a bug: `if (userRole = "admin") { ... }` always runs the
   admin logic, even for regular users. Explain exactly what's wrong and how to fix it.
5. **(Problem Solving)** Explain what short-circuit evaluation means using this example, and
   predict whether `logMessage()` runs: `false && logMessage()`.

## What Should I Learn Next?

Continue to [`04-conditionals`](../04-conditionals) — operators produce values, especially
booleans; conditionals are how your program actually *acts* on those boolean results to make
decisions.
