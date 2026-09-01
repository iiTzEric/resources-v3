# Operators (JavaScript-Specific)

**Module:** JavaScript
**Prerequisites:** [`02-type-coercion`](../02-type-coercion)

## What is it?

Beyond the general operators covered in Fundamentals, JavaScript has a handful of its own
specific, very commonly used operators worth knowing well: the nullish coalescing operator,
optional chaining, and the spread/rest syntax (previewed here, covered fully in their own topic).

## Why does it matter?

These operators exist to solve specific, extremely common pain points — safely accessing possibly-
missing data, providing sensible fallback values — that came up constantly before these operators
existed, requiring more verbose workarounds. Knowing them well makes your code both shorter and
genuinely safer against a whole category of "cannot read property of undefined" crashes.

## How does it work?

### Nullish coalescing (`??`) — a precise fallback operator

```javascript
const username = null;
const displayName = username ?? "Guest";
console.log(displayName); // "Guest"
```

`??` provides a fallback *specifically* when the left side is `null` or `undefined` — nothing else.
This is an important, deliberate difference from `||`:

```javascript
const score = 0;
console.log(score || 10); // 10 — because 0 is falsy, || treats it as "missing"
console.log(score ?? 10);  // 0  — because 0 is neither null nor undefined, ?? keeps it
```

If `0`, `""`, or `false` are legitimate, meaningful values in your data (a real score of zero, an
intentionally empty string), `||` will incorrectly treat them as "missing" and substitute the
fallback — `??` avoids this by checking specifically for `null`/`undefined`, nothing broader.

### Optional chaining (`?.`) — safely accessing nested properties

```javascript
const user = { profile: null };

console.log(user.profile.bio);   // ERROR — profile is null, can't read .bio off it
console.log(user.profile?.bio);   // undefined — safely returns undefined instead of crashing
```

`?.` checks "does this exist?" immediately before accessing the next property — if the thing before
`?.` is `null` or `undefined`, the whole expression short-circuits to `undefined` instead of
throwing an error. This is especially useful with real-world data (like API responses) where a
nested field might legitimately be missing:

```javascript
const city = user?.profile?.address?.city ?? "Unknown";
```

This combines both operators naturally: safely navigate through several potentially-missing levels
(`?.`), and provide a sensible final fallback if the result ends up `null`/`undefined` (`??`).

### Optional chaining with function calls

```javascript
user.sendNotification?.(); // only calls sendNotification if it actually exists
```

This checks "does this function exist before trying to call it?" — useful when an object might or
might not have a particular method, avoiding a crash from calling something that isn't there.

### A preview of spread and rest (`...`)

```javascript
const nums = [1, 2, 3];
const more = [...nums, 4, 5]; // [1, 2, 3, 4, 5]

function sum(...values) {
  return values.reduce((total, n) => total + n, 0);
}
```

The same `...` symbol means two different things depending on context: **spreading** (expanding an
array/object) or **collecting** (gathering multiple arguments into one array). This gets a full,
dedicated topic later in this module, alongside destructuring — introduced here just so you
recognize the syntax when it appears.

## Simple Example

```javascript
function getDisplayPrice(product) {
  const discount = product.discount ?? 0;
  const category = product?.category?.name ?? "Uncategorized";
  return `${category}: $${product.price - discount}`;
}

console.log(getDisplayPrice({ price: 20, discount: 5, category: { name: "Books" } }));
// "Books: $15"

console.log(getDisplayPrice({ price: 20 }));
// "Uncategorized: $20" — no crash, even though `discount` and `category` are missing
```

## Let's Break It Down

- `product.discount ?? 0` provides a sensible fallback of `0` only if `discount` is genuinely
  missing (`null`/`undefined`) — if `discount` were legitimately `0` already, `??` correctly leaves
  it as `0`, unlike `||` which would (harmlessly, but for the wrong reason) also produce `0` here
  since `0` is falsy.
- `product?.category?.name` safely attempts to read a potentially two-levels-deep nested value,
  short-circuiting to `undefined` at whichever level is actually missing, rather than crashing.
- Combined with `?? "Uncategorized"`, the whole expression gracefully handles a product that's
  missing `category` entirely, without any explicit `if` checks needed.

## Common Mistakes

- **Using `||` for fallback values when `0`, `""`, or `false` are legitimate possible values**,
  incorrectly overriding them — `??` is almost always the more precise choice for this specific
  purpose.
- **Overusing optional chaining to avoid ever fixing a genuinely broken data flow.** If a value
  should never actually be missing, `?.` masking that with silent `undefined`s can hide a real bug
  rather than surfacing it clearly.
- **Chaining `?.` so deeply that it becomes unclear which specific level might realistically be
  missing**, versus which levels are actually guaranteed to exist by the code's own logic.

## When Should I Use It?

Use `??` specifically when `0`, `""`, or `false` are valid, meaningful values you don't want
accidentally treated as "missing." Use `?.` when accessing a property that might genuinely be
absent in some realistic cases (optional API fields, data that varies in shape) — not as a blanket
habit applied to every property access regardless of whether it could actually be missing.

## Exercises

1. **(Recall)** What's the specific difference between `??` and `||` as fallback operators?
2. **(Understanding)** Explain, with an example, a situation where using `||` for a fallback value
   would produce an incorrect result that `??` would handle correctly.
3. **(Application)** Write an expression that safely accesses `settings.notifications.email`,
   defaulting to `true` if any part of that chain is missing.
4. **(Problem Solving)** A shopping cart shows `$0` for every item that has a real `0` sale price,
   instead of showing the actual sale price. The code is:
   `const displayPrice = item.salePrice || item.price;`. Diagnose the bug and provide the fix.

## What Should I Learn Next?

Continue to [`04-functions-in-depth`](../04-functions-in-depth) — JavaScript has several ways to
write functions beyond the basic form from Fundamentals, each with real behavioral differences
worth understanding precisely.
