## Control flow

**What:** `if`/`elif`/`else`, `for`, `while` — same concepts as JS, different syntax.

**Why:** Branching and repetition.

**How:**
```python
completed = True
if completed:
    print("Done!")
elif in_progress:
    print("Still working...")
else:
    print("Not started")

# for loop over a list
for task in tasks:
    print(task["title"])

# for loop with index
for index, task in enumerate(tasks):
    print(index, task["title"])

# while loop
count = 0
while count < 5:
    count += 1   # Python has no ++ operator
```