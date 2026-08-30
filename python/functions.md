## Functions

**What:** Reusable named blocks of code, same concept as JS.

**Why:** Avoid repetition, organize logic.

**When:** Same as JS — any repeated or nameable logic.

**How:**
```python
def add(a, b):
    return a + b

result = add(2, 3)  # 5

# default arguments
def greet(name, greeting="Hello"):
    return f"{greeting}, {name}!"

greet("Alex")               # "Hello, Alex!"
greet("Alex", "Hi")           # "Hi, Alex!"
```

**Common mistake:** Forgetting the colon `:` after the function signature, or messing up indentation — Python uses indentation (not `{}`) to define code blocks, and it's not optional.

---