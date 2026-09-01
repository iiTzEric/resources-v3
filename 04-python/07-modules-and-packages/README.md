# Modules & Packages (pip)

**Module:** Python (Parallel Track)
**Prerequisites:** [`06-error-handling`](../06-error-handling)

## What is it?

Python organizes code across files using `import`, and installs external packages using **pip**
("Pip Installs Packages") — the direct parallel to JavaScript's `import`/`require` and `npm`.

## Why does it matter?

Just as with JavaScript, real Python projects quickly outgrow a single file, and rely heavily on
external packages (for data work, web frameworks like Flask, and more) rather than writing
everything from scratch.

## How does it work?

### Splitting code across files

```python
# math_utils.py
def add(a, b):
    return a + b

def subtract(a, b):
    return a - b
```

```python
# main.py
from math_utils import add, subtract

print(add(2, 3))       # 5
print(subtract(5, 2))    # 3
```

`from module_name import thing1, thing2` imports specific named items — Python doesn't require an
explicit `export` keyword the way JavaScript does; any top-level function, class, or variable in a
`.py` file is importable by default, unless its name starts with an underscore (a convention
signaling "internal, not meant to be imported").

### Importing an entire module

```python
import math_utils

print(math_utils.add(2, 3))
```

### Installing packages with `pip`

```bash
pip install requests
```

```python
import requests

response = requests.get("https://api.example.com/data")
print(response.json())
```

`requests` is a widely-used third-party package for making HTTP requests — conceptually parallel to
using `fetch` in JavaScript, just as an installed package rather than a browser built-in.

### Virtual environments — Python's answer to per-project dependencies

```bash
python -m venv venv          # create a virtual environment in a folder called "venv"
source venv/bin/activate       # activate it (Mac/Linux)
pip install requests
```

A **virtual environment** creates an isolated space for a specific project's installed packages,
preventing different projects on the same machine from needing conflicting versions of the same
package. This solves a similar problem to how each JavaScript project's `node_modules` folder keeps
its own separate copy of dependencies — Python's ecosystem doesn't do this automatically per-folder
the way `npm` does, which is exactly why virtual environments exist as an explicit, necessary step.

### `requirements.txt` — Python's `package.json`

```
requests==2.31.0
flask==3.0.0
```

A `requirements.txt` file lists a project's dependencies and their versions, letting someone else
recreate the same environment with:

```bash
pip install -r requirements.txt
```

This is the direct parallel to running `npm install` against a `package.json`.

## Simple Example

```python
# utils.py
def format_currency(amount):
    return f"${amount:.2f}"
```

```python
# main.py
from utils import format_currency

print(format_currency(19.9))  # "$19.90"
```

## Let's Break It Down

- `utils.py` defines a function with no special export syntax needed — it's automatically
  importable from any other file in the project.
- `main.py` imports specifically `format_currency` by name, using Python's `from ... import ...`
  syntax — directly parallel to `const { formatCurrency } = require("./utils")` in JavaScript.

## Common Mistakes

- **Forgetting to activate a virtual environment** before installing packages, accidentally
  installing them globally instead of scoped to the current project.
- **Not maintaining a `requirements.txt`**, making it hard for someone else (or future you) to
  recreate the exact same working environment.
- **Circular imports** (two files trying to import from each other) — a genuine issue in both Python
  and JavaScript, usually resolved by restructuring which file owns which piece of shared logic.

## When Should I Use It?

Split Python code into modules once a single file grows past one clear responsibility, exactly as
with JavaScript. Use a virtual environment for every real Python project, to keep dependencies
isolated and reproducible.

## Exercises

1. **(Recall)** What is a virtual environment, and what problem does it solve?
2. **(Application)** Split this into two files with proper imports:
   ```python
   products = [{"name": "Widget", "price": 10}]
   def total_price(products):
       return sum(p["price"] for p in products)
   print(total_price(products))
   ```
3. **(Problem Solving)** A teammate clones your Python project and runs it, immediately getting
   `ModuleNotFoundError: No module named 'requests'`. What did they most likely forget to do, and
   what file (if properly maintained) would have told them exactly what to install?

## What Should I Learn Next?

This completes the Python module. Continue to
[`05-web-fundamentals`](../../05-web-fundamentals) to build the HTML/CSS/HTTP foundation for React,
or explore Flask/FastAPI later in the Backend module as a Python alternative to Express.
