# Objects

**Module:** JavaScript
**Prerequisites:** [`06-arrays`](../06-arrays)

## What is it?

This topic goes deeper into JavaScript objects — methods for inspecting and transforming them, and
the important distinction between comparing objects by reference versus by content.

## Why does it matter?

Objects are everywhere in real JavaScript — API responses, component state, configuration. Beyond
basic property access, you'll constantly need to loop over an object's data, copy it safely, or
check whether two objects represent "the same" data.

## How does it work?

### `Object.keys`, `Object.values`, `Object.entries`

```javascript
const person = { name: "Alice", age: 28 };

Object.keys(person);    // ["name", "age"]
Object.values(person);   // ["Alice", 28]
Object.entries(person);   // [["name", "Alice"], ["age", 28]]
```

`Object.entries` combined with a `for...of` loop is the standard way to loop over both keys and
values together:

```javascript
for (const [key, value] of Object.entries(person)) {
  console.log(key, value);
}
```

### Copying objects — shallow copies with spread

```javascript
const original = { name: "Alice", age: 28 };
const copy = { ...original, age: 29 };

console.log(original.age); // 28 — untouched
console.log(copy.age);      // 29
```

This creates a genuinely new object, unlike `const copy = original` (which just creates a second
reference to the same object, per the Memory Basics lesson). Important caveat: this is a **shallow**
copy — if a property's value is itself an object, that nested object is still shared by reference:

```javascript
const original = { address: { city: "Nairobi" } };
const copy = { ...original };
copy.address.city = "Lagos";
console.log(original.address.city); // "Lagos" — also changed! nested object was shared
```

For deeply nested data that needs a fully independent copy, you'd need a **deep copy** — either
manually spreading each nested level, or using a utility like `structuredClone(obj)`.

### Comparing objects — reference equality, not content equality

```javascript
const a = { name: "Alice" };
const b = { name: "Alice" };
const c = a;

console.log(a === b); // false — two separate objects, even with identical content
console.log(a === c);  // true  — same object, same reference
```

`===` on objects checks "is this literally the same object in memory," not "do they look the same."
Comparing content requires either comparing specific properties manually, or a utility function for
"deep equality" — this is a genuinely common source of confusion, especially coming from comparing
primitives, where `===` does check content directly.

### Checking if a property exists

```javascript
const user = { name: "Alice" };

"name" in user;         // true
user.hasOwnProperty("age"); // false
user.age !== undefined;      // false — but be careful, this is also true if age IS undefined on purpose
```

`in` and `.hasOwnProperty()` are more precise than checking `!== undefined`, since a property can
genuinely exist with the value `undefined` — those two situations ("doesn't exist" vs. "exists, set
to undefined") are subtly different, and matter in specific cases like `JSON.stringify` behavior.

## Simple Example

```javascript
const settings = { theme: "dark", fontSize: 14 };

for (const [key, value] of Object.entries(settings)) {
  console.log(`${key}: ${value}`);
}

const updated = { ...settings, fontSize: 16 };
console.log(settings.fontSize, updated.fontSize); // 14 16
```

## Let's Break It Down

- `Object.entries` converts the object into an array of `[key, value]` pairs, which `for...of`
  destructures directly into `key` and `value` on each iteration.
- Spreading `settings` into `updated` with an overridden `fontSize` creates a genuinely separate
  object — the original `settings.fontSize` is unaffected, exactly the non-mutating pattern you'll
  rely on constantly once you reach React state.

## Common Mistakes

- **Assuming spread creates a fully independent deep copy**, then being surprised when a nested
  object inside is still shared with the original.
- **Comparing two objects with `===` expecting a content comparison**, when it's actually checking
  reference identity.
- **Directly mutating an object that's meant to be treated as immutable** (state, in particular),
  instead of spreading into a new object with the desired change.

## When Should I Use It?

Use `Object.entries`/`Object.keys`/`Object.values` whenever you need to iterate over or transform an
object's contents. Use spread for creating updated copies of objects, being mindful of the shallow-
copy limitation with nested data. Compare object content explicitly (property by property, or with
a deep-equality utility) rather than assuming `===` will do it for you.

## Exercises

1. **(Recall)** Why does `{ name: "Alice" } === { name: "Alice" }` evaluate to `false`?
2. **(Application)** Given `const config = { volume: 50, muted: false }`, write a line that creates
   a new object identical to `config` but with `muted: true`, without modifying the original.
3. **(Problem Solving)** A function updates a user's nested `address.city` by spreading the user
   object (`{ ...user, address: { city: newCity } }`) — but this silently drops the user's other
   address fields like `zipCode`. Explain why, and describe how you'd fix it.

## What Should I Learn Next?

Continue to [`08-destructuring-and-spread-rest`](../08-destructuring-and-spread-rest) — you've now
seen spread used for copying; this topic covers the full destructuring/spread/rest syntax family in
depth.
