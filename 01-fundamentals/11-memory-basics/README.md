# Memory Basics

**Module:** Programming Fundamentals
**Prerequisites:** [`10-algorithms-and-complexity-intro`](../10-algorithms-and-complexity-intro)

## What is it?

Every value your program works with — a number, a string, an object — has to live somewhere in
your computer's memory (RAM) while the program runs. This lesson covers a simplified but genuinely
useful picture of how that storage works, and a specific distinction — **values versus
references** — that explains a whole category of confusing bugs you'll otherwise run into later.

## Why does it matter?

A surprisingly common category of bug looks like this: "I only changed one variable, but somehow a
completely different variable changed too." This isn't magic, and it isn't a mistake in the
language — it's a direct, predictable consequence of how certain types of data are stored in
memory. Understanding this now will save you real confusion later, especially once you start
passing arrays and objects into functions.

## Mental Model

Think of simple values (numbers, strings, booleans) like writing a value directly on a sticky note
— if you copy that sticky note, you now have two independent notes; changing one doesn't touch the
other. Think of objects and arrays like a sticky note with an *address* written on it, pointing to
a box sitting somewhere else — if you copy that sticky note, you now have two notes pointing to the
**same box**. Change what's inside the box using either note, and both notes "see" the change,
because they were never separate boxes to begin with — just separate labels pointing at one shared
box.

## How does it work?

### Primitive values are copied by value

```javascript
let a = 5;
let b = a; // b gets a COPY of a's value

b = 10;

console.log(a); // 5 — unaffected
console.log(b); // 10
```

Numbers, strings, and booleans (the "primitive" types) are copied **by value** — when you assign
one variable's value to another, you get a completely independent copy. Changing `b` afterward has
no effect whatsoever on `a`. This matches most people's intuition, and it's exactly why this
distinction is easy to overlook — until you hit the next case.

### Objects and arrays are copied by reference

```javascript
let obj1 = { name: "Alice" };
let obj2 = obj1; // obj2 points to the SAME object, not a copy

obj2.name = "Ben";

console.log(obj1.name); // "Ben" — changed too!
console.log(obj2.name); // "Ben"
```

This is the "sticky note pointing to a shared box" scenario. `obj2 = obj1` does **not** create a new,
independent object — it creates a second label pointing at the exact same object in memory. Changing
a property through `obj2` changes the *one shared object* that both `obj1` and `obj2` point to —
which is why `obj1` appears to have "changed too," even though you never wrote to `obj1` directly.
Arrays behave identically, since they're also reference types:

```javascript
let arr1 = [1, 2, 3];
let arr2 = arr1;

arr2.push(4);

console.log(arr1); // [1, 2, 3, 4] — also changed
```

### Why this matters constantly once functions are involved

```javascript
function addItem(list, item) {
  list.push(item);
}

const cart = ["apple"];
addItem(cart, "banana");

console.log(cart); // ["apple", "banana"] — modified, even though
                    // addItem never explicitly returned anything
```

When you pass an object or array into a function, the function receives a reference to the *same*
object — not a private copy. Modifying it inside the function modifies the original, visible to
code outside the function once it returns. This is neither good nor bad on its own — it's simply
how reference types behave, and it's essential to know, since accidentally relying on (or
accidentally avoiding) this behavior is a very common source of real bugs.

### Making an actual, independent copy on purpose

Sometimes you genuinely want a separate copy, not a shared reference:

```javascript
const original = { name: "Alice", age: 28 };
const copy = { ...original }; // spread creates a new, separate object

copy.age = 29;

console.log(original.age); // 28 — untouched
console.log(copy.age);     // 29
```

The spread syntax (`{ ...original }`, or `[...originalArray]` for arrays) creates a genuinely new
object/array with the same contents, rather than a second reference to the same one. This is a
common, deliberate pattern once you want to change data without affecting the original — you'll see
this constantly in the JavaScript deep-dive module and again in React, where avoiding accidental
mutation of shared data is a core practice.

### The stack and the heap (a first, simplified look)

Under the hood, primitive values are typically stored in a fast, simple area of memory called the
**stack**, while objects and arrays live in a larger, more flexible area called the **heap** —
variables referring to heap-stored data hold, essentially, an address pointing to where that data
actually lives, rather than the data itself. This is a simplification of what real language
runtimes actually do, but it's a reasonably accurate mental model for *why* primitives copy cleanly
while objects/arrays share references: copying a primitive copies the actual value sitting on the
stack; copying an object/array copies only the address pointing into the heap, not the data at that
address.

## Simple Example

```javascript
function double(n) {
  n = n * 2;
  return n;
}

function addToList(list) {
  list.push("new item");
}

let number = 5;
double(number);
console.log(number); // 5 — unchanged, primitives are copied by value

let items = ["a", "b"];
addToList(items);
console.log(items); // ["a", "b", "new item"] — changed! reference type
```

## Let's Break It Down

- `double(number)` receives a *copy* of `number`'s value (`5`). Reassigning the parameter `n`
  inside the function has zero effect on the original `number` variable outside it.
- `addToList(items)` receives a *reference* to the same array `items` points to. Calling `.push()`
  on that reference modifies the one shared array — so the change is visible outside the function
  too, even though nothing was explicitly returned.
- This isn't inconsistent behavior — it's the same rule (primitives copy by value, objects/arrays
  share by reference) applied consistently in both cases.

## Common Mistakes

- **Expecting a function to leave an object/array parameter completely untouched**, when in reality
  any mutation performed inside the function (like `.push()`, or directly setting a property)
  affects the original data the caller passed in.
- **Accidentally sharing an object between two variables when a separate copy was intended**,
  leading to confusing bugs where changing "one" thing seems to affect something unrelated.
- **Forgetting that comparing two objects with `===` checks reference identity, not content.**
  `{ name: "Alice" } === { name: "Alice" }` is `false` — they're two separate objects in memory with
  identical *contents*, but `===` on objects checks "is this literally the same object," not "do
  these look the same."

## When Should I Use It?

Be deliberate about whether a function should modify the data it receives, or work with a fresh
copy instead — and make that choice on purpose, not by accident. Use spread syntax (or similar
copying techniques covered later) whenever you need a genuinely independent copy of an object or
array, particularly once you reach React, where treating state as unchangeable and creating new
copies instead of mutating is a core, deliberate practice.

## Exercises

1. **(Recall)** Which kinds of values are copied "by value," and which are copied "by reference" in
   JavaScript?
2. **(Understanding)** Using the sticky-note-and-box mental model, explain why modifying an object
   through one variable can appear to change a "different" variable too.
3. **(Application)** Predict the output of this code before running it:
   ```javascript
   const original = [1, 2, 3];
   const copy = original;
   copy.push(4);
   console.log(original.length);
   ```
   Then rewrite it so that `original` is genuinely unaffected by changes to `copy`.
4. **(Problem Solving)** A function `resetSettings(settings)` sets several properties on the
   `settings` object it receives back to defaults. A developer is confused why calling this function
   seems to change the *original* settings object they passed in, even though they never explicitly
   reassigned it. Explain what's happening.

## What Should I Learn Next?

Continue to [`12-input-output-and-files`](../12-input-output-and-files) — now that you understand
how data is held in memory while a program runs, the next question is how programs get data in from
the outside world, and save data back out so it isn't lost when the program stops running.
