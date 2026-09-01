# Classes & OOP

**Module:** Python (Parallel Track)
**Prerequisites:** [`04-functions-in-depth`](../04-functions-in-depth)

## What is it?

Python's `class` syntax covers the same object-oriented concepts as JavaScript's — constructors,
instance data, methods, inheritance — with different keywords and one important, explicit
difference: `self`.

## Why does it matter?

The concepts transfer directly from what you already know; only the syntax needs translating. The
one genuinely important difference — `self` must be explicitly declared in every method — is a
common early error source worth understanding precisely, not just memorizing.

## How does it work?

### Defining a class

```python
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    def greet(self):
        print(f"Hi, I'm {self.name}")
```

Compared to JavaScript:

| JavaScript | Python |
|---|---|
| `constructor(...)` | `__init__(self, ...)` |
| `this.name` | `self.name` |
| `new Person(...)` | `Person(...)` — no `new` keyword |
| `class B extends A` | `class B(A):` |
| `super(...)` | `super().__init__(...)` |

### `__init__` — Python's constructor

The double underscores ("dunder") mark this as a special method Python calls automatically when
you create a new instance.

### `self` — must be declared explicitly, every time

```python
class Counter:
    def __init__(self):
        self.count = 0

    def increment(self):        # self must be listed here...
        self.count += 1          # ...to be usable here

counter = Counter()
counter.increment()  # you don't pass self yourself — Python does it automatically
```

Unlike JavaScript's implicit `this`, Python requires `self` to be the first parameter of every
instance method — Python automatically passes the instance in when you call `counter.increment()`,
but the method's own definition must explicitly declare that parameter to receive it. **Forgetting
`self` in a method definition is one of the most common Python beginner errors.**

### Creating instances — no `new`

```python
alice = Person("Alice", 28)
alice.greet()  # "Hi, I'm Alice"
```

### Inheritance

```python
class Employee(Person):
    def __init__(self, name, age, role):
        super().__init__(name, age)
        self.role = role

    def greet(self):
        print(f"Hi, I'm {self.name}, working as {self.role}")
```

`class Employee(Person):` — parentheses instead of `extends`. `super().__init__(...)` calls the
parent constructor, similar to JS's `super(...)`, just with an extra `.__init__()` call, since
`super()` itself returns a proxy object you then call the method on.

## Simple Example

```python
class Product:
    def __init__(self, name, price):
        self.name = name
        self.price = price

    def describe(self):
        return f"{self.name} costs ${self.price}"

products = [
    Product("Laptop", 999),
    Product("Phone", 599),
]

for product in products:
    print(product.describe())
```

## Let's Break It Down

- `__init__` sets up each instance's `name` and `price`, identical in purpose to a JS `constructor`.
- `describe` is declared with `self` as its first parameter, and correctly uses `self.name`/
  `self.price` inside — without `self` in the parameter list, this method would fail immediately
  when called, since it would have no way to access the specific instance's data.
- Creating instances (`Product("Laptop", 999)`) requires no `new` keyword, unlike JavaScript.

## Common Mistakes

- **Forgetting `self` as a method's first parameter** — this causes an immediate error the moment
  the method is called, since Python expects to pass the instance there automatically.
- **Using `new`** out of JS habit — Python classes are instantiated by calling the class name
  directly.
- **Forgetting `super().__init__(...)`** in a subclass, skipping the parent's setup logic entirely.

## When Should I Use It?

Use classes for the same reasons you would in JavaScript — bundling related data and behavior into
a reusable template, especially once you're creating many similarly-shaped objects with shared
methods.

## Exercises

1. **(Recall)** What must every Python instance method's first parameter be, and why?
2. **(Application)** Write a `Vehicle` class with `__init__(self, make, model)` and a `describe()`
   method, then a `Car` class extending it with an added `honk()` method.
3. **(Problem Solving)** A method is defined as `def greet(): print("hi")` inside a class (missing
   `self`), and calling `instance.greet()` throws a `TypeError` about arguments. Explain precisely
   why.

## What Should I Learn Next?

Continue to [`06-error-handling`](../06-error-handling) — Python's `try`/`except`, compared against
JavaScript's `try`/`catch`.
