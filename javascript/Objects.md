## Objects

**What:** A collection of key-value pairs. Models a "thing" with properties.

**Why:** Represents real-world entities — a task has a title, a completed status, an id.

**When:** Any time a value is naturally "a thing with multiple properties" rather than a single value.

**How:**
```js
const task = {
  id: 1,
  title: 'Buy milk',
  completed: false,
};

task.title;          // 'Buy milk' — dot notation
task['title'];        // same thing — bracket notation (needed when the key is a variable)

// spread — create a new object based on an existing one
const updatedTask = { ...task, completed: true };
// { id: 1, title: 'Buy milk', completed: true } — original `task` is untouched
```

**Common mistake:** Mutating an object directly when working with React (`task.completed = true`) instead of creating a new one with spread. React won't notice a mutation — it only re-renders when it sees a *new* object/array reference.

---