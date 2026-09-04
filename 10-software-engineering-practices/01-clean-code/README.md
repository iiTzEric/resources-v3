# Clean Code

**Module:** Software Engineering Practices
**Prerequisites:** Some React/Backend experience recommended

## What is it?

Clean code is code written primarily to be **read and understood by humans**, not just executed
correctly by a computer — clear naming, small focused functions, and structure that communicates
intent.

## Why does it matter?

Code is read far more often than it's written — by teammates, and by your own future self months
later. Code that "merely works" but is hard to understand imposes a real, ongoing cost on everyone
who has to work with it afterward.

## How does it work?

### Naming — the single highest-leverage habit

```javascript
// Unclear
function calc(a, b, t) {
  return a + a * b * t;
}

// Clear
function calculateTotalWithTax(price, quantity, taxRate) {
  return price + price * quantity * taxRate;
}
```

A good name should make a comment explaining "what this does" unnecessary — the name itself carries
that information. This applies to variables, functions, and files alike.

### Small, focused functions — one clear responsibility

```javascript
// Doing too much at once
function processOrder(order) {
  // validate
  if (!order.items.length) throw new Error("Empty order");
  // calculate total
  const total = order.items.reduce((sum, i) => sum + i.price, 0);
  // save
  db.save(order);
  // send email
  emailService.send(order.customerEmail, "Order confirmed");
  return total;
}
```

```javascript
// Split into focused, named pieces
function validateOrder(order) { /* ... */ }
function calculateTotal(order) { /* ... */ }
function saveOrder(order) { /* ... */ }
function sendConfirmation(order) { /* ... */ }

function processOrder(order) {
  validateOrder(order);
  const total = calculateTotal(order);
  saveOrder(order);
  sendConfirmation(order);
  return total;
}
```

The refactored version reads almost like a table of contents for what happens — each piece is
independently understandable, testable, and reusable, directly connecting to the "separation of
concerns" principle covered next.

### Avoiding deep nesting — guard clauses, revisited

```javascript
// Deeply nested
function getDiscount(user) {
  if (user) {
    if (user.isActive) {
      if (user.orders > 10) {
        return 0.1;
      }
    }
  }
  return 0;
}
```

```javascript
// Flattened with guard clauses
function getDiscount(user) {
  if (!user) return 0;
  if (!user.isActive) return 0;
  if (user.orders <= 10) return 0;
  return 0.1;
}
```

This is the same guard-clause pattern from Fundamentals' Functions lesson, now framed explicitly as
a clean-code practice — flattened logic is genuinely easier to follow than deeply nested
conditionals.

### Consistency over personal preference

Following a project's existing naming/formatting conventions, even if they differ slightly from
your own preference, matters more than being "individually correct" — consistency across a
codebase reduces cognitive overhead for everyone reading it.

## Simple Example

```javascript
function d(o) {
  return o.p * o.q;
}
```

versus

```javascript
function calculateLineTotal(orderItem) {
  return orderItem.price * orderItem.quantity;
}
```

## Let's Break It Down

- Both functions perform identical logic — the difference is entirely in how much a reader needs to
  guess versus simply read.
- The second version's names alone communicate what it computes and what each piece of data
  represents, without needing to trace through the logic or guess at abbreviations.

## Common Mistakes

- **Prioritizing brevity over clarity** in naming — shorter isn't better if it requires the reader to
  guess.
- **Writing functions that do many unrelated things**, making them harder to name accurately, test,
  and reuse.
- **Over-engineering "clean code" into excessive abstraction** — clean code should reduce cognitive
  load, not add unnecessary layers of indirection for their own sake.

## When Should I Use It?

Apply these habits by default, in every piece of code — clarity is rarely wasted effort, and the
cost of unclear code compounds every time someone (including future you) has to re-understand it.

## Exercises

1. **(Recall)** Why does clean code matter even for code only you will ever read?
2. **(Application)** Rewrite this function with clearer naming and reduced nesting:
   ```javascript
   function f(x) {
     if (x) {
       if (x.a) {
         return x.a * 2;
       }
     }
     return 0;
   }
   ```
3. **(Problem Solving)** A teammate argues "comments explain unclear code, so we don't need better
   names." Explain the tradeoff being missed here.

## What Should I Learn Next?

Continue to
[`02-separation-of-concerns-and-modularity`](../02-separation-of-concerns-and-modularity) — the
principle behind why splitting `processOrder` into smaller functions actually helps.
