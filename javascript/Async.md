## Async JavaScript: Promises and `async`/`await`

**What:** How JavaScript handles things that take time — API calls, database queries, timers.

**Why:** JS is single-threaded; it can't just "wait" for a slow operation without a way to say "run this later, when it's ready, without freezing everything else."

**When:** Any time you call an API, read a file, or query a database.

**How:**
```js
// A function that returns a Promise (this is what fetch, Mongoose queries, etc. do)
function getTasks() {
  return fetch('/api/tasks').then(response => response.json());
}

// Using it with .then()
getTasks().then(tasks => console.log(tasks));

// Using it with async/await — cleaner, reads top-to-bottom like sync code
async function loadTasks() {
  const tasks = await getTasks();
  console.log(tasks);
}
```

**Error handling:**
```js
async function loadTasks() {
  try {
    const tasks = await getTasks();
    console.log(tasks);
  } catch (error) {
    console.error('Failed to load tasks:', error);
  }
}
```

**Common mistake:** Forgetting `await`. Without it, you get the Promise object itself, not the resolved value:
```js
const tasks = getTasks();      // tasks is a Promise, not the actual data
const tasks = await getTasks(); // tasks is the actual data
```
Also: `await` only works inside a function marked `async`.

---