# Modules (ES Modules)

**Module:** JavaScript
**Prerequisites:** [`11-prototypes-and-classes`](../11-prototypes-and-classes)

## What is it?

**ES Modules** (ESM) are JavaScript's official, standardized module system, using `import`/`export`
syntax. This is the modern counterpart to the `require`/`module.exports` system covered in
Fundamentals, and it's what you'll use throughout React and most modern JavaScript tooling.

## Why does it matter?

You'll see `import`/`export` in essentially every React file, and most modern JavaScript projects.
Knowing the syntax precisely, and how it differs from `require`, avoids confusion when switching
between the two systems (which you'll encounter, since Node.js historically defaulted to `require`,
while browsers and modern tooling default to ESM).

## How does it work?

### Named exports and imports

```javascript
// math.js
export function add(a, b) {
  return a + b;
}
export function subtract(a, b) {
  return a - b;
}
```

```javascript
// app.js
import { add, subtract } from "./math.js";
console.log(add(2, 3)); // 5
```

Each `export` can be imported individually by name, using curly braces — matching the destructuring
syntax you already know.

### Default exports

```javascript
// Greeting.js
export default function Greeting() {
  return "Hello!";
}
```

```javascript
// app.js
import Greeting from "./Greeting.js"; // no curly braces, can be named anything
```

A module can have **one** default export, imported without curly braces, and the importer can name
it whatever they like (though matching the original name is a common convention for clarity). This
is the pattern you've already used constantly in React: `export default function App() { ... }`.

### Combining named and default exports

```javascript
export default function App() { /* ... */ }
export const version = "1.0.0";
```

```javascript
import App, { version } from "./App.js";
```

### `import * as` — importing everything as one object

```javascript
import * as math from "./math.js";
math.add(2, 3);
```

Useful when you want access to everything a module exports without listing each one individually.

## Simple Example

```javascript
// utils.js
export function formatPrice(amount) {
  return `$${amount.toFixed(2)}`;
}

export const TAX_RATE = 0.1;
```

```javascript
// checkout.js
import { formatPrice, TAX_RATE } from "./utils.js";

const price = 19.99;
console.log(formatPrice(price * (1 + TAX_RATE))); // "$21.99"
```

## Let's Break It Down

- `utils.js` exports one function and one constant, both by name.
- `checkout.js` imports exactly the two things it needs, by matching name — nothing else from
  `utils.js` is pulled in or accessible.
- This scoping (only explicitly exported/imported items are shared between files) is the same
  underlying benefit covered in the Fundamentals Modules lesson, now expressed with modern syntax.

## Common Mistakes

- **Mixing `require`/`module.exports` and `import`/`export` inconsistently** within the same
  project without understanding they're different systems that generally shouldn't be freely
  interchanged in the same file.
- **Forgetting the file extension** in import paths in environments that require it (`"./math.js"`,
  not `"./math"`) — this varies by tooling/configuration, and is a common source of confusing "module
  not found" errors when switching between setups.
- **Confusing default and named exports' import syntax** — default imports never use curly braces;
  named imports always do.

## When Should I Use It?

Use ES Modules (`import`/`export`) for any modern JavaScript project, especially React — it's the
standard your tooling (Vite, and most current build systems) expects. Use a default export for a
file's "main" thing (a single component, a single class); use named exports for multiple related
utilities within one file.

## Exercises

1. **(Recall)** What's the key difference in import syntax between a default export and a named
   export?
2. **(Application)** Given a file `validators.js` with named exports `isValidEmail` and
   `isValidPhone`, write the import statement to bring in both into another file.
3. **(Problem Solving)** A file has `export default function Button() {...}` and another file tries
   `import { Button } from "./Button.js";` — this fails to work as expected. Explain the mistake and
   the fix.

## What Should I Learn Next?

Continue to [`13-promises-and-async-await`](../13-promises-and-async-await) — you've used
async/await already in earlier projects; this topic covers exactly what's happening underneath.
