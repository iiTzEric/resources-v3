# Data Structures (Intro)

**Module:** Programming Fundamentals
**Prerequisites:** [`07-scope`](../07-scope)

## What is it?

A **data structure** is a way of organizing multiple pieces of data together so they can be stored,
accessed, and worked with efficiently. So far, every example in this module has used single,
standalone values — one number, one string. Real programs almost always need to work with
*collections*: a list of names, a set of settings, a record with several related fields.

## Why does it matter?

Almost nothing useful is built from single values alone. A todo app needs a list of tasks. A user
profile needs a name, email, and age grouped together as one thing. Choosing the right way to
organize that data — and this module only scratches the surface, with a full, deep module dedicated
to it later — has a direct effect on how easy your code is to write, read, and get right.

## How does it work?

This lesson introduces the two most fundamental, universal structures — nearly every language has
some version of both. A dedicated module,
[`09-data-structures-and-algorithms`](../../09-data-structures-and-algorithms), goes far deeper
into more specialized structures (trees, graphs, hash tables) and their performance
characteristics — this lesson is just enough to get you through the rest of the Fundamentals
module comfortably.

### Ordered collections (arrays / lists)

```javascript
const fruits = ["apple", "banana", "cherry"];

console.log(fruits[0]);   // "apple" — accessed by position, starting at 0
console.log(fruits.length); // 3
```

An **array** (called a "list" in some languages, including Python) stores multiple values in a
specific order, each accessible by its numeric **index** — its position, counting from `0`, not
`1`. This is called being **zero-indexed**, and it's a near-universal convention worth internalizing
early: the first item is at index `0`, the second at index `1`, and so on. The last item's index is
always `length - 1`, not `length` — a very common source of off-by-one errors.

```javascript
fruits.push("date");   // adds to the end: ["apple", "banana", "cherry", "date"]
fruits.pop();            // removes from the end: back to ["apple", "banana", "cherry"]
```

### Grouped, labeled data (objects / maps)

```javascript
const person = {
  name: "Alice",
  age: 28,
  city: "Nairobi"
};

console.log(person.name); // "Alice"
console.log(person["age"]); // 28 — bracket notation also works
```

An **object** (or "dictionary"/"map" in some other languages) stores data as **key-value pairs** —
each piece of data has a descriptive name (the key) instead of a numeric position. This is the
right choice whenever data has distinct, named fields that belong together as one logical thing —
a person, a product, a configuration — as opposed to an ordered sequence of similar items.

### Combining the two — the pattern you'll use constantly

```javascript
const team = [
  { name: "Alice", age: 28 },
  { name: "Ben", age: 34 }
];

console.log(team[0].name); // "Alice"
```

An **array of objects** is genuinely one of the most common data shapes in real software: a list of
records, where each record itself has several named fields. Think of a spreadsheet — the whole
sheet is like the array, and each row is like one object with several labeled columns.

### Choosing between them — the core question

Ask: **is this data an ordered sequence of similar things, or a single thing with several distinct,
named properties?** A shopping list is an array (many similar items, order matters, you might have
any number of them). A single product's details — its name, price, and description — is an object
(one specific thing, with a fixed, known set of named fields). Most real data ends up being a
combination of both, nested inside each other, exactly like the `team` example above.

## Simple Example

```javascript
const inventory = [
  { name: "Widget", price: 9.99, inStock: true },
  { name: "Gadget", price: 19.99, inStock: false }
];

console.log(inventory[0].name);   // "Widget"
console.log(inventory[1].price);  // 19.99
console.log(inventory.length);    // 2
```

## Let's Break It Down

- `inventory` is an array — an ordered collection — containing two objects.
- Each object represents one product, with three named fields: `name`, `price`, `inStock`.
- `inventory[0]` retrieves the *first* object (index `0`), and `.name` then retrieves that
  particular object's `name` field.
- `inventory.length` tells you how many products are in the list — `2` — completely independent of
  what's inside each individual object.
- This exact shape — an array of objects, each with the same set of fields — is what you'll get
  back constantly when working with real data later (API responses, database query results,
  spreadsheet data converted to code).

## Common Mistakes

- **Trying to access an array like an object, or vice versa.** `inventory.name` (instead of
  `inventory[0].name`) doesn't make sense — the array itself doesn't have a `name`, one of the
  *objects inside it* does.
- **Off-by-one indexing errors** — forgetting that the first item is at index `0`, or trying to
  access `array[array.length]`, which is always one position past the last real item and will give
  you `undefined`.
- **Choosing the wrong structure for the data.** Using an object with keys `"0"`, `"1"`, `"2"` to
  represent an ordered list, instead of just using an actual array — this discards the built-in
  ordering and array methods (`push`, `length`, and many more you'll see in the JavaScript module)
  for no real benefit.

## When Should I Use It?

Use an array when you have multiple similar items and their order matters (or even if it doesn't
matter much, but they're clearly "a list of the same kind of thing"). Use an object when you have
one entity with several distinct, named characteristics. Combine them — an array of objects — for
anything resembling a table or list of records, which is an extremely common real-world data shape.

## Exercises

1. **(Recall)** What is the index of the first item in an array? What about the last item, in terms
   of the array's `length`?
2. **(Understanding)** Explain, in your own words, when you'd choose an array versus an object to
   represent a piece of data.
3. **(Application)** Represent a small library as data: an array of at least 3 books, each with a
   `title`, an `author`, and a `yearPublished`. Then write a line of code that logs the title of the
   second book.
4. **(Problem Solving)** A teammate stores a list of usernames like this:
   `const users = { first: "alice", second: "ben", third: "carla" };` and complains that adding a
   new user is awkward and there's no way to get "how many users are there" directly. Explain what
   structure they should have used instead, and why it solves both problems.

## What Should I Learn Next?

Continue to [`09-error-handling-and-debugging`](../09-error-handling-and-debugging) — now that your
programs can involve real logic and real data, they can also go wrong in real ways. This topic
covers how to read errors and systematically find out what's actually happening when they do.
