# Lists & Loops

**Module:** Python (Parallel Track)
**Prerequisites:** [`01-syntax-and-variables`](../01-syntax-and-variables)

## What is it?

Python's **lists** are the equivalent of JavaScript arrays. Python's looping constructs cover the
same ground as JS's `for`/`for...of`, plus **list comprehensions** — a genuinely new, compact syntax
for building lists that has no direct JavaScript equivalent.

## Why does it matter?

Lists and loops are used constantly in any real Python code. List comprehensions specifically are
idiomatic, expected Python style — code that uses manual loops where a comprehension would fit is
functionally fine but reads as distinctly non-Python to experienced developers.

## How does it work?

### Lists — like JS arrays

```python
fruits = ["apple", "banana", "cherry"]
print(fruits[0])       # "apple" — zero-indexed, same as JS
print(len(fruits))      # 3 — a function call, NOT a property like JS's .length
fruits.append("date")    # like .push()
fruits.pop()               # like .pop()
```

### `for...in` — Python's `for...of`

```python
for fruit in fruits:
    print(fruit)
```

### `enumerate()` — index and value together

```python
for i, fruit in enumerate(fruits):
    print(i, fruit)
```

### `range()` — the counting loop

```python
for i in range(5):
    print(i)  # 0, 1, 2, 3, 4 — same as JS's for(let i=0; i<5; i++)
```

### List comprehensions — genuinely new syntax

```python
numbers = [1, 2, 3, 4, 5]

doubled = [n * 2 for n in numbers]        # like .map()
evens = [n for n in numbers if n % 2 == 0]  # like .filter()
```

Read `[n * 2 for n in numbers]` as: "for each `n` in `numbers`, put `n * 2` into a new list." Adding
`if condition` filters which items are included at all. This single syntax pattern covers what JS
splits into two separate methods (`.map()` and `.filter()`) — Python doesn't have separate array
methods for this; comprehensions are the idiomatic way to do both.

### `if`/`elif`/`else` — same logic, different keyword

```python
score = 75
if score >= 90:
    print("A")
elif score >= 80:
    print("B")
else:
    print("C")
```

`elif`, not `else if` — the only syntax difference from JavaScript's chain; the "check top to
bottom, order matters" behavior from Fundamentals applies identically.

## Simple Example

```python
scores = [92, 78, 85, 60, 95]

high_scores = [s for s in scores if s >= 80]
print(high_scores)  # [92, 85, 95]

for i, s in enumerate(scores):
    print(f"Score {i}: {s}")
```

## Let's Break It Down

- `high_scores` uses a filtering comprehension, keeping only scores 80 and above — functionally
  identical to `scores.filter(s => s >= 80)` in JavaScript, just different syntax.
- `enumerate(scores)` provides both the index and value together in the loop, avoiding manual index
  tracking, just like JS's own index-tracking patterns.

## Common Mistakes

- **Calling `.length` out of JS habit** instead of `len(list)` — a very common early mistake when
  switching languages.
- **Writing a manual loop with `.append()` where a list comprehension would be clearer and more
  idiomatic** — not wrong, but not how experienced Python developers would typically write it.
- **Forgetting comprehensions can filter AND transform simultaneously**: `[n * 2 for n in numbers if
  n % 2 == 0]` doubles only the even numbers, combining both operations in one expression.

## When Should I Use It?

Use a list comprehension whenever you're building a new list by transforming or filtering an
existing one — this is idiomatic Python. Use a regular `for` loop when the logic involves more than
building a single list (multiple side effects, complex branching) where a comprehension would become
hard to read.

## Exercises

1. **(Recall)** What does `len(list)` do, and how does it differ syntactically from JavaScript's
   `.length`?
2. **(Application)** Write a list comprehension that takes a list of words and returns only those
   longer than 4 characters, uppercased.
3. **(Problem Solving)** Translate this JavaScript into an idiomatic Python list comprehension:
   `const adults = people.filter(p => p.age >= 18).map(p => p.name);` (assume `people` is a list of
   dictionaries — covered in the next topic).

## What Should I Learn Next?

Continue to [`03-dictionaries`](../03-dictionaries) — Python's version of JavaScript objects.
