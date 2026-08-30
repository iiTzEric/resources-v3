## Modules, packages, and virtual environments

**What:** `import` shares code across files, just like JS. Virtual environments isolate a project's dependencies from your system Python.

**Why:** Without a virtual environment, installing a package for one project can silently break another project relying on a different version.

**When:** Every real Python project should have its own virtual environment — get in this habit now.

**How:**
```bash
# Create a virtual environment
python -m venv venv

# Activate it
source venv/bin/activate      # Mac/Linux
venv\Scripts\activate           # Windows

# Install packages (only affects this venv)
pip install flask requests

# Save dependencies for others to install
pip freeze > requirements.txt

# Someone else installs your exact dependencies
pip install -r requirements.txt

# Leave the venv
deactivate
```

```python
# my_module.py
def add(a, b):
    return a + b

# main.py
from my_module import add
print(add(2, 3))
```

**Common mistake:** Installing packages globally (skipping the venv), then wondering why a teammate's `pip install -r requirements.txt` doesn't match what you have locally.