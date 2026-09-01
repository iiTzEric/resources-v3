# Dictionaries

**Module:** Python (Parallel Track)
**Prerequisites:** [`02-lists-and-loops`](../02-lists-and-loops)

## What is it?

A **dictionary** (`dict`) is Python's version of a JavaScript object — a key-value data structure.
The syntax differs slightly, and a couple of methods (`.get()`, `.items()`) have no perfectly
direct JS equivalent worth knowing well.

## Why does it matter?

Dictionaries, and lists of dictionaries, are the most common way structured data is represented in
Python — exactly parallel to objects and arrays-of-objects in JavaScript.

## How does it work?

### Basic syntax and access

```python
person = {
    "name": "Alice",
    "age": 28,
    "city": "Nairobi"
}

print(person["name"])  # "Alice" — always bracket notation, no dot notation for dicts
```

Unlike JavaScript, dictionary keys are always quoted strings, and there's no dot-notation shortcut
(`person.name` means something different in Python — related to classes/objects, covered later).

### `.get()` — safe access with a fallback

```python
print(person["job"])            # KeyError — crashes if the key doesn't exist
print(person.get("job"))         # None — no crash
print(person.get("job", "N/A"))    # "N/A" — custom fallback
```

This is genuinely useful and has no perfectly direct JS equivalent until optional chaining/nullish
coalescing (`?.`/`??`) — accessing a missing key with `[ ]` crashes, but `.get()` fails gracefully.

### Adding and updating values

```python
person["age"] = 29
person["job"] = "Engineer"
```

### Looping over a dictionary

```python
for key in person:
    print(key)  # just the keys

for key, value in person.items():
    print(key, value)  # both together
```

`.items()` is the standard way to get key/value pairs together — the closest Python equivalent to
JavaScript's `Object.entries()`.

### Lists of dictionaries — the same common pattern as JS

```python
team = [
    {"name": "Alice", "age": 28},
    {"name": "Ben", "age": 34},
]

for person in team:
    print(person["name"])

names = [p["name"] for p in team]                    # like .map()
adults = [p for p in team if p["age"] >= 18]           # like .filter()
```

Python doesn't have separate `.map()`/`.filter()` methods for this — list comprehensions cover both
jobs, exactly as with plain lists of numbers.

## Simple Example

```python
team = [
    {"name": "Alice", "age": 28, "city": "Nairobi"},
    {"name": "Ben", "age": 34, "city": "Lagos"},
]

first_person = team[0]
for key, value in first_person.items():
    print(key, value)

nairobi_people = [p["name"] for p in team if p["city"] == "Nairobi"]
print(nairobi_people)  # ["Alice"]
```

## Let's Break It Down

- `team[0]` pulls the first dictionary out of the list, using the same zero-indexing as any list.
- `.items()` on that single dictionary gives you both keys and values together, looped in one
  statement.
- The comprehension filters `team` by a nested dictionary field — the same pattern as filtering an
  array of objects in JavaScript, expressed with Python's comprehension syntax instead.

## Common Mistakes

- **Using dot notation on a dictionary** (`person.name`) out of JS habit — this doesn't work the way
  it does in JavaScript; always use `person["name"]`.
- **Using `[ ]` access when a key might not exist**, causing a `KeyError` crash instead of a
  graceful fallback via `.get()`.
- **Forgetting `.items()` when you need both key and value**, and instead looping only over keys and
  manually re-accessing the dictionary for each value.

## When Should I Use It?

Use a dictionary for one entity with several distinct, named fields — the same guidance as choosing
an object over an array in JavaScript. Use `.get()` with a fallback whenever a key might realistically
be absent, rather than risking a crash from direct bracket access.

## Exercises

1. **(Recall)** What does `.get()` do differently from direct bracket access on a dictionary?
2. **(Application)** Given a list of dictionaries representing products (`name`, `price`, `category`),
   write a comprehension that returns the names of all products in the `"Books"` category.
3. **(Problem Solving)** Code crashes with `KeyError: 'discount'` when processing a list of orders,
   because some orders don't have a `discount` field. Rewrite the access to handle this gracefully.

## What Should I Learn Next?

Continue to [`04-functions-in-depth`](../04-functions-in-depth) — Python's functions have some
genuinely useful features JavaScript doesn't offer as directly, like `**kwargs` and multiple return
values.
