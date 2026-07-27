## File I/O

**What:** Reading and writing files.

**Why:** Common in scripts, data processing, and any Python microservice that needs to read/write config or data files.

**How:**
```python
# Writing
with open("tasks.txt", "w") as f:
    f.write("Buy milk\n")

# Reading
with open("tasks.txt", "r") as f:
    contents = f.read()

# Reading line by line
with open("tasks.txt", "r") as f:
    for line in f:
        print(line.strip())
```

`with` automatically closes the file when the block ends — always prefer it over manually opening/closing.