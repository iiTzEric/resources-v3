# Functions In Depth

**Module:** Python (Parallel Track)
**Prerequisites:** [`03-dictionaries`](../03-dictionaries)

## What is it?

Python functions cover the same fundamentals as JavaScript functions, plus a few genuinely useful
features without a direct JS equivalent: keyword arguments, `**kwargs`, and returning multiple
values directly.

## Why does it matter?

These aren't just stylistic differences — keyword arguments and multiple return values make certain
common patterns noticeably cleaner in Python than the JS equivalent (which usually requires an
object or array plus destructuring to achieve something similar).

## How does it work?

### Basic function — `def` instead of `function`

```python
def greet(name):
    return "Hello, " + name

print(greet("Alice"))
```

### Default parameters — same idea as JS

```python
def greet(name, greeting="Hello"):
    return f"{greeting}, {name}"
```

### Keyword arguments — call by name, not just position

```python
def describe(name, age, city):
    return f"{name} is {age} and lives in {city}"

print(describe(city="Nairobi", name="Alice", age=28))  # order doesn't matter
```

Unlike JavaScript (where arguments are matched purely by position), Python lets you pass arguments
by explicit name, in any order — genuinely useful once a function has several parameters and you
want the call itself to remain readable.

### `*args` — like JS's rest parameters

```python
def total(*numbers):
    return sum(numbers)

total(1, 2, 3)  # 6
```

### `**kwargs` — collecting keyword arguments into a dictionary, no direct JS equivalent

```python
def describe_product(name, price, **details):
    print(name, price)
    for key, value in details.items():
        print(key, value)

describe_product("Laptop", 999, color="silver", in_stock=True)
```

`**details` collects any extra `key=value` arguments into a dictionary — genuinely useful for
flexible function signatures, and a pattern you'll see often in real Python libraries.

### Multiple return values — more concise than JS

```python
def get_min_max(numbers):
    return min(numbers), max(numbers)

low, high = get_min_max([4, 8, 1, 9, 3])
print(low, high)  # 1 9
```

In JavaScript, achieving this requires returning an array or object and destructuring it on the
calling side. Python lets you comma-separate multiple return values directly, and unpack them
immediately — genuinely more concise for this specific, common need.

### Docstrings — Python's documentation convention

```python
def greet(name):
    """Return a greeting string for the given name."""
    return f"Hello, {name}"
```

A string immediately after `def`, in triple quotes, documents the function — a real Python
convention that tools and other developers expect on non-trivial functions.

## Simple Example

```python
def analyze_scores(scores):
    """Return the average, minimum, and maximum of a list of scores."""
    average = sum(scores) / len(scores)
    return average, min(scores), max(scores)

avg, low, high = analyze_scores([70, 85, 90, 60])
print(f"Average: {avg}, Low: {low}, High: {high}")
```

## Let's Break It Down

- `analyze_scores` returns three values at once, comma-separated.
- The caller unpacks all three directly into named variables in a single line — no object or array
  destructuring boilerplate needed, unlike the equivalent JavaScript pattern.
- The docstring documents exactly what the function does, immediately visible to anyone reading or
  using it, including tools that can surface docstrings automatically.

## Common Mistakes

- **Forgetting keyword arguments must come after positional ones** in a function call when mixing
  both styles.
- **Confusing `*args` and `**kwargs`** — `*args` collects extra positional arguments into a tuple;
  `**kwargs` collects extra keyword arguments into a dictionary.
- **Not using multiple return values when they'd genuinely simplify a function**, instead
  constructing an unnecessary dictionary or list purely to return more than one value, out of JS
  habit.

## When Should I Use It?

Use keyword arguments when a function has several parameters and clarity at the call site matters.
Use `**kwargs` for functions needing a flexible, open-ended set of optional named settings. Use
multiple return values whenever a function naturally produces more than one independent, related
result.

## Exercises

1. **(Recall)** What's the difference between what `*args` and `**kwargs` each collect?
2. **(Application)** Write a function `describe_person(name, **details)` that prints the name, then
   loops through and prints any additional keyword arguments passed in.
3. **(Problem Solving)** Translate this JavaScript pattern into idiomatic Python using multiple
   return values instead of an object:
   ```javascript
   function getMinMax(arr) {
     return { min: Math.min(...arr), max: Math.max(...arr) };
   }
   ```

## What Should I Learn Next?

Continue to [`05-classes-and-oop`](../05-classes-and-oop) — Python's class syntax, compared directly
against the JavaScript classes you already know.
