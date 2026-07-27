## Data structures: lists, dicts, tuples, sets

**What:** Python's equivalents of JS arrays and objects, plus two extras.

**Why:** Different structures fit different needs — order, uniqueness, mutability.

**When:**
- **List** — ordered, changeable collection (like a JS array)
- **Dict** — key-value pairs (like a JS object)
- **Tuple** — ordered, *unchangeable* collection — use when data shouldn't be modified (like coordinates)
- **Set** — unordered, unique values only — use when you need to dedupe or check membership fast

**How:**
```python
# List
tasks = ["Buy milk", "Walk dog"]
tasks.append("Write code")
print(tasks[0])          # "Buy milk"

# Dict
task = {"title": "Buy milk", "completed": False}
print(task["title"])      # "Buy milk"
task["completed"] = True   # dicts are mutable

# Tuple
point = (3, 4)             # can't be changed after creation

# Set
unique_tags = {"urgent", "home", "urgent"}  # {"urgent", "home"} — duplicate dropped
```

**List comprehension (very Pythonic, worth learning early):**
```python
titles = [task["title"] for task in tasks_list]
# equivalent to JS's tasks.map(t => t.title)

completed_only = [t for t in tasks_list if t["completed"]]
# equivalent to JS's tasks.filter(t => t.completed)
```
