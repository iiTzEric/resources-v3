# Modules & Packages

**Module:** Programming Fundamentals
**Prerequisites:** [`12-input-output-and-files`](../12-input-output-and-files)

## What is it?

A **module** is a single file (or unit) of code that can export things it defines (functions,
values) so other files can import and use them. A **package** is a bundle of code — often made up of
many modules — published so other people can install and reuse it in their own projects, instead of
writing that functionality from scratch.

## Why does it matter?

Every real program eventually outgrows a single file. Splitting code across multiple files, each
with a clear responsibility, keeps a growing codebase understandable — this is the same
"separation of concerns" idea you first saw with functions, just applied at the level of whole
files instead of individual blocks of code. Packages take this further: an enormous amount of
software engineering is about correctly using code other people have already written and tested,
rather than reinventing it — knowing how that works is essential, not optional.

## Mental Model

Think of modules like separate departments in a company, each handling one area of responsibility
(accounting, shipping, support) rather than one person trying to do everything. Departments share
information with each other through defined channels (memos, reports) instead of everyone having
access to everyone else's private notes. A module "exporting" something is like a department
publishing an official report anyone can request; another file "importing" it is like requesting
and reading that report.

## How does it work?

### Splitting code across files — exporting and importing

```javascript
// math.js
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

module.exports = { add, subtract };
```

```javascript
// app.js
const math = require("./math");

console.log(math.add(2, 3));      // 5
console.log(math.subtract(5, 2)); // 3
```

This example uses Node.js's original module system (`require`/`module.exports`) — you've actually
already used this exact pattern earlier in the curriculum, with Express (`require("express")`).
Modern JavaScript also has a newer, standardized system called **ES Modules**
(`import`/`export`), covered properly in the JavaScript module's dedicated topic — both systems
solve the same underlying problem, with different syntax.

```javascript
// The ES Modules equivalent, for comparison
export function add(a, b) { return a + b; }
import { add } from "./math.js";
```

### Why this matters beyond just "fewer lines per file"

Without modules, every function and variable in a program would need to live in one giant global
space — remember from the Scope lesson how risky uncontrolled global variables can be. Modules give
each file its **own private scope by default**: something defined in `math.js` isn't automatically
visible in `app.js` unless it's deliberately exported and imported. This is scope's core idea —
controlling visibility — applied at the level of entire files, not just functions and blocks.

### Packages — code other people have already written

A **package** is published, reusable code that you can install into your own project rather than
writing yourself. You've already used real packages throughout this curriculum: `express`, `cors`,
`mongoose`, `react`, `react-router-dom` are all packages.

```bash
npm install express
```

**`npm`** ("Node Package Manager") is the tool that downloads packages and manages them for your
project. Running `npm install <package>` does a few things:

1. Downloads that package's code (and anything *it* depends on) into a folder called
   `node_modules`.
2. Records it in your project's `package.json` file, under a `dependencies` list.

```javascript
const express = require("express"); // importing a package, exactly like importing your own file
```

Notice: importing a package you installed looks nearly identical to importing your own local file —
the only real difference is the path (`"express"`, a package name, versus `"./math"`, a relative
file path). This consistency is deliberate — from the *importing* side, using your own code and
using someone else's published code work through the same basic mechanism.

### `package.json` — your project's manifest

```json
{
  "name": "my-app",
  "version": "1.0.0",
  "dependencies": {
    "express": "^4.18.2"
  }
}
```

This file describes your project: its name, version, and — critically — exactly which packages
(and which versions) it depends on. This is what lets someone else clone your project and run
`npm install` to get the exact same set of packages installed, without you having to manually share
the (often huge) `node_modules` folder — which is exactly why `node_modules` belongs in
`.gitignore`, something you may have already run into in practice: it's fully regeneratable from
`package.json`, so there's no reason to commit it to version control.

### Why version numbers matter

Packages change over time — features get added, bugs get fixed, and sometimes behavior changes in
ways that could break code depending on the old behavior. `package.json` records which versions
your project expects, so installing your project later (even much later) reproduces a working set
of dependencies rather than potentially pulling in a newer, incompatible version by surprise.

## Simple Example

```javascript
// utils.js
function formatCurrency(amount) {
  return "$" + amount.toFixed(2);
}

module.exports = { formatCurrency };
```

```javascript
// main.js
const { formatCurrency } = require("./utils");

console.log(formatCurrency(19.9)); // "$19.90"
```

## Let's Break It Down

- `utils.js` defines a function and explicitly exports it via `module.exports` — without this line,
  `formatCurrency` would be completely private to `utils.js`, invisible to any other file, no
  matter how it's imported.
- `main.js` imports specifically the `formatCurrency` function using destructuring syntax
  (`const { formatCurrency } = require(...)`) — the same destructuring pattern from your JavaScript
  work, now being used to pull one specific named export out of everything a module exports.
- This mirrors exactly how you've been using packages like `express` all along — `require("./utils")`
  for your own code, `require("express")` for an installed package — same mechanism either way.

## Common Mistakes

- **Forgetting to export something**, then being confused why importing it elsewhere gives
  `undefined`. If it's not explicitly listed in `module.exports` (or marked `export` in ES Modules
  syntax), it simply isn't accessible from other files.
- **Committing `node_modules` to git.** This folder can be enormous, is entirely regeneratable from
  `package.json` via `npm install`, and should always be listed in `.gitignore`.
- **Mixing `require`/`module.exports` and `import`/`export` syntax inconsistently** within the same
  project without understanding they're two different systems — generally, pick one style per
  project and stay consistent, based on what the project's setup expects.
- **Not checking a package's popularity/maintenance status before depending on it** for something
  important — an abandoned, rarely-used package can become a genuine liability later if it has bugs
  or security issues nobody is fixing.

## When Should I Use It?

Split your own code into separate modules once a single file starts covering more than one clear
responsibility, or once you find yourself scrolling past unrelated code to get to what you're
actually working on. Reach for an existing package instead of writing something from scratch when a
well-established, widely-used package already solves your exact problem (as you did with
`express`, `cors`, `mongoose`) — reinventing solved problems is rarely a good use of time on a real
project, though understanding roughly how the underlying mechanism works (as you now do) is still
valuable.

## Exercises

1. **(Recall)** What does `module.exports` do, and what happens if you forget to include something
   in it?
2. **(Understanding)** Explain why `node_modules` should be listed in `.gitignore` rather than
   committed to version control.
3. **(Application)** Split this single file into two modules — one for the data, one for the logic
   — with proper exports/imports:
   ```javascript
   const products = [{ name: "Widget", price: 10 }, { name: "Gadget", price: 20 }];
   function totalPrice(products) {
     return products.reduce((sum, p) => sum + p.price, 0);
   }
   console.log(totalPrice(products));
   ```
4. **(Problem Solving)** A teammate clones your project from GitHub, runs it, and immediately gets
   an error like `Cannot find module 'express'`. Based on what you learned about `package.json` and
   `node_modules`, what did they most likely forget to do, and why does `package.json` (which *was*
   included in the clone) fix it?

## What Should I Learn Next?

Continue to [`14-apis-http-json`](../14-apis-http-json) — modules let files inside one program
share code with each other; APIs are how entirely separate programs — often running on different
computers — communicate with each other at all.
