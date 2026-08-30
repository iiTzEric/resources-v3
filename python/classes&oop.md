## Classes and OOP basics

**What:** Blueprints for creating objects with shared structure and behavior.

**Why:** Useful for modeling things with both data and behavior — e.g., a `Task` class with methods, not just a dict.

**When:** When plain dicts start feeling insufficient — you want validation, methods, or inheritance.

**How:**
```python
class Task:
    def __init__(self, title, completed=False):
        self.title = title
        self.completed = completed

    def mark_complete(self):
        self.completed = True

    def __repr__(self):
        return f"Task({self.title}, completed={self.completed})"

task = Task("Buy milk")
task.mark_complete()
print(task)  # Task(Buy milk, completed=True)
```

**Common mistake:** Forgetting `self` as the first parameter of every method — it's how Python passes "this instance" into the method (Python doesn't do it implicitly like JS's `this`).