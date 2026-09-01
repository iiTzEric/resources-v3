# Destructuring & Spread/Rest

**Module:** JavaScript
**Prerequisites:** [`07-objects`](../07-objects)

## What is it?

**Destructuring** unpacks values out of an array or object directly into named variables. **Spread**
(`...`) expands an array/object's contents. **Rest** (also `...`) collects multiple values into one
array. These are pure syntax — they don't add new capability, but they make extremely common
patterns dramatically shorter and clearer.

## Why does it matter?

This syntax appears constantly in modern JavaScript and especially in React (function parameters,
`useState`, props). Recognizing and using it fluently is essential for reading and writing real,
current JavaScript code.

## How does it work?

### Object destructuring

```javascript
const user = { name: "Alice", email: "alice@example.com" };
const { name, email } = user;
```

Instead of `user.name` and `user.email` separately, this pulls both directly into standalone
variables in one line. Especially common in function parameters:

```javascript
function greet({ name, email }) {
  console.log(`Hi ${name}, we'll email you at ${email}`);
}
```

### Renaming and default values while destructuring

```javascript
const { name: userName, role = "member" } = user;
// userName holds user.name's value; role defaults to "member" if user.role doesn't exist
```

### Array destructuring

```javascript
const colors = ["red", "green", "blue"];
const [first, second] = colors;
// first = "red", second = "green"
```

Position-based, unlike object destructuring's name-based matching. This exact pattern is how React's
`useState` works: `const [count, setCount] = useState(0)`.

### Spread — expanding

```javascript
const arr1 = [1, 2];
const arr2 = [3, 4];
const combined = [...arr1, ...arr2]; // [1, 2, 3, 4]

const obj1 = { a: 1 };
const obj2 = { ...obj1, b: 2 }; // { a: 1, b: 2 }
```

### Rest — collecting

```javascript
function sum(...numbers) {
  return numbers.reduce((total, n) => total + n, 0);
}

sum(1, 2, 3); // 6, numbers becomes [1, 2, 3]

const { name, ...otherFields } = user;
// name is pulled out separately; otherFields holds everything else
```

**The same `...` symbol means opposite things depending on where it appears**: on the right side of
an assignment or in a function call, it *spreads* (expands); as a function parameter or in
destructuring, it *collects* (gathers the rest). Context determines which.

## Simple Example

```javascript
function renderCard({ id, name, email }) {
  return `<div data-id="${id}"><h3>${name}</h3><p>${email}</p></div>`;
}

const users = [
  { id: 1, name: "Alice", email: "alice@x.com" },
  { id: 2, name: "Ben", email: "ben@x.com" }
];

const html = users.map(renderCard).join("");
```

## Let's Break It Down

- `renderCard` destructures `id`, `name`, `email` directly from its parameter — the function
  signature itself documents exactly what properties it expects, without needing `user.id`,
  `user.name` repeated throughout the function body.
- `users.map(renderCard)` passes each user object directly into `renderCard`, which immediately
  destructures what it needs.
- This is genuinely the exact pattern used throughout real React codebases for rendering lists of
  data as UI.

## Common Mistakes

- **Forgetting a property in the destructuring parameter list**, then getting a "not defined" error
  when the function body tries to reference it — every property the function body uses must be
  listed in the destructuring pattern.
- **Confusing spread (expanding) with rest (collecting)** since they look identical — remember,
  it's about *where* the `...` appears, not the symbol itself.
- **Assuming destructuring or spread does anything beyond a shallow copy/unpack** — nested objects
  are still shared by reference, exactly as with plain spread covered in the Objects topic.

## When Should I Use It?

Destructure function parameters whenever a function receives an object and only needs specific
properties from it — this documents intent directly in the signature. Use spread for creating
updated copies of arrays/objects. Use rest when a function needs to accept a flexible number of
arguments.

## Exercises

1. **(Recall)** What's the difference between how spread and rest use the same `...` syntax?
2. **(Application)** Rewrite this function to destructure its parameter:
   `function total(order) { return order.price * order.quantity; }`
3. **(Problem Solving)** A function destructures `{ id, name }` from its parameter, but calling it
   with an object that also has an `email` field throws no error — yet `email` isn't accessible
   inside the function. Explain why, and how you'd fix it if `email` was actually needed.

## What Should I Learn Next?

Continue to
[`09-higher-order-functions-and-callbacks`](../09-higher-order-functions-and-callbacks) — you've
been using functions as arguments to `.map()`/`.filter()` already; this topic makes that pattern
explicit and general.
