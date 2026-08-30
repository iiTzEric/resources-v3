## Arrays and array methods

**What:** An ordered list of values.

**Why:** Almost all app data is a list of things — tasks, users, products.

**When:** Any time you have "many of something."

**How — the methods you'll use constantly:**
```js
const tasks = [
  { id: 1, title: 'Buy milk', completed: false },
  { id: 2, title: 'Walk dog', completed: true },
];

// map — transform every item, get a new array of the same length
const titles = tasks.map(task => task.title);
// ['Buy milk', 'Walk dog']

// filter — keep only items that pass a test, get a new (possibly shorter) array
const incomplete = tasks.filter(task => !task.completed);
// [{ id: 1, title: 'Buy milk', completed: false }]

// find — get the first item that matches, or undefined
const task = tasks.find(t => t.id === 2);
// { id: 2, title: 'Walk dog', completed: true }

// reduce — fold an array down into a single value
const completedCount = tasks.reduce((count, t) => t.completed ? count + 1 : count, 0);
// 1
```

**When to use which:** map = "transform each," filter = "keep some," find = "get one," reduce = "combine into one value" (a sum, a count, a grouped object).

**Common mistake:** Using `.map()` when you meant `.forEach()`. `.map()` returns a *new array* — if you're just doing something for each item (like `console.log`) and don't need the result, use `.forEach()` instead. Using `.map()` without using its return value is a signal you reached for the wrong tool.

---