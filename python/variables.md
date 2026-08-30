## Variables and basic types

**What:** Named storage for values — no `let`/`const` needed, Python infers type.

**Why:** Same reason as JS — you need to hold data as your program runs.

**When:** Always, obviously — but worth noting Python is dynamically typed, meaning a variable's type can change (unlike some other languages).

**How:**
```python
name = "Alex"        # string
age = 28              # int
price = 9.99           # float
is_active = True        # bool (capital T/F, unlike JS's lowercase true/false)
nothing = None            # Python's null/undefined equivalent
```

**Common mistake (coming from JS):** Using `true`/`false`/`null` — Python uses `True`/`False`/`None`, capitalized.